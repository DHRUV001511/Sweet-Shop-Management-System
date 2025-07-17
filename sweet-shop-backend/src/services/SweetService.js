const Sweet = require('../models/Sweet');

class SweetService {
  constructor() {
    this.sweets = [];
    this.initializeSampleData();
  }

  initializeSampleData() {
    const sampleSweets = [
      { name: 'Dark Chocolate Bar', category: 'chocolate', price: 299.99, quantity: 25 },
      { name: 'Gummy Bears', category: 'gummy', price: 199.49, quantity: 50 },
      { name: 'Chocolate Croissant', category: 'pastry', price: 350.50, quantity: 15 },
      { name: 'Rainbow Lollipop', category: 'candy', price: 149.99, quantity: 30 },
      { name: 'Milk Chocolate Truffles', category: 'chocolate', price: 699.99, quantity: 20 }
    ];

    sampleSweets.forEach(sweetData => {
      try {
        this.addSweet(sweetData);
      } catch (error) {
        console.error('Error adding sample sweet:', error.message);
      }
    });
  }

  addSweet(sweetData) {
    Sweet.validate(sweetData);
    const sweet = new Sweet(sweetData.name, sweetData.category, sweetData.price, sweetData.quantity);
    this.sweets.push(sweet);
    return sweet;
  }

  getAllSweets() {
    return this.sweets.sort((a, b) => a.name.localeCompare(b.name));
  }

  getSweetById(id) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return sweet;
  }

  updateSweet(id, updateData) {
    const sweet = this.getSweetById(id);
    
    if (updateData.name !== undefined) sweet.name = updateData.name;
    if (updateData.category !== undefined) sweet.category = updateData.category;
    if (updateData.price !== undefined) sweet.price = parseFloat(updateData.price);
    if (updateData.quantity !== undefined) sweet.quantity = parseInt(updateData.quantity);
    
    return sweet;
  }

  deleteSweet(id) {
    const index = this.sweets.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Sweet not found');
    }
    return this.sweets.splice(index, 1)[0];
  }

  searchSweets(query) {
    const { name, category, minPrice, maxPrice } = query;
    
    return this.sweets.filter(sweet => {
      if (name && !sweet.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }
      if (category && sweet.category !== category) {
        return false;
      }
      if (minPrice !== undefined && minPrice !== '' && sweet.price < parseFloat(minPrice)) {
        return false;
      }
      if (maxPrice !== undefined && maxPrice !== '' && sweet.price > parseFloat(maxPrice)) {
        return false;
      }
      return true;
    });
  }

  purchaseSweet(id, quantity) {
    const sweet = this.getSweetById(id);
    const purchaseQuantity = parseInt(quantity);
    
    if (purchaseQuantity <= 0) {
      throw new Error('Purchase quantity must be greater than 0');
    }
    
    if (sweet.quantity < purchaseQuantity) {
      throw new Error(`Insufficient stock available. Only ${sweet.quantity} units in stock`);
    }
    
    sweet.quantity -= purchaseQuantity;
    return {
      sweet,
      purchasedQuantity: purchaseQuantity,
      totalCost: (sweet.price * purchaseQuantity).toFixed(2)
    };
  }

  restockSweet(id, quantity) {
    const sweet = this.getSweetById(id);
    const restockQuantity = parseInt(quantity);
    
    if (restockQuantity <= 0) {
      throw new Error('Restock quantity must be greater than 0');
    }
    
    sweet.quantity += restockQuantity;
    return sweet;
  }
}

module.exports = SweetService;





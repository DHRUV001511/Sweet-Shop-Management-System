const { v4: uuidv4 } = require('uuid');

class Sweet {
  constructor(name, category, price, quantity) {
    this.id = uuidv4();
    this.name = name;
    this.category = category;
    this.price = parseFloat(price);
    this.quantity = parseInt(quantity);
    this.createdAt = new Date().toISOString();
  }

  static validate(sweetData) {
    const { name, category, price, quantity } = sweetData;
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Name is required and must be a non-empty string');
    }
    
    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      throw new Error('Category is required and must be a non-empty string');
    }
    
    if (price === undefined || price === null || isNaN(price) || price < 0) {
      throw new Error('Price must be a non-negative number');
    }
    
    if (quantity === undefined || quantity === null || isNaN(quantity) || quantity < 0) {
      throw new Error('Quantity must be a non-negative number');
    }
    
    return true;
  }
}

module.exports = Sweet;

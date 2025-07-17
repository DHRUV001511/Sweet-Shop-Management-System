const SweetService = require('../src/services/SweetService');

describe('SweetService', () => {
  let sweetService;

  beforeEach(() => {
    sweetService = new SweetService();
    sweetService.sweets = []; // Clear sample data for tests
  });

  describe('addSweet', () => {
    test('should add a sweet successfully', () => {
      const sweetData = { name: 'Chocolate', category: 'chocolate', price: 2.0, quantity: 10 };
      const sweet = sweetService.addSweet(sweetData);
      
      expect(sweet.name).toBe('Chocolate');
      expect(sweet.category).toBe('chocolate');
      expect(sweet.price).toBe(2.0);
      expect(sweet.quantity).toBe(10);
      expect(sweetService.getAllSweets()).toHaveLength(1);
    });

    test('should throw error for invalid sweet data', () => {
      const invalidData = { name: '', category: 'candy', price: 1.0, quantity: 5 };
      expect(() => sweetService.addSweet(invalidData)).toThrow();
    });
  });

  describe('purchaseSweet', () => {
    test('should purchase sweet and decrease quantity', () => {
      const sweetData = { name: 'Candy', category: 'candy', price: 100.0, quantity: 10 };
      const sweet = sweetService.addSweet(sweetData);
      
      const result = sweetService.purchaseSweet(sweet.id, 3);
      
      expect(result.sweet.quantity).toBe(7);
      expect(result.purchasedQuantity).toBe(3);
      expect(result.totalCost).toBe('300.00');
    });

    test('should throw error when insufficient stock', () => {
      const sweetData = { name: 'Candy', category: 'candy', price: 100.0, quantity: 2 };
      const sweet = sweetService.addSweet(sweetData);
      
      expect(() => sweetService.purchaseSweet(sweet.id, 5))
        .toThrow('Insufficient stock available. Only 2 units in stock');
    });

    test('should throw error for invalid quantity', () => {
      const sweetData = { name: 'Candy', category: 'candy', price: 100.0, quantity: 10 };
      const sweet = sweetService.addSweet(sweetData);
      
      expect(() => sweetService.purchaseSweet(sweet.id, 0))
        .toThrow('Purchase quantity must be greater than 0');
    });
  });

  describe('restockSweet', () => {
    test('should restock sweet and increase quantity', () => {
      const sweetData = { name: 'Candy', category: 'candy', price: 1.0, quantity: 5 };
      const sweet = sweetService.addSweet(sweetData);
      
      const restockedSweet = sweetService.restockSweet(sweet.id, 10);
      
      expect(restockedSweet.quantity).toBe(15);
    });

    test('should throw error for invalid restock quantity', () => {
      const sweetData = { name: 'Candy', category: 'candy', price: 1.0, quantity: 5 };
      const sweet = sweetService.addSweet(sweetData);
      
      expect(() => sweetService.restockSweet(sweet.id, 0))
        .toThrow('Restock quantity must be greater than 0');
    });
  });

  describe('searchSweets', () => {
    beforeEach(() => {
      sweetService.addSweet({ name: 'Dark Chocolate', category: 'chocolate', price: 3.0, quantity: 10 });
      sweetService.addSweet({ name: 'Gummy Bears', category: 'gummy', price: 2.0, quantity: 15 });
      sweetService.addSweet({ name: 'Milk Chocolate', category: 'chocolate', price: 2.5, quantity: 8 });
    });

    test('should search by name', () => {
      const results = sweetService.searchSweets({ name: 'chocolate' });
      expect(results).toHaveLength(2);
      expect(results.every(sweet => sweet.name.toLowerCase().includes('chocolate'))).toBe(true);
    });

    test('should search by category', () => {
      const results = sweetService.searchSweets({ category: 'chocolate' });
      expect(results).toHaveLength(2);
      expect(results.every(sweet => sweet.category === 'chocolate')).toBe(true);
    });

    test('should search by price range', () => {
      const results = sweetService.searchSweets({ minPrice: 2.5, maxPrice: 3.0 });
      expect(results).toHaveLength(2);
      expect(results.every(sweet => sweet.price >= 2.5 && sweet.price <= 3.0)).toBe(true);
    });
  });

  describe('deleteSweet', () => {
    test('should delete sweet successfully', () => {
      const sweetData = { name: 'Candy', category: 'candy', price: 1.0, quantity: 5 };
      const sweet = sweetService.addSweet(sweetData);
      
      const deletedSweet = sweetService.deleteSweet(sweet.id);
      
      expect(deletedSweet.id).toBe(sweet.id);
      expect(sweetService.getAllSweets()).toHaveLength(0);
    });

    test('should throw error when sweet not found', () => {
      expect(() => sweetService.deleteSweet('non-existent-id'))
        .toThrow('Sweet not found');
    });
  });
});


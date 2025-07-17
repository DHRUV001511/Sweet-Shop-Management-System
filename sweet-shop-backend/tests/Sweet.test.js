const Sweet = require('../src/models/Sweet');

describe('Sweet Model', () => {
  test('should create a sweet with valid data', () => {
    const sweet = new Sweet('Chocolate Bar', 'chocolate', 250.50, 10);
    
    expect(sweet.name).toBe('Chocolate Bar');
    expect(sweet.category).toBe('chocolate');
    expect(sweet.price).toBe(250.50);
    expect(sweet.quantity).toBe(10);
    expect(sweet.id).toBeDefined();
    expect(sweet.createdAt).toBeDefined();
  });

  test('should validate sweet data correctly', () => {
    const validData = { name: 'Candy', category: 'candy', price: 100.0, quantity: 5 };
    expect(() => Sweet.validate(validData)).not.toThrow();
  });

  test('should throw error for invalid name', () => {
    const invalidData = { name: '', category: 'candy', price: 1.0, quantity: 5 };
    expect(() => Sweet.validate(invalidData)).toThrow('Name is required and must be a non-empty string');
  });

  test('should throw error for invalid category', () => {
    const invalidData = { name: 'Candy', category: '', price: 1.0, quantity: 5 };
    expect(() => Sweet.validate(invalidData)).toThrow('Category is required and must be a non-empty string');
  });

  test('should throw error for negative price', () => {
    const invalidData = { name: 'Candy', category: 'candy', price: -1, quantity: 5 };
    expect(() => Sweet.validate(invalidData)).toThrow('Price must be a non-negative number');
  });

  test('should throw error for negative quantity', () => {
    const invalidData = { name: 'Candy', category: 'candy', price: 1.0, quantity: -1 };
    expect(() => Sweet.validate(invalidData)).toThrow('Quantity must be a non-negative number');
  });
});


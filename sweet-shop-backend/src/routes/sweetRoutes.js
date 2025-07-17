const express = require('express');
const sweetController = require('../controllers/sweetController');

const router = express.Router();

// Sweet CRUD operations
router.post('/sweets', sweetController.addSweet);
router.get('/sweets', sweetController.getAllSweets);
router.get('/sweets/search', sweetController.searchSweets);
router.get('/sweets/categories', sweetController.getSweetsByCategory);
router.get('/sweets/low-stock', sweetController.getLowStockSweets);
router.get('/sweets/:id', sweetController.getSweetById);
router.put('/sweets/:id', sweetController.updateSweet);
router.delete('/sweets/:id', sweetController.deleteSweet);

// Inventory operations
router.patch('/sweets/:id/purchase', sweetController.purchaseSweet);
router.patch('/sweets/:id/restock', sweetController.restockSweet);

module.exports = router;

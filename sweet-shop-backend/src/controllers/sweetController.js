const SweetService = require('../services/SweetService');

const sweetService = new SweetService();

const sweetController = {
  addSweet: (req, res) => {
    try {
      const sweet = sweetService.addSweet(req.body);
      res.status(201).json({
        success: true,
        message: 'Sweet added successfully',
        data: sweet
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  getAllSweets: (req, res) => {
    try {
      const sweets = sweetService.getAllSweets();
      res.json({
        success: true,
        count: sweets.length,
        data: sweets
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  getSweetById: (req, res) => {
    try {
      const sweet = sweetService.getSweetById(req.params.id);
      res.json({
        success: true,
        data: sweet
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  },

  updateSweet: (req, res) => {
    try {
      const sweet = sweetService.updateSweet(req.params.id, req.body);
      res.json({
        success: true,
        message: 'Sweet updated successfully',
        data: sweet
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  },

  deleteSweet: (req, res) => {
    try {
      const deletedSweet = sweetService.deleteSweet(req.params.id);
      res.json({
        success: true,
        message: 'Sweet deleted successfully',
        data: deletedSweet
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  },

  searchSweets: (req, res) => {
    try {
      const sweets = sweetService.searchSweets(req.query);
      res.json({
        success: true,
        count: sweets.length,
        data: sweets
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  purchaseSweet: (req, res) => {
    try {
      const { quantity } = req.body;
      const result = sweetService.purchaseSweet(req.params.id, quantity);
      res.json({
        success: true,
        message: 'Purchase completed successfully',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  restockSweet: (req, res) => {
    try {
      const { quantity } = req.body;
      const sweet = sweetService.restockSweet(req.params.id, quantity);
      res.json({
        success: true,
        message: 'Sweet restocked successfully',
        data: sweet
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  },

  getSweetsByCategory: (req, res) => {
    try {
      const categories = sweetService.getSweetsByCategory();
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  getLowStockSweets: (req, res) => {
    try {
      const threshold = req.query.threshold || 5;
      const lowStockSweets = sweetService.getLowStockSweets(threshold);
      res.json({
        success: true,
        count: lowStockSweets.length,
        data: lowStockSweets
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

module.exports = sweetController;

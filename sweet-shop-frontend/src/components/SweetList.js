import React, { useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Button, Box,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Chip, IconButton
} from '@mui/material';
import { Delete, ShoppingCart, Add } from '@mui/icons-material';
import { sweetAPI } from '../services/api';

const SweetList = ({ sweets, onSweetUpdated, showNotification }) => {
  const [purchaseDialog, setPurchaseDialog] = useState({ open: false, sweet: null });
  const [restockDialog, setRestockDialog] = useState({ open: false, sweet: null });
  const [quantity, setQuantity] = useState('');

  const handlePurchase = async () => {
    try {
      await sweetAPI.purchaseSweet(purchaseDialog.sweet.id, quantity);
      setPurchaseDialog({ open: false, sweet: null });
      setQuantity('');
      onSweetUpdated();
      showNotification(`Purchased ${quantity} ${purchaseDialog.sweet.name}(s)`);
    } catch (error) {
      showNotification('Error purchasing sweet', 'error');
    }
  };

  const handleRestock = async () => {
    try {
      await sweetAPI.restockSweet(restockDialog.sweet.id, quantity);
      setRestockDialog({ open: false, sweet: null });
      setQuantity('');
      onSweetUpdated();
      showNotification(`Restocked ${quantity} ${restockDialog.sweet.name}(s)`);
    } catch (error) {
      showNotification('Error restocking sweet', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await sweetAPI.deleteSweet(id);
        onSweetUpdated();
        showNotification(`Deleted ${name}`);
      } catch (error) {
        showNotification('Error deleting sweet', 'error');
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      chocolate: '#8B4513',
      candy: '#FF69B4',
      pastry: '#DEB887',
      gummy: '#32CD32',
      other: '#9370DB'
    };
    return colors[category] || '#9370DB';
  };

  if (sweets.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No sweets found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Sweet Inventory ({sweets.length} items)
      </Typography>
      
      <Grid container spacing={3}>
        {sweets.map((sweet) => (
          <Grid item xs={12} sm={6} md={4} key={sweet.id}>
            <Card className="sweet-card" elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {sweet.name}
                </Typography>
                
                <Chip
                  label={sweet.category}
                  size="small"
                  sx={{
                    backgroundColor: getCategoryColor(sweet.category),
                    color: 'white',
                    mb: 2
                  }}
                />
                
                <Typography variant="h5" color="primary" gutterBottom>
                  ₹{sweet.price}
                </Typography>
                
                <Typography
                  variant="body2"
                  color={sweet.quantity < 10 ? 'error' : 'textSecondary'}
                  gutterBottom
                >
                  Stock: {sweet.quantity} units
                  {sweet.quantity < 10 && ' (Low Stock!)'}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ShoppingCart />}
                    onClick={() => setPurchaseDialog({ open: true, sweet })}
                    disabled={sweet.quantity === 0}
                  >
                    Buy
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => setRestockDialog({ open: true, sweet })}
                  >
                    Restock
                  </Button>
                  
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(sweet.id, sweet.name)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Purchase Dialog */}
      <Dialog open={purchaseDialog.open} onClose={() => setPurchaseDialog({ open: false, sweet: null })}>
        <DialogTitle>Purchase {purchaseDialog.sweet?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputProps={{ min: 1, max: purchaseDialog.sweet?.quantity }}
          />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Available: {purchaseDialog.sweet?.quantity} units
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPurchaseDialog({ open: false, sweet: null })}>
            Cancel
          </Button>
          <Button onClick={handlePurchase} variant="contained">
            Purchase
          </Button>
        </DialogActions>
      </Dialog>

      {/* Restock Dialog */}
      <Dialog open={restockDialog.open} onClose={() => setRestockDialog({ open: false, sweet: null })}>
        <DialogTitle>Restock {restockDialog.sweet?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quantity to Add"
            type="number"
            fullWidth
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRestockDialog({ open: false, sweet: null })}>
            Cancel
          </Button>
          <Button onClick={handleRestock} variant="contained">
            Restock
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SweetList;





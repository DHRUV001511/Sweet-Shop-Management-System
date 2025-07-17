import React, { useState } from 'react';
import {
  Paper, TextField, Button, Typography, Box, Grid,
  MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { sweetAPI } from '../services/api';

const AddSweet = ({ onSweetAdded, showNotification }) => {
  const [sweetData, setSweetData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

  const categories = ['chocolate', 'candy', 'pastry', 'gummy', 'other'];

  const handleChange = (e) => {
    setSweetData({
      ...sweetData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sweetAPI.addSweet(sweetData);
      setSweetData({ name: '', category: '', price: '', quantity: '' });
      onSweetAdded();
      showNotification('Sweet added successfully!');
    } catch (error) {
      showNotification('Error adding sweet', 'error');
    }
  };

  return (
    <Paper className="form-container" elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Add New Sweet
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sweet Name"
              name="name"
              value={sweetData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={sweetData.category}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price (₹)"
              name="price"
              type="number"
              value={sweetData.price}
              onChange={handleChange}
              required
              inputProps={{ min: 0, step: 0.01 }}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={sweetData.quantity}
              onChange={handleChange}
              required
              inputProps={{ min: 0 }}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ py: 1.5 }}
            >
              Add Sweet
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddSweet;


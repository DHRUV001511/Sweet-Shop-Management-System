import React, { useState } from 'react';
import {
  Paper, TextField, Button, Typography, Box, Grid,
  MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { sweetAPI } from '../services/api';

const SearchSweets = ({ setFilteredSweets, showNotification }) => {
  const [searchData, setSearchData] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const categories = ['', 'chocolate', 'candy', 'pastry', 'gummy', 'other'];

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await sweetAPI.searchSweets(searchData);
      setFilteredSweets(response.data.data);
      showNotification(`Found ${response.data.data.length} sweets`);
    } catch (error) {
      showNotification('Error searching sweets', 'error');
    }
  };

  const handleClear = () => {
    setSearchData({ name: '', category: '', minPrice: '', maxPrice: '' });
    setFilteredSweets([]);
  };

  return (
    <Paper className="form-container" elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Search Sweets
      </Typography>
      
      <Box component="form" onSubmit={handleSearch}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sweet Name"
              name="name"
              value={searchData.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={searchData.category}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Categories'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Min Price (₹)"
              name="minPrice"
              type="number"
              value={searchData.minPrice}
              onChange={handleChange}
              inputProps={{ min: 0, step: 0.01 }}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Max Price (₹)"
              name="maxPrice"
              type="number"
              value={searchData.maxPrice}
              onChange={handleChange}
              inputProps={{ min: 0, step: 0.01 }}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleClear}
                sx={{ py: 1.5 }}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SearchSweets;


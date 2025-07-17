import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Alert, 
  Snackbar,
  CssBaseline 
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SweetList from './components/SweetList';
import AddSweet from './components/AddSweet';
import SearchSweets from './components/SearchSweets';
import { sweetAPI } from './services/api';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e91e63',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

function App() {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const fetchSweets = useCallback(async () => {
    try {
      const response = await sweetAPI.getAllSweets();
      setSweets(response.data.data);
      setFilteredSweets([]);
    } catch (error) {
      showNotification('Error fetching sweets', 'error');
    }
  }, []);

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const displaySweets = filteredSweets.length > 0 ? filteredSweets : sweets;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className="app-container">
        <Typography variant="h2" className="app-title" gutterBottom>
          🍭 Sweet Shop Management
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <SearchSweets 
            setFilteredSweets={setFilteredSweets} 
            showNotification={showNotification}
          />
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <AddSweet 
            onSweetAdded={fetchSweets} 
            showNotification={showNotification}
          />
        </Box>
        
        <SweetList 
          sweets={displaySweets}
          onSweetUpdated={fetchSweets}
          showNotification={showNotification}
        />
        
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;




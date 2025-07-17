import axios from 'axios';

const API_URL = '/api';

export const sweetAPI = {
  getAllSweets: () => axios.get(`${API_URL}/sweets`),
  
  getSweetById: (id) => axios.get(`${API_URL}/sweets/${id}`),
  
  addSweet: (sweetData) => axios.post(`${API_URL}/sweets`, sweetData),
  
  deleteSweet: (id) => axios.delete(`${API_URL}/sweets/${id}`),
  
  searchSweets: (params) => axios.get(`${API_URL}/sweets/search`, { params }),
  
  purchaseSweet: (id, quantity) => 
    axios.patch(`${API_URL}/sweets/${id}/purchase`, { quantity }),
  
  restockSweet: (id, quantity) => 
    axios.patch(`${API_URL}/sweets/${id}/restock`, { quantity })
};

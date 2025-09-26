import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/connexion';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Leads API calls
export const leadsAPI = {
  createLead: async (leadData) => {
    const response = await api.post('/leads', leadData);
    return response.data;
  }
};

// Products API calls
export const productsAPI = {
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  
  getProduct: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },
  
  getUserProducts: async () => {
    const response = await api.get('/user/products');
    return response.data;
  },
  
  addProductToUser: async (productId) => {
    const response = await api.post(`/user/products/${productId}`);
    return response.data;
  }
};

// Mock purchase function (to be replaced with Stripe integration)
export const mockPurchase = async (productId, userEmail) => {
  // Simulate purchase by adding product to user
  try {
    const response = await productsAPI.addProductToUser(productId);
    return {
      success: true,
      transactionId: 'mock_' + Date.now(),
      product: response
    };
  } catch (error) {
    throw error;
  }
};

export default api;
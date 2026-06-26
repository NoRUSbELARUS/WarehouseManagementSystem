import api from './axios';

export const wmsService = {
  getProducts: (page, size) => 
    api.get(`/products?page=${page}&size=${size}`).then(res => res.data),
  
  createProduct: (data) => api.post('/products', data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  
  getCategories: () => api.get('/categories').then(res => res.data),
  getWarehouses: () => api.get('/warehouses').then(res => res.data),
  getSuppliers: () => api.get('/suppliers').then(res => res.data),

  getInventoryByProduct: (productId) => 
    api.get(`/inventory/product/${productId}`).then(res => res.data),
};
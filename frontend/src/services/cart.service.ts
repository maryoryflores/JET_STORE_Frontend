import api from './api';

export const cartService = {
  getCart: () => api.get('/carrito'),

  addItem: (productoId: number, cantidad: number) =>
    api.post('/carrito', { productoId, cantidad }),

  updateItem: (productoId: number, cantidad: number) =>
    api.put(`/carrito/${productoId}`, { cantidad }),

  removeItem: (productoId: number) =>
    api.delete(`/carrito/${productoId}`),

  clearCart: () => api.delete('/carrito'),
};

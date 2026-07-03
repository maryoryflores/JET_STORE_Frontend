import api from './api';

export const adminService = {
  getStats: () => api.get('/admin/stats'),

  getUsers: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/admin/usuarios', { params }),

  updateUserRole: (userId: number, rol: string) =>
    api.put(`/admin/usuarios/${userId}/rol`, { rol }),

  getProducts: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/admin/productos', { params }),

  createProduct: (data: FormData) =>
    api.post('/admin/productos', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  updateProduct: (id: number, data: FormData) =>
    api.put(`/admin/productos/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteProduct: (id: number) => api.delete(`/admin/productos/${id}`),

  getCategories: () => api.get('/admin/categorias'),

  createCategory: (data: { nombre: string; descripcion: string }) =>
    api.post('/admin/categorias', data),

  updateCategory: (id: number, data: { nombre: string; descripcion: string }) =>
    api.put(`/admin/categorias/${id}`, data),

  deleteCategory: (id: number) => api.delete(`/admin/categorias/${id}`),

  getOrders: (params?: { page?: number; limit?: number; estado?: string }) =>
    api.get('/admin/pedidos', { params }),

  updateOrderStatus: (id: number, estado: string) =>
    api.put(`/admin/pedidos/${id}/estado`, { estado }),

  getPayments: (params?: { page?: number; limit?: number }) =>
    api.get('/admin/pagos', { params }),

  getLogs: (params?: { page?: number; limit?: number }) =>
    api.get('/admin/logs', { params }),
};

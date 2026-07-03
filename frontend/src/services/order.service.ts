import api from './api';

export const orderService = {
  create: (data: {
    direccionEnvio: string;
    metodoPago: string;
    items: Array<{ productoId: number; cantidad: number }>;
  }) => api.post('/pedidos', data),

  getAll: (params?: { page?: number; limit?: number; estado?: string }) =>
    api.get('/pedidos', { params }),

  getById: (id: number) => api.get(`/pedidos/${id}`),

  getByUser: () => api.get('/pedidos/usuario'),

  updateStatus: (id: number, estado: string) =>
    api.put(`/pedidos/${id}/estado`, { estado }),

  cancel: (id: number) => api.put(`/pedidos/${id}/cancelar`),
};

import api from './api';

export const reportService = {
  getSalesReport: (year?: number) =>
    api.get('/reportes/ventas', { params: { year } }),

  getTopProducts: (limit?: number) =>
    api.get('/reportes/productos-top', { params: { limit } }),

  getTopClients: (limit?: number) =>
    api.get('/reportes/clientes-frecuentes', { params: { limit } }),

  getRevenue: (year?: number) =>
    api.get('/reportes/ingresos', { params: { year } }),

  getDownloads: (year?: number) =>
    api.get('/reportes/descargas', { params: { year } }),
};

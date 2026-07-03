import api from './api';

export const productService = {
  getAll: (params?: {
    categoria?: string;
    search?: string;
    ordenar?: string;
    page?: number;
    limit?: number;
  }) => api.get('/productos', { params }),

  getById: (id: number) => api.get(`/productos/${id}`),

  getBySlug: (slug: string) => api.get(`/productos/slug/${slug}`),

  getDestacados: () => api.get('/productos/destacados'),

  getMasVendidos: () => api.get('/productos/mas-vendidos'),

  getRelacionados: (categoriaId: number, excludeId: number) =>
    api.get(`/productos/relacionados/${categoriaId}`, { params: { exclude: excludeId } }),

  search: (query: string) => api.get('/productos/buscar', { params: { q: query } }),
};

import api from './api';
import { Producto } from '@/types';

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  payload: T;
}

export interface LibroData {
  id?: number;
  titulo: string;
  autor: string;
  categoria?: { nombre: string };
  precio: number;
  formato: string;
  imagen?: string;
  stock: number;
}

export const productService = {
  getAll: () =>
    api.get<ApiResponse<Producto[]>>('/libro/todos'),

  getById: (id: number) =>
    api.get<ApiResponse<Producto>>(`/libro/ver/${id}`),

  search: (query: string) =>
    api.get<ApiResponse<Producto[]>>('/libro/buscar', { params: { q: query } }),

  filter: (filters: { categoria?: string; formato?: string; precioDesde?: number; precioHasta?: number }) =>
    api.post<ApiResponse<Producto[]>>('/libro/filtrar', filters),

  getByCategory: (nombre: string) =>
    api.get<ApiResponse<Producto[]>>(`/libro/categoria/${encodeURIComponent(nombre)}`),

  getRecent: () =>
    api.get<ApiResponse<Producto[]>>('/libro/recientes'),

  getCategories: () =>
    api.get<ApiResponse<string[]>>('/libro/categorias'),

  save: (data: LibroData) =>
    api.post<ApiResponse<null>>('/libro/guardar', data),

  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/libro/eliminar/${id}`),

  addStock: (libroId: number, cantidad: number) =>
    api.post<ApiResponse<null>>('/libro/agregar-stock', { libroId, cantidad }),
};

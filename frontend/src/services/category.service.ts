import api from './api';

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  payload: T;
}

export interface CategoriaPayload {
  id: number;
  nombre: string;
  descripcion: string | null;
  productCount: number;
}

export const categoryService = {
  getAll: () =>
    api.get<ApiResponse<CategoriaPayload[]>>('/categoria/todos'),

  create: (nombre: string) =>
    api.post<ApiResponse<CategoriaPayload>>('/categoria/guardar', { nombre }),

  update: (id: number, nombre: string) =>
    api.put<ApiResponse<CategoriaPayload>>(`/categoria/actualizar/${id}`, { nombre }),

  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/categoria/eliminar/${id}`),
};

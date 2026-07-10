import api from './api';
import { CarritoItem } from '@/types';

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  payload: T;
}

interface CarritoResponse {
  carritoId: number;
  items: CarritoItem[];
  total: number;
}

export const cartService = {
  getCart: (usuarioId: number) =>
    api.get<ApiResponse<CarritoResponse>>(`/carrito/ver/${usuarioId}`),

  addItem: (usuarioId: number, libroId: number, cantidad: number = 1) =>
    api.post<ApiResponse<CarritoResponse>>('/carrito/agregar', { usuarioId, libroId, cantidad }),

  removeItem: (usuarioId: number, libroId: number) =>
    api.delete<ApiResponse<CarritoResponse>>(`/carrito/eliminar/${usuarioId}/${libroId}`),
};

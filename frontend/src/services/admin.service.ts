import api from './api';
import { LibroData, productService } from './product.service';

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  payload: T;
}

export const adminService = {
  getStats: () => Promise.resolve({ data: { ok: true, mensaje: 'ok', payload: null } }),

  getUsers: () =>
    api.get<ApiResponse<Array<{ id: number; nombreUsuario: string; correo: string; rol: string }>>>(
      '/usuario/todos'
    ),

  saveProduct: (data: LibroData) => productService.save(data),

  deleteProduct: (id: number) => productService.delete(id),

  addStock: (libroId: number, cantidad: number) => productService.addStock(libroId, cantidad),

  getCategories: () => productService.getCategories(),
};

import api from './api';

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  payload: T;
}

export const orderService = {
  createPayment: (usuarioId: number, metodoPago: string) =>
    api.post<ApiResponse<{ pagoId: number; metodoPago: string; estado: string; montoTotal: number }>>(
      '/pago/procesar',
      { usuarioId, metodoPago }
    ),

  confirmPayment: (pagoId: number, referencia?: string) =>
    api.post<ApiResponse<{ ventaId: number; usuario: string; total: number; fechaHora: string; libros: string[] }>>(
      '/pago/confirmar',
      { pagoId, referencia }
    ),
};

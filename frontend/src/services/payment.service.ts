import api from './api';

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  payload: T;
}

interface PagoResponse {
  pagoId: number;
  metodoPago: string;
  estado: string;
  montoTotal: number;
  referencia: string | null;
  fechaCreacion: string;
  fechaConfirmacion: string | null;
}

interface VentaResponse {
  ventaId: number;
  usuario: string;
  total: number;
  fechaHora: string;
  libros: string[];
}

export const paymentService = {
  processPayment: (usuarioId: number, metodoPago: string) =>
    api.post<ApiResponse<PagoResponse>>('/pago/procesar', { usuarioId, metodoPago }),

  confirmPayment: (pagoId: number, referencia?: string) =>
    api.post<ApiResponse<VentaResponse>>('/pago/confirmar', { pagoId, referencia }),
};

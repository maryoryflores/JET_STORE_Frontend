import api from './api';

export const paymentService = {
  processPayment: (data: {
    pedidoId: number;
    metodo: string;
    detalles: Record<string, unknown>;
  }) => api.post('/pagos/procesar', data),

  confirmPayment: (pagoId: number, comprobante?: FormData) =>
    api.post(`/pagos/${pagoId}/confirmar`, comprobante, {
      headers: comprobante ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),

  getPaymentMethods: () => api.get('/pagos/metodos'),
};

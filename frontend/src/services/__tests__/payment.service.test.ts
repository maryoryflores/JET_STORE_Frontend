import { describe, it, expect, vi } from 'vitest';

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

import { paymentService } from '@/services/payment.service';
import api from '@/services/api';

describe('paymentService', () => {
  it('processPayment calls api.post', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await paymentService.processPayment(1, 'Visa');
    expect(api.post).toHaveBeenCalledWith('/pago/procesar', { usuarioId: 1, metodoPago: 'Visa' });
  });

  it('confirmPayment calls api.post with optional referencia', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await paymentService.confirmPayment(1, 'REF123');
    expect(api.post).toHaveBeenCalledWith('/pago/confirmar', { pagoId: 1, referencia: 'REF123' });
  });

  it('confirmPayment works without referencia', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await paymentService.confirmPayment(1);
    expect(api.post).toHaveBeenCalledWith('/pago/confirmar', { pagoId: 1, referencia: undefined });
  });
});

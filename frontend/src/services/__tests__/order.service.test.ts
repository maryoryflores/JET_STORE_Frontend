import { describe, it, expect, vi } from 'vitest';

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

import { orderService } from '@/services/order.service';
import api from '@/services/api';

describe('orderService', () => {
  it('createPayment calls api.post', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await orderService.createPayment(1, 'Visa');
    expect(api.post).toHaveBeenCalledWith('/pago/procesar', { usuarioId: 1, metodoPago: 'Visa' });
  });

  it('confirmPayment calls api.post', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await orderService.confirmPayment(5, 'REF');
    expect(api.post).toHaveBeenCalledWith('/pago/confirmar', { pagoId: 5, referencia: 'REF' });
  });

  it('confirmPayment works without referencia', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await orderService.confirmPayment(5);
    expect(api.post).toHaveBeenCalledWith('/pago/confirmar', { pagoId: 5, referencia: undefined });
  });
});

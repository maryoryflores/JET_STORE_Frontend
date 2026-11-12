import { describe, it, expect, vi } from 'vitest';

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

import { cartService } from '@/services/cart.service';
import api from '@/services/api';

describe('cartService', () => {
  it('getCart calls api.get with usuarioId', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true } } as never);
    await cartService.getCart(1);
    expect(api.get).toHaveBeenCalledWith('/carrito/ver/1');
  });

  it('addItem calls api.post with payload', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await cartService.addItem(1, 5, 2);
    expect(api.post).toHaveBeenCalledWith('/carrito/agregar', { usuarioId: 1, libroId: 5, cantidad: 2 });
  });

  it('addItem defaults cantidad to 1', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await cartService.addItem(1, 5);
    expect(api.post).toHaveBeenCalledWith('/carrito/agregar', { usuarioId: 1, libroId: 5, cantidad: 1 });
  });

  it('removeItem calls api.delete', async () => {
    vi.mocked(api.delete).mockResolvedValue({ data: { ok: true } } as never);
    await cartService.removeItem(1, 5);
    expect(api.delete).toHaveBeenCalledWith('/carrito/eliminar/1/5');
  });
});

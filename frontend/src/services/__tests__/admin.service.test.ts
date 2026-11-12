import { describe, it, expect, vi } from 'vitest';

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('@/services/product.service', () => ({
  productService: {
    save: vi.fn(),
    delete: vi.fn(),
    addStock: vi.fn(),
    getCategories: vi.fn(),
  },
}));

import { adminService } from '@/services/admin.service';
import api from '@/services/api';
import { productService } from '@/services/product.service';

describe('adminService', () => {
  it('getStats returns mock data', async () => {
    const res = await adminService.getStats();
    expect(res.data.ok).toBe(true);
  });

  it('getUsers calls api.get', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true, payload: [] } } as never);
    await adminService.getUsers();
    expect(api.get).toHaveBeenCalledWith('/usuario/todos');
  });

  it('saveProduct delegates to productService.save', async () => {
    const data = { titulo: 'Test', autor: 'A', precio: 10, formato: 'PDF', stock: 5 };
    vi.mocked(productService.save).mockResolvedValue({ data: { ok: true, payload: null } } as never);
    await adminService.saveProduct(data);
    expect(productService.save).toHaveBeenCalledWith(data);
  });

  it('deleteProduct delegates to productService.delete', async () => {
    vi.mocked(productService.delete).mockResolvedValue({ data: { ok: true, payload: null } } as never);
    await adminService.deleteProduct(1);
    expect(productService.delete).toHaveBeenCalledWith(1);
  });

  it('addStock delegates to productService.addStock', async () => {
    vi.mocked(productService.addStock).mockResolvedValue({ data: { ok: true, payload: null } } as never);
    await adminService.addStock(1, 10);
    expect(productService.addStock).toHaveBeenCalledWith(1, 10);
  });

  it('getCategories delegates to productService.getCategories', async () => {
    vi.mocked(productService.getCategories).mockResolvedValue({ data: { ok: true, payload: ['Tech'] } } as never);
    await adminService.getCategories();
    expect(productService.getCategories).toHaveBeenCalled();
  });
});

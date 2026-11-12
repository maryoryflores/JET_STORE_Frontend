import { describe, it, expect, vi } from 'vitest';

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

import { productService } from '@/services/product.service';
import api from '@/services/api';

describe('productService', () => {
  it('getAll calls api.get', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true, payload: [] } } as never);
    await productService.getAll();
    expect(api.get).toHaveBeenCalledWith('/libro/todos');
  });

  it('getById calls api.get with id', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true, payload: null } } as never);
    await productService.getById(5);
    expect(api.get).toHaveBeenCalledWith('/libro/ver/5');
  });

  it('search calls api.get with query param', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true, payload: [] } } as never);
    await productService.search('react');
    expect(api.get).toHaveBeenCalledWith('/libro/buscar', { params: { q: 'react' } });
  });

  it('filter calls api.post with filters', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true, payload: [] } } as never);
    await productService.filter({ categoria: 'Tech', precioDesde: 10 });
    expect(api.post).toHaveBeenCalledWith('/libro/filtrar', { categoria: 'Tech', precioDesde: 10 });
  });

  it('getByCategory calls api.get with encoded name', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true, payload: [] } } as never);
    await productService.getByCategory('Tecnología');
    expect(api.get).toHaveBeenCalledWith('/libro/categoria/Tecnolog%C3%ADa');
  });

  it('getRecent calls api.get', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true, payload: [] } } as never);
    await productService.getRecent();
    expect(api.get).toHaveBeenCalledWith('/libro/recientes');
  });

  it('getCategories calls api.get', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true, payload: [] } } as never);
    await productService.getCategories();
    expect(api.get).toHaveBeenCalledWith('/libro/categorias');
  });

  it('save calls api.post', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true, payload: null } } as never);
    const data = { titulo: 'Test', autor: 'A', precio: 10, formato: 'PDF', stock: 5 };
    await productService.save(data);
    expect(api.post).toHaveBeenCalledWith('/libro/guardar', data);
  });

  it('delete calls api.delete', async () => {
    vi.mocked(api.delete).mockResolvedValue({ data: { ok: true, payload: null } } as never);
    await productService.delete(3);
    expect(api.delete).toHaveBeenCalledWith('/libro/eliminar/3');
  });

  it('addStock calls api.post', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true, payload: null } } as never);
    await productService.addStock(1, 10);
    expect(api.post).toHaveBeenCalledWith('/libro/agregar-stock', { libroId: 1, cantidad: 10 });
  });
});

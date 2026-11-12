import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { Producto, CarritoItem } from '@/types';

vi.mock('@/services/cart.service', () => ({
  cartService: {
    getCart: vi.fn(),
    addItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

import { cartService } from '@/services/cart.service';

const mockProducto: Producto = {
  id: 1,
  titulo: 'Test Book',
  autor: 'Author',
  categoria: 'Tech',
  precio: 25,
  formato: 'PDF',
  stock: 10,
  fechaCreacion: '2025-01-01',
};

const mockItem: CarritoItem = {
  itemId: 1,
  libroId: 1,
  titulo: 'Test Book',
  autor: 'Author',
  precioUnitario: 25,
  cantidad: 2,
  subtotal: 50,
};

describe('useCartStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useCartStore.setState({ items: [], total: 0 });
    useAuthStore.setState({ usuario: null, token: null, isAuthenticated: false });
  });

  it('starts with empty state', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.total).toBe(0);
  });

  it('totalItems returns sum of quantities', () => {
    useCartStore.setState({ items: [mockItem, { ...mockItem, itemId: 2, libroId: 2, cantidad: 3, subtotal: 75 }] });
    expect(useCartStore.getState().totalItems()).toBe(5);
  });

  it('subtotal returns sum of item subtotals', () => {
    useCartStore.setState({ items: [mockItem, { ...mockItem, itemId: 2, libroId: 2, subtotal: 75 }] });
    expect(useCartStore.getState().subtotal()).toBe(125);
  });

  it('vaciar clears all items', () => {
    useCartStore.setState({ items: [mockItem], total: 50 });
    useCartStore.getState().vaciar();
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().total).toBe(0);
  });

  it('agregar returns false when not authenticated', async () => {
    const result = await useCartStore.getState().agregar(mockProducto);
    expect(result).toBe(false);
  });

  it('agregar adds item via API when authenticated', async () => {
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'u', correo: 'u@u.com', rol: 'CLIENTE' }, isAuthenticated: true });
    vi.mocked(cartService.addItem).mockResolvedValue({
      data: { ok: true, payload: { items: [mockItem], total: 50 } },
    } as never);

    const result = await useCartStore.getState().agregar(mockProducto);
    expect(result).toBe(true);
    expect(useCartStore.getState().items).toEqual([mockItem]);
  });

  it('agregar falls back to local on API error', async () => {
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'u', correo: 'u@u.com', rol: 'CLIENTE' }, isAuthenticated: true });
    vi.mocked(cartService.addItem).mockRejectedValue(new Error('fail'));

    const result = await useCartStore.getState().agregar(mockProducto);
    expect(result).toBe(true);
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0].libroId).toBe(1);
  });

  it('agregar increments quantity for existing local item', async () => {
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'u', correo: 'u@u.com', rol: 'CLIENTE' }, isAuthenticated: true });
    vi.mocked(cartService.addItem).mockRejectedValue(new Error('fail'));

    await useCartStore.getState().agregar(mockProducto);
    await useCartStore.getState().agregar(mockProducto);
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0].cantidad).toBe(2);
  });

  it('eliminar returns false when not authenticated', async () => {
    const result = await useCartStore.getState().eliminar(1);
    expect(result).toBe(false);
  });

  it('eliminar removes item via API when authenticated', async () => {
    useCartStore.setState({ items: [mockItem], total: 50 });
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'u', correo: 'u@u.com', rol: 'CLIENTE' }, isAuthenticated: true });
    vi.mocked(cartService.removeItem).mockResolvedValue({
      data: { ok: true, payload: { items: [], total: 0 } },
    } as never);

    const result = await useCartStore.getState().eliminar(1);
    expect(result).toBe(true);
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('eliminar falls back to local on API error', async () => {
    useCartStore.setState({ items: [mockItem], total: 50 });
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'u', correo: 'u@u.com', rol: 'CLIENTE' }, isAuthenticated: true });
    vi.mocked(cartService.removeItem).mockRejectedValue(new Error('fail'));

    const result = await useCartStore.getState().eliminar(1);
    expect(result).toBe(true);
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('actualizarCantidad returns false when not authenticated', async () => {
    const result = await useCartStore.getState().actualizarCantidad(1, 5);
    expect(result).toBe(false);
  });

  it('actualizarCantidad returns false when cantidad < 1', async () => {
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'u', correo: 'u@u.com', rol: 'CLIENTE' }, isAuthenticated: true });
    const result = await useCartStore.getState().actualizarCantidad(1, 0);
    expect(result).toBe(false);
  });

  it('actualizarCantidad falls back to local on API error', async () => {
    useCartStore.setState({ items: [mockItem], total: 50 });
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'u', correo: 'u@u.com', rol: 'CLIENTE' }, isAuthenticated: true });
    vi.mocked(cartService.removeItem).mockRejectedValue(new Error('fail'));

    const result = await useCartStore.getState().actualizarCantidad(1, 5);
    expect(result).toBe(true);
    expect(useCartStore.getState().items[0].cantidad).toBe(5);
    expect(useCartStore.getState().items[0].subtotal).toBe(125);
  });

  it('cargarCarrito clears items when not authenticated', async () => {
    useCartStore.setState({ items: [mockItem], total: 50 });
    await useCartStore.getState().cargarCarrito();
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().total).toBe(0);
  });

  it('cargarCarrito loads from API when authenticated', async () => {
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'u', correo: 'u@u.com', rol: 'CLIENTE' }, isAuthenticated: true });
    vi.mocked(cartService.getCart).mockResolvedValue({
      data: { ok: true, payload: { items: [mockItem], total: 50 } },
    } as never);

    await useCartStore.getState().cargarCarrito();
    expect(useCartStore.getState().items).toEqual([mockItem]);
    expect(useCartStore.getState().total).toBe(50);
  });

  it('cargarCarrito keeps local items on API error', async () => {
    useCartStore.setState({ items: [mockItem], total: 50 });
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'u', correo: 'u@u.com', rol: 'CLIENTE' }, isAuthenticated: true });
    vi.mocked(cartService.getCart).mockRejectedValue(new Error('fail'));

    await useCartStore.getState().cargarCarrito();
    expect(useCartStore.getState().items).toEqual([mockItem]);
  });
});

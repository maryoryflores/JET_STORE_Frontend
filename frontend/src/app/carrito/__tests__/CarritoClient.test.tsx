import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const mockAgregar = vi.fn();
const mockEliminar = vi.fn();
const mockActualizarCantidad = vi.fn();
const mockVaciar = vi.fn();
const mockCargarCarrito = vi.fn();
const mockSubtotal = vi.fn(() => 0);

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('@/store/cart-store', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('@/store/favorites-store', () => ({
  useFavoritesStore: vi.fn(() => ({
    items: [],
    toggle: vi.fn(),
    isFavorite: vi.fn(() => false),
  })),
}));

vi.mock('@/components/cart/CartItem', () => ({
  default: ({ item }: { item: { titulo: string } }) => <div data-testid="cart-item">{item.titulo}</div>,
}));

vi.mock('@/components/cart/CartSummary', () => ({
  default: ({ subtotal }: { subtotal: number }) => <div data-testid="cart-summary">{subtotal}</div>,
}));

import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import CarritoClient from '@/app/carrito/CarritoClient';

describe('CarritoClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login prompt when not authenticated', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      items: [],
      isAuthenticated: false,
      usuario: null,
      token: null,
      subtotal: mockSubtotal,
    } as ReturnType<typeof useAuthStore>);

    vi.mocked(useCartStore).mockReturnValue({
      items: [],
      isAuthenticated: false,
      subtotal: mockSubtotal,
      agregar: mockAgregar,
      eliminar: mockEliminar,
      actualizarCantidad: mockActualizarCantidad,
      vaciar: mockVaciar,
      cargarCarrito: mockCargarCarrito,
    } as ReturnType<typeof useCartStore>);

    render(<CarritoClient />);
    expect(screen.getByText('Inicia sesión para ver tu carrito')).toBeInTheDocument();
  });

  it('renders empty cart when authenticated with no items', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      items: [],
      isAuthenticated: true,
      usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'CLIENTE' },
      token: 'tok',
      subtotal: mockSubtotal,
    } as ReturnType<typeof useAuthStore>);

    vi.mocked(useCartStore).mockReturnValue({
      items: [],
      isAuthenticated: true,
      subtotal: mockSubtotal,
      agregar: mockAgregar,
      eliminar: mockEliminar,
      actualizarCantidad: mockActualizarCantidad,
      vaciar: mockVaciar,
      cargarCarrito: mockCargarCarrito,
    } as ReturnType<typeof useCartStore>);

    render(<CarritoClient />);
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
  });
});

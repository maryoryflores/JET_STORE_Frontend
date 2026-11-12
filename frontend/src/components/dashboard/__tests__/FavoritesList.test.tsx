import { describe, it, expect, vi } from 'vitest';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'CLIENTE' },
    token: 'tok',
    isAuthenticated: true,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    setUsuario: vi.fn(),
  })),
}));

vi.mock('@/store/cart-store', () => ({
  useCartStore: vi.fn(() => ({
    items: [{ id: 1, libroId: 1, titulo: 'Test Book', autor: 'Author', precio: 29.99, cantidad: 1, subtotal: 29.99, formato: 'PDF', imagen: '' }],
    total: 29.99,
    agregar: vi.fn(),
    eliminar: vi.fn(),
    actualizarCantidad: vi.fn(),
    vaciar: vi.fn(),
    cargarCarrito: vi.fn(),
    totalItems: vi.fn(() => 1),
    subtotal: vi.fn(() => 29.99),
  })),
}));

vi.mock('@/store/favorites-store', () => ({
  useFavoritesStore: vi.fn(() => ({
    items: [1],
    toggle: vi.fn(),
    isFavorite: vi.fn(() => true),
  })),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

vi.mock('@/utils/format', () => ({
  formatCurrency: (v: number) => `S/ ${v.toFixed(2)}`,
}));

vi.mock('@/services/product.service', () => ({
  productService: {
    getAll: vi.fn().mockRejectedValue(new Error('fail')),
  },
}));

vi.mock('@/data/productos', () => ({
  productos: [
    { id: 1, titulo: 'Favorito 1', autor: 'Autor F1', categoria: 'Ficción', precio: 25, formato: 'PDF', imagen: '', stock: 10, fechaPublicacion: '2024-01-01' },
  ],
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: Record<string, unknown>) => (
    <button>{children as React.ReactNode}</button>
  ),
}));

vi.mock('react-icons/hi', () => ({
  HiHeart: () => <svg data-testid="icon-heart" />,
  HiShoppingCart: () => <svg data-testid="icon-cart" />,
  HiTrash: () => <svg data-testid="icon-trash" />,
}));

import { render, screen } from '@testing-library/react';
import FavoritesList from '@/components/dashboard/FavoritesList';
import { useFavoritesStore } from '@/store/favorites-store';

describe('FavoritesList', () => {
  it('renders favorite products', async () => {
    render(<FavoritesList />);
    expect(await screen.findByText('Favorito 1')).toBeDefined();
  });

  it('displays product price', async () => {
    render(<FavoritesList />);
    expect(await screen.findByText('S/ 25.00')).toBeDefined();
  });

  it('renders add to cart button', async () => {
    render(<FavoritesList />);
    expect(await screen.findByText('Carrito')).toBeDefined();
  });

  it('displays author name', async () => {
    render(<FavoritesList />);
    expect(await screen.findByText('Autor F1')).toBeDefined();
  });
});

describe('FavoritesList - Empty State', () => {
  it('shows empty state when no favorites', () => {
    vi.mocked(useFavoritesStore).mockReturnValue({
      items: [],
      toggle: vi.fn(),
      isFavorite: vi.fn(() => false),
    });

    render(<FavoritesList />);
    expect(screen.getByText('No tienes favoritos')).toBeDefined();
    expect(screen.getByText('Agrega productos a tu lista de favoritos')).toBeDefined();
  });
});

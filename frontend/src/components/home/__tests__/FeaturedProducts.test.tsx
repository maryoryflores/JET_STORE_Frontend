import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

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
    items: [],
    total: 0,
    agregar: vi.fn(),
    eliminar: vi.fn(),
    actualizarCantidad: vi.fn(),
    vaciar: vi.fn(),
    cargarCarrito: vi.fn(),
    totalItems: vi.fn(() => 0),
    subtotal: vi.fn(() => 0),
  })),
}));

vi.mock('@/store/favorites-store', () => ({
  useFavoritesStore: vi.fn(() => ({
    items: [],
    toggle: vi.fn(),
    isFavorite: vi.fn(() => false),
  })),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

const mockFeatured = vi.hoisted(() => [
  { id: 1, titulo: 'Destacado 1', autor: 'Autor A', categoria: 'Ficcion', precio: 45, formato: 'PDF', imagen: '', stock: 10, fechaCreacion: '2024-03-01' },
  { id: 2, titulo: 'Destacado 2', autor: 'Autor B', categoria: 'Ciencia', precio: 60, formato: 'EPUB', imagen: '', stock: 0, fechaCreacion: '2024-04-01' },
]);

vi.mock('@/services/product.service', () => ({
  productService: {
    getRecent: vi.fn().mockResolvedValue({ data: { ok: true, payload: mockFeatured } }),
  },
}));

vi.mock('@/utils/format', () => ({
  formatCurrency: (v: number) => `S/ ${v.toFixed(2)}`,
  truncateText: (t: string) => t,
}));

import FeaturedProducts from '@/components/home/FeaturedProducts';

describe('FeaturedProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the section heading after loading', async () => {
    render(<FeaturedProducts />);
    await waitFor(() => {
      expect(screen.getByText('Productos Destacados')).toBeInTheDocument();
    });
  });

  it('renders featured product titles', async () => {
    render(<FeaturedProducts />);
    await waitFor(() => {
      expect(screen.getByText('Destacado 1')).toBeInTheDocument();
      expect(screen.getByText('Destacado 2')).toBeInTheDocument();
    });
  });

  it('renders the catalog link', async () => {
    render(<FeaturedProducts />);
    await waitFor(() => {
      expect(screen.getByText('Ver Catálogo Completo')).toBeInTheDocument();
    });
  });

  it('renders product authors', async () => {
    render(<FeaturedProducts />);
    await waitFor(() => {
      expect(screen.getByText('Autor A')).toBeInTheDocument();
      expect(screen.getByText('Autor B')).toBeInTheDocument();
    });
  });

  it('renders formatted prices', async () => {
    render(<FeaturedProducts />);
    await waitFor(() => {
      expect(screen.getByText('S/ 45.00')).toBeInTheDocument();
      expect(screen.getByText('S/ 60.00')).toBeInTheDocument();
    });
  });

  it('renders category badges', async () => {
    render(<FeaturedProducts />);
    await waitFor(() => {
      expect(screen.getByText('Ficcion')).toBeInTheDocument();
      expect(screen.getByText('Ciencia')).toBeInTheDocument();
    });
  });

  it('shows Sin Stock for out of stock products', async () => {
    render(<FeaturedProducts />);
    await waitFor(() => {
      const sinStockElements = screen.getAllByText('Sin Stock');
      expect(sinStockElements.length).toBeGreaterThanOrEqual(1);
    });
  });
});

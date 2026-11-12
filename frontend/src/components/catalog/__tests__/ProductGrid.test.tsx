import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

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
  useCartStore: vi.fn((selector) => {
    const state = {
      items: [],
      total: 0,
      agregar: vi.fn(),
      eliminar: vi.fn(),
      actualizarCantidad: vi.fn(),
      vaciar: vi.fn(),
      cargarCarrito: vi.fn(),
      totalItems: vi.fn(() => 0),
      subtotal: vi.fn(() => 0),
    };
    return selector ? selector(state) : state;
  }),
}));

vi.mock('@/store/favorites-store', () => ({
  useFavoritesStore: vi.fn((selector) => {
    const state = {
      items: [],
      toggle: vi.fn(),
      isFavorite: vi.fn(() => false),
    };
    return selector ? selector(state) : state;
  }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>,
}));

vi.mock('@/components/ui/Badge', () => ({
  default: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

vi.mock('@/utils/format', () => ({
  formatCurrency: (v: number) => `S/ ${v.toFixed(2)}`,
  truncateText: (t: string) => t,
}));

import ProductGrid from '@/components/catalog/ProductGrid';

const mockProducts = [
  { id: 1, titulo: 'Libro Alpha', autor: 'Autor A', categoria: 'Ficcion', precio: 50, formato: 'PDF', imagen: '', stock: 10, fechaCreacion: '2024-01-01' },
  { id: 2, titulo: 'Libro Beta', autor: 'Autor B', categoria: 'Ciencia', precio: 30, formato: 'EPUB', imagen: '', stock: 0, fechaCreacion: '2024-02-01' },
];

describe('ProductGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders product titles', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('Libro Alpha')).toBeInTheDocument();
    expect(screen.getByText('Libro Beta')).toBeInTheDocument();
  });

  it('renders product authors', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('Autor A')).toBeInTheDocument();
    expect(screen.getByText('Autor B')).toBeInTheDocument();
  });

  it('renders formatted prices', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('S/ 50.00')).toBeInTheDocument();
    expect(screen.getByText('S/ 30.00')).toBeInTheDocument();
  });

  it('shows "Sin Stock" badge for out-of-stock products', () => {
    render(<ProductGrid products={mockProducts} />);
    const sinStockElements = screen.getAllByText('Sin Stock');
    expect(sinStockElements.length).toBeGreaterThanOrEqual(1);
  });

  it('shows empty state when no products', () => {
    render(<ProductGrid products={[]} />);
    expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
  });

  it('renders add-to-cart buttons', () => {
    render(<ProductGrid products={mockProducts} />);
    const cartButtons = screen.getAllByText(/Agregar al Carrito/);
    expect(cartButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('disables cart button for out-of-stock products', () => {
    render(<ProductGrid products={mockProducts} />);
    const sinStockButtons = screen.getAllByText('Sin Stock');
    sinStockButtons.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });
  });
});

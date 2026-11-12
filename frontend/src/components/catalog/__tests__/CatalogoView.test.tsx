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

const mockProductos = vi.hoisted(() => [
  { id: 1, titulo: 'Libro Test', autor: 'Autor 1', categoria: 'Ficcion', precio: 50, formato: 'PDF', imagen: '', stock: 10, fechaCreacion: '2024-01-01' },
  { id: 2, titulo: 'Otro Libro', autor: 'Autor 2', categoria: 'Ciencia', precio: 30, formato: 'EPUB', imagen: '', stock: 5, fechaCreacion: '2024-02-01' },
]);

vi.mock('@/services/product.service', () => ({
  productService: {
    getAll: vi.fn().mockResolvedValue({ data: { ok: true, payload: mockProductos } }),
    getCategories: vi.fn().mockResolvedValue({ data: { ok: true, payload: ['Ficcion', 'Ciencia'] } }),
  },
}));

vi.mock('@/components/catalog/SearchBar', () => ({
  default: ({ value, onChange }: any) => <input data-testid="search-bar" value={value} onChange={(e) => onChange(e.target.value)} />,
}));

vi.mock('@/components/catalog/ProductFilters', () => ({
  default: () => <div data-testid="product-filters" />,
}));

vi.mock('@/components/catalog/ProductSort', () => ({
  default: () => <div data-testid="product-sort" />,
}));

vi.mock('@/components/catalog/ProductGrid', () => ({
  default: ({ products }: any) => (
    <div data-testid="product-grid">{products.map((p: any) => <span key={p.id}>{p.titulo}</span>)}</div>
  ),
}));

vi.mock('@/components/ui/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading</div>,
}));

import CatalogoView from '@/components/catalog/CatalogoView';

describe('CatalogoView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the catalog title', async () => {
    render(<CatalogoView />);
    expect(screen.getByText('Catálogo de Libros')).toBeInTheDocument();
  });

  it('shows loading spinner initially', () => {
    render(<CatalogoView />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    render(<CatalogoView />);
    await waitFor(() => {
      expect(screen.getByText('Libro Test')).toBeInTheDocument();
    });
  });

  it('renders product grid with loaded products', async () => {
    render(<CatalogoView />);
    await waitFor(() => {
      expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    });
  });

  it('displays product count after loading', async () => {
    render(<CatalogoView />);
    await waitFor(() => {
      expect(screen.getByText('2 productos encontrados')).toBeInTheDocument();
    });
  });
});

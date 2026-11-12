import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'ADMIN' },
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

vi.mock('@/services/product.service', () => ({
  productService: { getAll: vi.fn().mockRejectedValue(new Error('API Error')) },
}));

vi.mock('@/data/productos', () => ({
  productos: [
    { id: 1, titulo: 'Libro Test', autor: 'Autor', categoria: 'Cat', precio: 10, formato: 'PDF', imagen: '', stock: 5, fechaPublicacion: '2024-01-01' },
  ],
}));

vi.mock('@/components/admin/StatsCards', () => ({ default: () => <div data-testid="stats-cards" /> }));
vi.mock('@/components/admin/Charts', () => ({ default: () => <div data-testid="charts" /> }));

import AdminDashboardPage from '@/app/admin/AdminClient';

describe('AdminClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText('Libros Registrados')).toBeInTheDocument();
  });

  it('renders StatsCards and Charts', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByTestId('stats-cards')).toBeInTheDocument();
    expect(screen.getByTestId('charts')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Autor')).toBeInTheDocument();
    expect(screen.getByText('Categoría')).toBeInTheDocument();
  });

  it('shows fallback data when API fails', async () => {
    render(<AdminDashboardPage />);
    await waitFor(() => {
      expect(screen.getByText('Libro Test')).toBeInTheDocument();
    });
  });
});

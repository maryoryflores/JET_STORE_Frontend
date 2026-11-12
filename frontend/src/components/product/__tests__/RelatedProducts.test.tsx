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

const mockRelatedProducts = vi.hoisted(() => [
  { id: 2, titulo: 'Libro Relacionado 1', autor: 'Autor X', categoria: 'Ficcion', precio: 40, formato: 'PDF', imagen: '', stock: 5, fechaCreacion: '2024-01-01' },
  { id: 3, titulo: 'Libro Relacionado 2', autor: 'Autor Y', categoria: 'Ficcion', precio: 55, formato: 'EPUB', imagen: '', stock: 8, fechaCreacion: '2024-02-01' },
]);

vi.mock('@/services/product.service', () => ({
  productService: {
    getByCategory: vi.fn().mockResolvedValue({
      data: { ok: true, payload: mockRelatedProducts },
    }),
  },
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>,
}));

vi.mock('@/utils/format', () => ({
  formatCurrency: (v: number) => `S/ ${v.toFixed(2)}`,
  truncateText: (t: string) => t,
}));

import RelatedProducts from '@/components/product/RelatedProducts';

describe('RelatedProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the section heading', async () => {
    render(<RelatedProducts currentId={1} categoria="Ficcion" />);
    await waitFor(() => {
      expect(screen.getByText('Productos Relacionados')).toBeInTheDocument();
    });
  });

  it('renders related product titles', async () => {
    render(<RelatedProducts currentId={1} categoria="Ficcion" />);
    await waitFor(() => {
      expect(screen.getByText('Libro Relacionado 1')).toBeInTheDocument();
      expect(screen.getByText('Libro Relacionado 2')).toBeInTheDocument();
    });
  });

  it('renders formatted prices for related products', async () => {
    render(<RelatedProducts currentId={1} categoria="Ficcion" />);
    await waitFor(() => {
      expect(screen.getByText('S/ 40.00')).toBeInTheDocument();
      expect(screen.getByText('S/ 55.00')).toBeInTheDocument();
    });
  });

  it('renders add buttons for in-stock products', async () => {
    render(<RelatedProducts currentId={1} categoria="Ficcion" />);
    await waitFor(() => {
      const addButtons = screen.getAllByText('Agregar');
      expect(addButtons.length).toBe(2);
    });
  });

  it('renders null when no related products', async () => {
    const { productService } = await import('@/services/product.service');
    (productService.getByCategory as any).mockResolvedValueOnce({
      data: { ok: true, payload: [] },
    });

    const { container } = render(<RelatedProducts currentId={1} categoria="Ficcion" />);
    await waitFor(() => {
      expect(container.innerHTML).toBe('');
    });
  });

  it('renders authors for related products', async () => {
    render(<RelatedProducts currentId={1} categoria="Ficcion" />);
    await waitFor(() => {
      expect(screen.getByText('Autor X')).toBeInTheDocument();
      expect(screen.getByText('Autor Y')).toBeInTheDocument();
    });
  });
});

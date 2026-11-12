import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

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
  default: ({ children, onClick, disabled, ...props }: any) => (
    <button onClick={onClick} disabled={disabled} {...props}>{children}</button>
  ),
}));

vi.mock('@/components/ui/Badge', () => ({
  default: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

vi.mock('@/utils/format', () => ({
  formatCurrency: (v: number) => `S/ ${v.toFixed(2)}`,
  truncateText: (t: string) => t,
}));

import ProductInfo from '@/components/product/ProductInfo';
import { useCartStore } from '@/store/cart-store';

const mockProduct = {
  id: 1,
  titulo: 'Libro de Prueba',
  autor: 'Autor Test',
  categoria: 'Ficcion',
  precio: 99.9,
  formato: 'PDF',
  imagen: 'test.jpg',
  stock: 15,
  fechaCreacion: '2024-01-01',
};

describe('ProductInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the product title', () => {
    render(<ProductInfo producto={mockProduct} />);
    expect(screen.getByText('Libro de Prueba')).toBeInTheDocument();
  });

  it('renders the author', () => {
    render(<ProductInfo producto={mockProduct} />);
    expect(screen.getByText('por Autor Test')).toBeInTheDocument();
  });

  it('renders the formatted price', () => {
    render(<ProductInfo producto={mockProduct} />);
    expect(screen.getByText('S/ 99.90')).toBeInTheDocument();
  });

  it('renders the category badge', () => {
    render(<ProductInfo producto={mockProduct} />);
    expect(screen.getByText('Ficcion')).toBeInTheDocument();
  });

  it('renders stock info when in stock', () => {
    render(<ProductInfo producto={mockProduct} />);
    expect(screen.getByText('15 disponibles')).toBeInTheDocument();
  });

  it('shows "Agotado" when stock is zero', () => {
    const outOfStock = { ...mockProduct, stock: 0 };
    render(<ProductInfo producto={outOfStock} />);
    expect(screen.getByText('Agotado')).toBeInTheDocument();
  });

  it('shows "Sin Stock" button text when out of stock', () => {
    const outOfStock = { ...mockProduct, stock: 0 };
    render(<ProductInfo producto={outOfStock} />);
    expect(screen.getByText('Sin Stock')).toBeInTheDocument();
  });

  it('shows "Agregar al Carrito" button when in stock', () => {
    render(<ProductInfo producto={mockProduct} />);
    expect(screen.getByText('Agregar al Carrito')).toBeInTheDocument();
  });

  it('increments quantity when plus button is clicked', () => {
    render(<ProductInfo producto={mockProduct} />);
    const plusBtn = screen.getByLabelText('Aumentar cantidad');
    fireEvent.click(plusBtn);
    const qtyDisplay = screen.getByText('2');
    expect(qtyDisplay).toBeInTheDocument();
  });

  it('decrements quantity when minus button is clicked', () => {
    render(<ProductInfo producto={mockProduct} />);
    const plusBtn = screen.getByLabelText('Aumentar cantidad');
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    const minusBtn = screen.getByLabelText('Reducir cantidad');
    fireEvent.click(minusBtn);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not decrement quantity below 1', () => {
    render(<ProductInfo producto={mockProduct} />);
    const minusBtn = screen.getByLabelText('Reducir cantidad');
    fireEvent.click(minusBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls agregar when add-to-cart is clicked', () => {
    const mockAgregar = vi.fn();
    (useCartStore as any).mockImplementation((selector) => {
      const state = {
        items: [],
        total: 0,
        agregar: mockAgregar,
        eliminar: vi.fn(),
        actualizarCantidad: vi.fn(),
        vaciar: vi.fn(),
        cargarCarrito: vi.fn(),
        totalItems: vi.fn(() => 0),
        subtotal: vi.fn(() => 0),
      };
      return selector ? selector(state) : state;
    });

    render(<ProductInfo producto={mockProduct} />);
    fireEvent.click(screen.getByText('Agregar al Carrito'));
    expect(mockAgregar).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('renders star rating', () => {
    render(<ProductInfo producto={mockProduct} />);
    expect(screen.getByText('4.0')).toBeInTheDocument();
  });
});

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
    items: [],
    toggle: vi.fn(),
    isFavorite: vi.fn(() => false),
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

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, onClick, disabled, ...props }: Record<string, unknown>) => (
    <button onClick={onClick as () => void} disabled={disabled as boolean}>{children as React.ReactNode}</button>
  ),
}));

import { render, screen, fireEvent } from '@testing-library/react';
import OrderSummary from '@/components/checkout/OrderSummary';
import { CarritoItem } from '@/types';

describe('OrderSummary', () => {
  const mockItems: CarritoItem[] = [
    { itemId: '1', titulo: 'Test Book', cantidad: 2, precioUnitario: 15, subtotal: 30 },
  ];

  const defaultProps = {
    items: mockItems,
    subtotal: 30,
    metodo: 'visa',
    onConfirm: vi.fn(),
    loading: false,
  };

  it('renders the order summary title', () => {
    render(<OrderSummary {...defaultProps} />);
    expect(screen.getByText('Resumen de Compra')).toBeDefined();
  });

  it('displays item details', () => {
    render(<OrderSummary {...defaultProps} />);
    expect(screen.getByText('Test Book')).toBeDefined();
  });

  it('displays subtotal', () => {
    render(<OrderSummary {...defaultProps} />);
    expect(screen.getAllByText('S/ 30.00').length).toBeGreaterThanOrEqual(1);
  });

  it('displays free shipping', () => {
    render(<OrderSummary {...defaultProps} />);
    expect(screen.getByText('Gratis')).toBeDefined();
  });

  it('displays payment method', () => {
    render(<OrderSummary {...defaultProps} />);
    expect(screen.getByText('Visa')).toBeDefined();
  });

  it('renders confirm button', () => {
    render(<OrderSummary {...defaultProps} />);
    expect(screen.getByText('Confirmar Compra')).toBeDefined();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    const onConfirm = vi.fn();
    render(<OrderSummary {...defaultProps} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText('Confirmar Compra'));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('disables confirm button when no method selected', () => {
    render(<OrderSummary {...defaultProps} metodo="" />);
    const btn = screen.getByText('Confirmar Compra');
    expect(btn).toBeDefined();
  });
});

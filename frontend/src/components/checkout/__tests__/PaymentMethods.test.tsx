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

vi.mock('@/utils/cn', () => ({
  cn: (...args: (string | undefined | false)[]) => args.filter(Boolean).join(' '),
}));

vi.mock('react-icons/hi', () => ({
  HiCreditCard: () => <svg data-testid="icon-credit-card" />,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import PaymentMethods from '@/components/checkout/PaymentMethods';

describe('PaymentMethods', () => {
  const defaultProps = {
    selected: '',
    onSelect: vi.fn(),
  };

  it('renders all payment methods', () => {
    render(<PaymentMethods {...defaultProps} />);
    expect(screen.getByText('Visa')).toBeDefined();
    expect(screen.getByText('Mastercard')).toBeDefined();
    expect(screen.getByText('Yape')).toBeDefined();
    expect(screen.getByText('Plin')).toBeDefined();
    expect(screen.getByText('Transferencia Bancaria')).toBeDefined();
    expect(screen.getByText('PayPal')).toBeDefined();
  });

  it('calls onSelect when a method is clicked', () => {
    const onSelect = vi.fn();
    render(<PaymentMethods {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Visa'));
    expect(onSelect).toHaveBeenCalledWith('visa');
  });

  it('calls onSelect with correct method id for mastercard', () => {
    const onSelect = vi.fn();
    render(<PaymentMethods {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Mastercard'));
    expect(onSelect).toHaveBeenCalledWith('mastercard');
  });

  it('calls onSelect with yape', () => {
    const onSelect = vi.fn();
    render(<PaymentMethods {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Yape'));
    expect(onSelect).toHaveBeenCalledWith('yape');
  });
});

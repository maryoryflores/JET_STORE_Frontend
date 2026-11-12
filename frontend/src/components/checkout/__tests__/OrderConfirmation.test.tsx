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

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

vi.mock('react-icons/hi', () => ({
  HiCheckCircle: () => <svg data-testid="icon-check" />,
  HiDownload: () => <svg data-testid="icon-download" />,
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: Record<string, unknown>) => <button>{children as React.ReactNode}</button>,
}));

vi.mock('@/components/ui/Badge', () => ({
  default: ({ children, ...props }: Record<string, unknown>) => <span>{children as React.ReactNode}</span>,
}));

import { render, screen } from '@testing-library/react';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';

describe('OrderConfirmation', () => {
  const defaultProps = {
    orderNumber: 'ORD-00123',
    date: '2025-01-15',
    paymentMethod: 'visa',
  };

  it('renders success message', () => {
    render(<OrderConfirmation {...defaultProps} />);
    expect(screen.getByText('¡Compra Realizada con Éxito!')).toBeDefined();
  });

  it('displays order number', () => {
    render(<OrderConfirmation {...defaultProps} />);
    expect(screen.getByText('ORD-00123')).toBeDefined();
  });

  it('displays date', () => {
    render(<OrderConfirmation {...defaultProps} />);
    expect(screen.getByText('2025-01-15')).toBeDefined();
  });

  it('displays payment method label for visa', () => {
    render(<OrderConfirmation {...defaultProps} />);
    expect(screen.getByText('Visa')).toBeDefined();
  });

  it('displays payment method label for mastercard', () => {
    render(<OrderConfirmation {...defaultProps} paymentMethod="mastercard" />);
    expect(screen.getByText('Mastercard')).toBeDefined();
  });

  it('shows completed badge', () => {
    render(<OrderConfirmation {...defaultProps} />);
    expect(screen.getByText('Completado')).toBeDefined();
  });

  it('renders download button', () => {
    render(<OrderConfirmation {...defaultProps} />);
    expect(screen.getByText('Descargar Comprobante')).toBeDefined();
  });

  it('renders navigation links', () => {
    render(<OrderConfirmation {...defaultProps} />);
    expect(screen.getByText('Ir a Mis Compras')).toBeDefined();
    expect(screen.getByText('Seguir Comprando')).toBeDefined();
  });
});

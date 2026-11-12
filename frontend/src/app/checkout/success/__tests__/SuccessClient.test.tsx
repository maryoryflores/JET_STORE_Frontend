import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'CLIENTE' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/store/cart-store', () => ({
  useCartStore: vi.fn(() => ({
    items: [],
    total: 0,
  })),
}));

vi.mock('@/store/favorites-store', () => ({
  useFavoritesStore: vi.fn(() => ({
    items: [],
    toggle: vi.fn(),
    isFavorite: vi.fn(() => false),
  })),
}));

vi.mock('@/components/checkout/OrderConfirmation', () => ({
  default: ({ orderNumber }: { orderNumber: string }) => (
    <div data-testid="order-confirmation">{orderNumber}</div>
  ),
}));

import SuccessClient from '@/app/checkout/success/SuccessClient';

describe('SuccessClient', () => {
  it('renders without crashing', () => {
    render(<SuccessClient />);
  });

  it('renders OrderConfirmation', () => {
    render(<SuccessClient />);
    expect(screen.getByTestId('order-confirmation')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<SuccessClient />);
    expect(screen.getByText('Ir a Mis Compras')).toBeInTheDocument();
    expect(screen.getByText('Seguir Comprando')).toBeInTheDocument();
  });

  it('generates an order number', () => {
    render(<SuccessClient />);
    const orderEl = screen.getByTestId('order-confirmation');
    expect(orderEl.textContent).toMatch(/^JET-\d+$/);
  });
});

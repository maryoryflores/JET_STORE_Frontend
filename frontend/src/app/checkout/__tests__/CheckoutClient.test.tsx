import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const mockSubtotal = vi.fn(() => 0);
const mockVaciar = vi.fn();

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'CLIENTE' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/store/cart-store', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('@/store/favorites-store', () => ({
  useFavoritesStore: vi.fn(() => ({
    items: [],
    toggle: vi.fn(),
    isFavorite: vi.fn(() => false),
  })),
}));

vi.mock('@/services/payment.service', () => ({
  paymentService: {
    processPayment: vi.fn().mockResolvedValue({ data: { ok: true, payload: { pagoId: 1 } } }),
    confirmPayment: vi.fn().mockResolvedValue({ data: { ok: true } }),
  },
}));

vi.mock('@/components/checkout/PaymentMethods', () => ({
  default: ({ onSelect }: { onSelect: (m: string) => void }) => (
    <div data-testid="payment-methods">
      <button onClick={() => onSelect('visa')}>Visa</button>
    </div>
  ),
}));

import { useCartStore } from '@/store/cart-store';
import CheckoutClient from '@/app/checkout/CheckoutClient';

describe('CheckoutClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCartStore).mockReturnValue({
      items: [{ itemId: 1, titulo: 'Libro Test', cantidad: 1, subtotal: 10 }],
      subtotal: mockSubtotal,
      vaciar: mockVaciar,
    } as ReturnType<typeof useCartStore>);
  });

  it('renders without crashing', () => {
    render(<CheckoutClient />);
    expect(screen.getAllByText('Checkout').length).toBeGreaterThan(0);
  });

  it('renders payment methods step', () => {
    render(<CheckoutClient />);
    expect(screen.getAllByText('Método de Pago').length).toBeGreaterThan(0);
    expect(screen.getByTestId('payment-methods')).toBeInTheDocument();
  });

  it('renders step indicators', () => {
    render(<CheckoutClient />);
    expect(screen.getByText('Confirmación')).toBeInTheDocument();
  });
});

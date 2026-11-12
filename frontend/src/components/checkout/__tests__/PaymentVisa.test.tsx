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
  formatCardNumber: (v: string) => v,
  formatExpiryDate: (v: string) => v,
  getCardType: () => 'visa',
}));

vi.mock('@/components/ui/Input', () => ({
  default: ({ label, placeholder, error }: Record<string, unknown>) => (
    <div>
      <label>{label as string}</label>
      <input placeholder={placeholder as string} />
      {error && <span>{error as string}</span>}
    </div>
  ),
}));

import { render, screen } from '@testing-library/react';
import PaymentVisa from '@/components/checkout/PaymentVisa';

describe('PaymentVisa', () => {
  const defaultProps = {
    formData: {
      nombreTitular: 'Jane Doe',
      numeroTarjeta: '4111 1111 1111 1111',
      fechaVen: '12/26',
      cvv: '456',
      telefono: '999111222',
      documento: '87654321',
    },
    onChange: vi.fn(),
    errors: {},
  };

  it('renders the visa payment form', () => {
    render(<PaymentVisa {...defaultProps} />);
    expect(screen.getByText('Visa')).toBeDefined();
  });

  it('renders all input fields', () => {
    render(<PaymentVisa {...defaultProps} />);
    expect(screen.getByText('Nombre del Titular')).toBeDefined();
    expect(screen.getByText('Número de Tarjeta')).toBeDefined();
    expect(screen.getByText('Fecha de Vencimiento')).toBeDefined();
    expect(screen.getByText('CVV')).toBeDefined();
    expect(screen.getByText('Teléfono')).toBeDefined();
    expect(screen.getByText('Documento')).toBeDefined();
  });

  it('renders card number placeholder', () => {
    render(<PaymentVisa {...defaultProps} />);
    expect(screen.getByPlaceholderText('1234 5678 9012 3456')).toBeDefined();
  });

  it('renders placeholder for expiry date', () => {
    render(<PaymentVisa {...defaultProps} />);
    expect(screen.getByPlaceholderText('MM/AA')).toBeDefined();
  });

  it('displays error messages when provided', () => {
    render(
      <PaymentVisa
        {...defaultProps}
        errors={{ cvv: 'CVV requerido' }}
      />
    );
    expect(screen.getByText('CVV requerido')).toBeDefined();
  });
});

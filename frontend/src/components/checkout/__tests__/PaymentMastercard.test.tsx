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
  getCardType: () => 'mastercard',
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
import PaymentMastercard from '@/components/checkout/PaymentMastercard';

describe('PaymentMastercard', () => {
  const defaultProps = {
    formData: {
      nombreTitular: 'John Doe',
      numeroTarjeta: '5412 7512 3412 3456',
      fechaVen: '12/25',
      cvv: '123',
      telefono: '999888777',
      documento: '12345678',
    },
    onChange: vi.fn(),
    errors: {},
  };

  it('renders the mastercard payment form', () => {
    render(<PaymentMastercard {...defaultProps} />);
    expect(screen.getByText('Mastercard')).toBeDefined();
  });

  it('renders all input fields', () => {
    render(<PaymentMastercard {...defaultProps} />);
    expect(screen.getByText('Nombre del Titular')).toBeDefined();
    expect(screen.getByText('Número de Tarjeta')).toBeDefined();
    expect(screen.getByText('Fecha de Vencimiento')).toBeDefined();
    expect(screen.getByText('CVV')).toBeDefined();
    expect(screen.getByText('Teléfono')).toBeDefined();
    expect(screen.getByText('Documento')).toBeDefined();
  });

  it('renders card number placeholder', () => {
    render(<PaymentMastercard {...defaultProps} />);
    expect(screen.getByPlaceholderText('1234 5678 9012 3456')).toBeDefined();
  });

  it('renders placeholder for expiry date', () => {
    render(<PaymentMastercard {...defaultProps} />);
    expect(screen.getByPlaceholderText('MM/AA')).toBeDefined();
  });

  it('displays error messages when provided', () => {
    render(
      <PaymentMastercard
        {...defaultProps}
        errors={{ nombreTitular: 'Nombre requerido' }}
      />
    );
    expect(screen.getByText('Nombre requerido')).toBeDefined();
  });
});

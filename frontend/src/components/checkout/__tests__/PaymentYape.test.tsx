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

vi.mock('react-icons/hi', () => ({
  HiPhotograph: () => <svg data-testid="icon-photograph" />,
}));

vi.mock('@/utils/cn', () => ({
  cn: (...args: (string | undefined | false)[]) => args.filter(Boolean).join(' '),
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
import PaymentYape from '@/components/checkout/PaymentYape';

describe('PaymentYape', () => {
  const defaultProps = {
    formData: {
      numeroOperacion: 'YAP-001',
      comprobante: null as File | null,
    },
    onChange: vi.fn(),
    errors: {},
  };

  it('renders the Yape payment form', () => {
    render(<PaymentYape {...defaultProps} />);
    expect(screen.getByText('Yape')).toBeDefined();
  });

  it('displays instruction text', () => {
    render(<PaymentYape {...defaultProps} />);
    expect(screen.getByText('Paga desde la app Yape')).toBeDefined();
  });

  it('renders QR code section', () => {
    render(<PaymentYape {...defaultProps} />);
    expect(screen.getByText('QR YAPE')).toBeDefined();
  });

  it('renders phone number and company name', () => {
    render(<PaymentYape {...defaultProps} />);
    expect(screen.getByText('+51 999 888 777')).toBeDefined();
    expect(screen.getByText('JetStore Digital EIRL')).toBeDefined();
  });

  it('renders operation number input', () => {
    render(<PaymentYape {...defaultProps} />);
    expect(screen.getByText('Número de Operación')).toBeDefined();
    expect(screen.getByPlaceholderText('Ingresa el número de operación Yape')).toBeDefined();
  });

  it('renders file upload area', () => {
    render(<PaymentYape {...defaultProps} />);
    expect(screen.getByText('Comprobante de Pago')).toBeDefined();
    expect(screen.getByText('Arrastra tu comprobante o haz clic para subirlo')).toBeDefined();
  });

  it('displays error messages when provided', () => {
    render(
      <PaymentYape
        {...defaultProps}
        errors={{ numeroOperacion: 'Número requerido' }}
      />
    );
    expect(screen.getByText('Número requerido')).toBeDefined();
  });
});

import { describe, it, expect, vi } from 'vitest';

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(),
    handleSubmit: vi.fn((fn) => (e?: React.FormEvent) => { e?.preventDefault(); fn({}); }),
    formState: { errors: {}, isSubmitting: false },
    setValue: vi.fn(),
    watch: vi.fn(() => ''),
    reset: vi.fn(),
  })),
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(() => vi.fn()),
}));

vi.mock('@/utils/validators', () => ({
  checkoutSchema: {},
  CheckoutFormData: {},
}));

vi.mock('@/components/ui/Button', () => ({
  default: (props: Record<string, unknown>) => <button>{props.children as React.ReactNode}</button>,
}));

vi.mock('@/components/ui/Input', () => ({
  default: (props: Record<string, unknown>) => (
    <input placeholder={props.placeholder as string} />
  ),
}));

vi.mock('@/components/ui/Select', () => ({
  default: (props: Record<string, unknown>) => (
    <div>
      <label>{props.label as string}</label>
      <select>{props.placeholder as React.ReactNode}</select>
    </div>
  ),
}));

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

import { render, screen } from '@testing-library/react';
import CheckoutForm from '@/components/checkout/CheckoutForm';

describe('CheckoutForm', () => {
  it('renders the checkout form with all sections', () => {
    const onSubmit = vi.fn();
    render(<CheckoutForm onSubmit={onSubmit} />);

    expect(screen.getByText('Información Personal')).toBeDefined();
    expect(screen.getByText('Documento de Identidad')).toBeDefined();
    expect(screen.getByText('Dirección de Envío')).toBeDefined();
    expect(screen.getByText('Continuar al Pago')).toBeDefined();
  });

  it('renders all input fields', () => {
    const onSubmit = vi.fn();
    render(<CheckoutForm onSubmit={onSubmit} />);

    expect(screen.getByPlaceholderText('Ingresa tus nombres')).toBeDefined();
    expect(screen.getByPlaceholderText('Ingresa tus apellidos')).toBeDefined();
    expect(screen.getByPlaceholderText('correo@ejemplo.com')).toBeDefined();
    expect(screen.getByPlaceholderText('999 888 777')).toBeDefined();
    expect(screen.getByPlaceholderText('12345678')).toBeDefined();
    expect(screen.getByPlaceholderText('Perú')).toBeDefined();
    expect(screen.getAllByPlaceholderText('Lima')).toHaveLength(2);
    expect(screen.getByPlaceholderText('15001')).toBeDefined();
    expect(screen.getByPlaceholderText('Av. Principal 123, Urb. Las Flores')).toBeDefined();
  });

  it('renders the document type select', () => {
    const onSubmit = vi.fn();
    render(<CheckoutForm onSubmit={onSubmit} />);

    expect(screen.getByText('Tipo de Documento')).toBeDefined();
    expect(screen.getByText('Seleccionar')).toBeDefined();
  });

  it('renders submit button', () => {
    const onSubmit = vi.fn();
    render(<CheckoutForm onSubmit={onSubmit} />);

    expect(screen.getByText('Continuar al Pago')).toBeDefined();
  });
});

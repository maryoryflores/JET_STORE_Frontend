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
  profileSchema: {},
  ProfileFormData: {},
}));

vi.mock('@/components/ui/Input', () => ({
  default: ({ label, id }: Record<string, unknown>) => (
    <div>
      <label htmlFor={id as string}>{label as string}</label>
      <input id={id as string} />
    </div>
  ),
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: Record<string, unknown>) => (
    <button type={props.type as string}>{children as React.ReactNode}</button>
  ),
}));

vi.mock('@/components/ui/Toast', () => ({
  default: ({ message, isVisible }: Record<string, unknown>) =>
    isVisible ? <div role="status">{message as string}</div> : null,
}));

import { render, screen } from '@testing-library/react';
import ProfileForm from '@/components/dashboard/ProfileForm';

describe('ProfileForm', () => {
  it('renders the profile form', () => {
    render(<ProfileForm />);
    expect(screen.getByText('Nombre de Usuario')).toBeDefined();
    expect(screen.getByText('Correo Electrónico')).toBeDefined();
  });

  it('renders save button', () => {
    render(<ProfileForm />);
    expect(screen.getByText('Guardar Cambios')).toBeDefined();
  });

  it('renders form inputs with correct ids', () => {
    render(<ProfileForm />);
    expect(screen.getByLabelText('Nombre de Usuario')).toBeDefined();
    expect(screen.getByLabelText('Correo Electrónico')).toBeDefined();
  });

  it('does not show toast initially', () => {
    render(<ProfileForm />);
    expect(screen.queryByRole('status')).toBeNull();
  });
});

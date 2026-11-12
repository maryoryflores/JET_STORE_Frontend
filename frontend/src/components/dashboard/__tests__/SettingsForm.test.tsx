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

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: Record<string, unknown>) => (
    <button>{children as React.ReactNode}</button>
  ),
}));

vi.mock('@/components/ui/Input', () => ({
  default: ({ label, type }: Record<string, unknown>) => (
    <div>
      <label>{label as string}</label>
      <input type={type as string} />
    </div>
  ),
}));

vi.mock('@/components/ui/Toast', () => ({
  default: ({ message, isVisible }: Record<string, unknown>) =>
    isVisible ? <div role="status">{message as string}</div> : null,
}));

import { render, screen } from '@testing-library/react';
import SettingsForm from '@/components/dashboard/SettingsForm';

describe('SettingsForm', () => {
  it('renders password change section', () => {
    render(<SettingsForm />);
    expect(screen.getByText('Cambiar Contraseña')).toBeDefined();
  });

  it('renders password inputs', () => {
    render(<SettingsForm />);
    expect(screen.getByText('Contraseña Actual')).toBeDefined();
    expect(screen.getByText('Nueva Contraseña')).toBeDefined();
    expect(screen.getByText('Confirmar Nueva Contraseña')).toBeDefined();
  });

  it('renders update password button', () => {
    render(<SettingsForm />);
    expect(screen.getByText('Actualizar Contraseña')).toBeDefined();
  });

  it('renders notification preferences section', () => {
    render(<SettingsForm />);
    expect(screen.getByText('Preferencias de Notificación')).toBeDefined();
  });

  it('renders notification toggles', () => {
    render(<SettingsForm />);
    expect(screen.getByText('Notificaciones por Email')).toBeDefined();
    expect(screen.getByText('Actualizaciones de Compras')).toBeDefined();
    expect(screen.getByText('Ofertas y Promociones')).toBeDefined();
  });

  it('renders save preferences button', () => {
    render(<SettingsForm />);
    expect(screen.getByText('Guardar Preferencias')).toBeDefined();
  });

  it('renders danger zone section', () => {
    render(<SettingsForm />);
    expect(screen.getByText('Zona de Peligro')).toBeDefined();
  });

  it('renders delete account button', () => {
    render(<SettingsForm />);
    expect(screen.getByText('Eliminar Cuenta')).toBeDefined();
  });

  it('does not show toast initially', () => {
    render(<SettingsForm />);
    expect(screen.queryByRole('status')).toBeNull();
  });
});

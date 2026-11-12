import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

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
    items: [],
    total: 0,
    agregar: vi.fn(),
    eliminar: vi.fn(),
    actualizarCantidad: vi.fn(),
    vaciar: vi.fn(),
    cargarCarrito: vi.fn(),
    totalItems: vi.fn(() => 0),
    subtotal: vi.fn(() => 0),
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
}));

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

import Loader from '@/components/ui/Loader';

describe('Loader', () => {
  it('renders the loading spinner', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('.border-t-\\[\\#DC2626\\]');
    expect(spinner).toBeInTheDocument();
  });

  it('renders a full-screen overlay', () => {
    const { container } = render(<Loader />);
    const overlay = container.querySelector('.fixed.inset-0');
    expect(overlay).toBeInTheDocument();
  });

  it('applies backdrop blur', () => {
    const { container } = render(<Loader />);
    const backdrop = container.querySelector('.backdrop-blur-sm');
    expect(backdrop).toBeInTheDocument();
  });

  it('renders the spinner with correct classes', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('.w-12.h-12.border-4');
    expect(spinner).toBeInTheDocument();
  });
});

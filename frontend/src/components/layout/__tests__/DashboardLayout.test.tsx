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
  usePathname: () => '/dashboard',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
    aside: ({ children, ...props }: Record<string, unknown>) => <aside>{children as React.ReactNode}</aside>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

vi.mock('react-icons/hi', () => ({
  HiUser: () => <svg data-testid="icon-user" />,
  HiShoppingBag: () => <svg data-testid="icon-bag" />,
  HiBookOpen: () => <svg data-testid="icon-book" />,
  HiHeart: () => <svg data-testid="icon-heart" />,
  HiCog: () => <svg data-testid="icon-cog" />,
  HiMenu: () => <svg data-testid="icon-menu" />,
  HiX: () => <svg data-testid="icon-x" />,
}));

import { render, screen } from '@testing-library/react';
import DashboardLayout from '@/components/layout/DashboardLayout';

describe('DashboardLayout', () => {
  it('renders children content', () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('renders title when provided', () => {
    render(
      <DashboardLayout title="Mi Dashboard">
        <div>Content</div>
      </DashboardLayout>
    );
    expect(screen.getByText('Mi Dashboard')).toBeDefined();
  });

  it('renders description when provided', () => {
    render(
      <DashboardLayout title="Dashboard" description="Descripción de prueba">
        <div>Content</div>
      </DashboardLayout>
    );
    expect(screen.getByText('Descripción de prueba')).toBeDefined();
  });

  it('renders sidebar navigation links', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );
    expect(screen.getByText('Perfil')).toBeDefined();
    expect(screen.getByText('Mis Compras')).toBeDefined();
    expect(screen.getByText('Biblioteca Digital')).toBeDefined();
    expect(screen.getByText('Favoritos')).toBeDefined();
    expect(screen.getByText('Configuración')).toBeDefined();
  });

  it('renders JetStore Digital brand', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );
    expect(screen.getByText('JetStore Digital')).toBeDefined();
  });

  it('renders mobile menu button', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );
    expect(screen.getByLabelText('Abrir menú')).toBeDefined();
  });
});

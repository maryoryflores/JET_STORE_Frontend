import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({ nombreUsuario: 'Carlos', correo: 'carlos@test.com', rol: 'CLIENTE' })),
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

import DashboardClient from '@/app/dashboard/DashboardClient';

describe('DashboardClient', () => {
  it('renders without crashing', () => {
    render(<DashboardClient />);
  });

  it('renders welcome message', () => {
    render(<DashboardClient />);
    expect(screen.getByText(/Bienvenido/)).toBeInTheDocument();
    expect(screen.getByText(/Carlos/)).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<DashboardClient />);
    expect(screen.getByText('Mis Compras')).toBeInTheDocument();
    expect(screen.getByText('Biblioteca Digital')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
    expect(screen.getByText('Configuración')).toBeInTheDocument();
  });
});

import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'CLIENTE' },
    token: 'tok',
    isAuthenticated: true,
  })),
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

vi.mock('@/components/dashboard/FavoritesList', () => ({
  default: () => <div data-testid="favorites-list">FavoritesList</div>,
}));

import FavoritosClient from '@/app/dashboard/favoritos/FavoritosClient';

describe('FavoritosClient', () => {
  it('renders without crashing', () => {
    render(<FavoritosClient />);
    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
  });
});

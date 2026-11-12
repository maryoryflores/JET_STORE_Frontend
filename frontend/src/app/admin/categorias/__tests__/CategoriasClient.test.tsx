import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'ADMIN' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/components/admin/CategoriesTable', () => ({
  default: () => <div data-testid="categories-table">CategoriesTable</div>,
}));

import CategoriasClient from '@/app/admin/categorias/CategoriasClient';

describe('CategoriasClient', () => {
  it('renders without crashing', () => {
    render(<CategoriasClient />);
    expect(screen.getByTestId('categories-table')).toBeInTheDocument();
  });
});

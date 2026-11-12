import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'ADMIN' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/components/admin/ProductsTable', () => ({
  default: () => <div data-testid="products-table">ProductsTable</div>,
}));

import ProductosClient from '@/app/admin/productos/ProductosClient';

describe('ProductosClient', () => {
  it('renders without crashing', () => {
    render(<ProductosClient />);
    expect(screen.getByTestId('products-table')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Admin', correo: 'admin@test.com', rol: 'ADMIN' },
    token: 'test-token',
    isAuthenticated: true,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    setUsuario: vi.fn(),
  })),
}));

import CategoriesTable from '@/components/admin/CategoriesTable';

describe('CategoriesTable', () => {
  it('renders the Agregar Categoría button', () => {
    render(<CategoriesTable />);
    expect(screen.getByText('Agregar Categoría')).toBeInTheDocument();
  });

  it('renders category data from static data', () => {
    render(<CategoriesTable />);
    expect(screen.getByText('Tecnología')).toBeInTheDocument();
    expect(screen.getByText('Negocios')).toBeInTheDocument();
    expect(screen.getByText('Salud')).toBeInTheDocument();
  });

  it('renders category descriptions', () => {
    render(<CategoriesTable />);
    expect(screen.getByText(/Libros de programación/)).toBeInTheDocument();
  });
});

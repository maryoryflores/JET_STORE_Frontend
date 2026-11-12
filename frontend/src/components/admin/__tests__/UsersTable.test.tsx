import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/services/admin.service', () => ({
  adminService: {
    getUsers: vi.fn(() =>
      Promise.resolve({
        data: {
          ok: true,
          mensaje: 'ok',
          payload: [
            { id: 1, nombreUsuario: 'Admin JetStore', correo: 'admin@jetstore.pe', rol: 'ADMIN' },
            { id: 2, nombreUsuario: 'María Fernanda López', correo: 'maria.lopez@email.com', rol: 'CLIENTE' },
          ],
        },
      })
    ),
  },
}));

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

import UsersTable from '@/components/admin/UsersTable';

describe('UsersTable', () => {
  it('renders search input', () => {
    render(<UsersTable />);
    expect(screen.getByPlaceholderText('Buscar usuarios...')).toBeInTheDocument();
  });

  it('renders user data from service', async () => {
    render(<UsersTable />);
    expect(await screen.findByText('Admin JetStore')).toBeInTheDocument();
    expect(screen.getByText('María Fernanda López')).toBeInTheDocument();
  });

  it('renders user emails', async () => {
    render(<UsersTable />);
    expect(await screen.findByText('admin@jetstore.pe')).toBeInTheDocument();
    expect(screen.getByText('maria.lopez@email.com')).toBeInTheDocument();
  });
});

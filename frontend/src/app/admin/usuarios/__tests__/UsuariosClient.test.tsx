import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'ADMIN' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/components/admin/UsersTable', () => ({
  default: () => <div data-testid="users-table">UsersTable</div>,
}));

import UsuariosClient from '@/app/admin/usuarios/UsuariosClient';

describe('UsuariosClient', () => {
  it('renders without crashing', () => {
    render(<UsuariosClient />);
    expect(screen.getByTestId('users-table')).toBeInTheDocument();
  });
});

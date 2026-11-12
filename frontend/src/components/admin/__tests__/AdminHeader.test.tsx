import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

import AdminHeader from '@/components/admin/AdminHeader';

describe('AdminHeader', () => {
  const defaultProps = {
    title: 'Dashboard',
    onToggleSidebar: vi.fn(),
  };

  it('renders the title', () => {
    render(<AdminHeader {...defaultProps} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders user initials', () => {
    render(<AdminHeader {...defaultProps} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('calls onToggleSidebar when menu button is clicked', async () => {
    const onToggleSidebar = vi.fn();
    render(<AdminHeader {...defaultProps} onToggleSidebar={onToggleSidebar} />);
    const menuButton = screen.getByLabelText('Abrir menú lateral');
    await userEvent.click(menuButton);
    expect(onToggleSidebar).toHaveBeenCalled();
  });

  it('shows dropdown with user info on avatar click', async () => {
    render(<AdminHeader {...defaultProps} />);
    const userButton = screen.getByLabelText('Menú de usuario');
    await userEvent.click(userButton);
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('admin@test.com')).toBeInTheDocument();
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
  });
});

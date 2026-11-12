import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'ADMIN' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/components/admin/PaymentsTable', () => ({
  default: () => <div data-testid="payments-table">PaymentsTable</div>,
}));

import PagosClient from '@/app/admin/pagos/PagosClient';

describe('PagosClient', () => {
  it('renders without crashing', () => {
    render(<PagosClient />);
    expect(screen.getByTestId('payments-table')).toBeInTheDocument();
  });
});

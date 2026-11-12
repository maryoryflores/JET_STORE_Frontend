import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'ADMIN' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/components/admin/OrdersTable', () => ({
  default: () => <div data-testid="orders-table">OrdersTable</div>,
}));

import PedidosClient from '@/app/admin/pedidos/PedidosClient';

describe('PedidosClient', () => {
  it('renders without crashing', () => {
    render(<PedidosClient />);
    expect(screen.getByTestId('orders-table')).toBeInTheDocument();
  });
});

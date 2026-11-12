import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'ADMIN' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/components/admin/LogsView', () => ({
  default: () => <div data-testid="logs-view">LogsView</div>,
}));

import LogsClient from '@/app/admin/logs/LogsClient';

describe('LogsClient', () => {
  it('renders without crashing', () => {
    render(<LogsClient />);
    expect(screen.getByTestId('logs-view')).toBeInTheDocument();
  });
});

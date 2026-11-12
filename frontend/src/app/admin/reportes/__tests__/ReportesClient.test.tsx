import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'ADMIN' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/components/admin/ReportsView', () => ({
  default: () => <div data-testid="reports-view">ReportsView</div>,
}));

import ReportesClient from '@/app/admin/reportes/ReportesClient';

describe('ReportesClient', () => {
  it('renders without crashing', () => {
    render(<ReportesClient />);
    expect(screen.getByTestId('reports-view')).toBeInTheDocument();
  });
});

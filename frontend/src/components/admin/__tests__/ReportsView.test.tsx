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

vi.mock('@/components/admin/Charts', () => ({
  SalesChart: () => <div data-testid="sales-chart">SalesChart</div>,
  TopProductsChart: () => <div data-testid="top-products-chart">TopProductsChart</div>,
}));

import ReportsView from '@/components/admin/ReportsView';

describe('ReportsView', () => {
  it('renders Descargar Reporte button', () => {
    render(<ReportsView />);
    expect(screen.getByText('Descargar Reporte')).toBeInTheDocument();
  });

  it('renders Clientes Frecuentes heading', () => {
    render(<ReportsView />);
    expect(screen.getByText('Clientes Frecuentes')).toBeInTheDocument();
  });

  it('renders chart components', () => {
    render(<ReportsView />);
    expect(screen.getByTestId('sales-chart')).toBeInTheDocument();
    expect(screen.getByTestId('top-products-chart')).toBeInTheDocument();
  });

  it('renders client report data', () => {
    render(<ReportsView />);
    expect(screen.getByText('María Fernanda López')).toBeInTheDocument();
    expect(screen.getByText('Carlos Andrés Pérez')).toBeInTheDocument();
    expect(screen.getByText('Laura Beatriz Sánchez')).toBeInTheDocument();
  });
});

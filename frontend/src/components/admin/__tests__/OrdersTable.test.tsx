import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrdersTable from '@/components/admin/OrdersTable';

describe('OrdersTable', () => {
  it('renders orders heading in search', () => {
    render(<OrdersTable />);
    expect(screen.getByPlaceholderText('Buscar pedidos...')).toBeInTheDocument();
  });

  it('renders order data', () => {
    render(<OrdersTable />);
    expect(screen.getByText('JET-2025-0001')).toBeInTheDocument();
    expect(screen.getAllByText('María Fernanda López').length).toBeGreaterThan(0);
  });

  it('filters orders by search', async () => {
    render(<OrdersTable />);
    const input = screen.getByPlaceholderText('Buscar pedidos...');
    await userEvent.type(input, 'Carlos');
    expect(screen.getByText('Carlos Andrés Pérez')).toBeInTheDocument();
    expect(screen.queryByText('María Fernanda López')).not.toBeInTheDocument();
  });
});

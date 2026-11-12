import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsCards from '@/components/admin/StatsCards';

describe('StatsCards', () => {
  it('renders stat labels', () => {
    render(<StatsCards />);
    expect(screen.getByText('Total Ventas')).toBeInTheDocument();
    expect(screen.getByText('Productos Vendidos')).toBeInTheDocument();
    expect(screen.getByText('Clientes Registrados')).toBeInTheDocument();
    expect(screen.getByText('Ingresos Totales')).toBeInTheDocument();
  });

  it('renders stat values', () => {
    render(<StatsCards />);
    expect(screen.getByText('1,284')).toBeInTheDocument();
    expect(screen.getByText('8,542')).toBeInTheDocument();
  });
});

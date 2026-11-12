import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Charts from '@/components/admin/Charts';

describe('Charts', () => {
  it('renders SalesChart heading', () => {
    render(<Charts />);
    expect(screen.getByText('Ventas por Mes')).toBeInTheDocument();
  });

  it('renders TopProductsChart heading', () => {
    render(<Charts />);
    expect(screen.getByText('Productos Más Vendidos')).toBeInTheDocument();
  });

  it('renders month labels', () => {
    render(<Charts />);
    expect(screen.getByText('Enero')).toBeInTheDocument();
    expect(screen.getByText('Junio')).toBeInTheDocument();
  });

  it('renders product names', () => {
    render(<Charts />);
    expect(screen.getByText('Programación Web Moderna')).toBeInTheDocument();
    expect(screen.getByText('Ciberseguridad')).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Stats from '@/components/home/Stats';

describe('Stats', () => {
  it('renders stat labels', () => {
    render(<Stats />);
    expect(screen.getByText('Libros Vendidos')).toBeInTheDocument();
    expect(screen.getByText('Clientes Satisfechos')).toBeInTheDocument();
    expect(screen.getByText('Títulos Disponibles')).toBeInTheDocument();
    expect(screen.getByText('Valoración Promedio')).toBeInTheDocument();
  });
});

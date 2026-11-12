import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '@/components/home/Hero';

describe('Hero', () => {
  it('renders heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Compra Libros Digitales/i)).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Hero />);
    expect(screen.getByText(/al instante/i)).toBeInTheDocument();
  });

  it('renders catalog link', () => {
    render(<Hero />);
    const link = screen.getByText(/Explorar/i).closest('a');
    expect(link).toHaveAttribute('href', '/catalogo');
  });

  it('renders offers link', () => {
    render(<Hero />);
    const link = screen.getByText(/Ofertas/i).closest('a');
    expect(link?.getAttribute('href')).toContain('oferta');
  });
});

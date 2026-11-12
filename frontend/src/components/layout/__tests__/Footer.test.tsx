import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders brand name', () => {
    render(<Footer />);
    expect(screen.getByText('JetStore Digital')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<Footer />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Catálogo')).toBeInTheDocument();
    expect(screen.getAllByText('Contacto').length).toBeGreaterThan(0);
  });

  it('renders category links', () => {
    render(<Footer />);
    expect(screen.getByText('Tecnología')).toBeInTheDocument();
    expect(screen.getByText('Salud')).toBeInTheDocument();
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/2026 JetStore/i)).toBeInTheDocument();
  });
});

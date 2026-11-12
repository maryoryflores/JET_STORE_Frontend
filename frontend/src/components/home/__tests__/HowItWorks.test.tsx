import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HowItWorks from '@/components/home/HowItWorks';

describe('HowItWorks', () => {
  it('renders section heading', () => {
    render(<HowItWorks />);
    expect(screen.getByText(/funciona/i)).toBeInTheDocument();
  });

  it('renders step titles', () => {
    render(<HowItWorks />);
    expect(screen.getByText(/Explora el cat/i)).toBeInTheDocument();
    expect(screen.getByText(/Selecciona y compra/i)).toBeInTheDocument();
    expect(screen.getByText(/Recibe al instante/i)).toBeInTheDocument();
    expect(screen.getByText(/Disfruta tu libro/i)).toBeInTheDocument();
  });
});

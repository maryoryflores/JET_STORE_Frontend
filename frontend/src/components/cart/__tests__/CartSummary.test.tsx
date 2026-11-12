import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartSummary from '@/components/cart/CartSummary';

describe('CartSummary', () => {
  it('renders subtotal', () => {
    render(<CartSummary subtotal={100} />);
    expect(screen.getByText(/Subtotal/)).toBeInTheDocument();
  });

  it('renders total', () => {
    render(<CartSummary subtotal={100} />);
    expect(screen.getByText(/Total/)).toBeInTheDocument();
  });

  it('renders checkout button', () => {
    render(<CartSummary subtotal={100} />);
    expect(screen.getByText(/Proceder al Pago/i)).toBeInTheDocument();
  });

  it('renders continue shopping link', () => {
    render(<CartSummary subtotal={100} />);
    expect(screen.getByText(/Continuar Comprando/i)).toBeInTheDocument();
  });
});

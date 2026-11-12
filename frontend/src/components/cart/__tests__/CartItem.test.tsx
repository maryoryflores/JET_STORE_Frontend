import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartItem from '@/components/cart/CartItem';
import { CarritoItem } from '@/types';

const mockItem: CarritoItem = {
  itemId: 1,
  libroId: 1,
  titulo: 'Test Book',
  autor: 'Author',
  precioUnitario: 25,
  cantidad: 2,
  subtotal: 50,
};

describe('CartItem', () => {
  it('renders item title', () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });

  it('renders author', () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText('Author')).toBeInTheDocument();
  });

  it('renders quantity', () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

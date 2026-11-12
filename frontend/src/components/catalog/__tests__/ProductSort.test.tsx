import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductSort from '@/components/catalog/ProductSort';

describe('ProductSort', () => {
  it('renders select with sort options', () => {
    render(<ProductSort value="relevancia" onChange={vi.fn()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Relevancia')).toBeInTheDocument();
    expect(screen.getByText(/menor a mayor/i)).toBeInTheDocument();
  });
});

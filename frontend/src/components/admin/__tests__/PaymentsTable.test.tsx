import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PaymentsTable from '@/components/admin/PaymentsTable';

describe('PaymentsTable', () => {
  it('renders payment data', () => {
    render(<PaymentsTable />);
    expect(screen.getByText('JET-2025-0001')).toBeInTheDocument();
    expect(screen.getByText('Visa')).toBeInTheDocument();
    expect(screen.getByText('Mastercard')).toBeInTheDocument();
    expect(screen.getByText('Yape')).toBeInTheDocument();
  });
});

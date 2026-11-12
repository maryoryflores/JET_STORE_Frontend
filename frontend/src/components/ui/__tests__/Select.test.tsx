import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Select from '@/components/ui/Select';

const options = [
  { value: 'pdf', label: 'PDF' },
  { value: 'fisico', label: 'Físico' },
];

describe('Select', () => {
  it('renders select element', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={options} />);
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText('Físico')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Select label="Formato" options={options} />);
    expect(screen.getByLabelText('Formato')).toBeInTheDocument();
  });

  it('renders placeholder option when provided', () => {
    render(<Select options={options} placeholder="Seleccionar..." />);
    expect(screen.getByText('Seleccionar...')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<Select options={options} error="Requerido" />);
    expect(screen.getByText('Requerido')).toBeInTheDocument();
  });

  it('applies error styling', () => {
    render(<Select options={options} error="Err" />);
    expect(screen.getByRole('combobox').className).toContain('border-red-500');
  });
});

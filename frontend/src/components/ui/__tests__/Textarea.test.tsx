import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Textarea from '@/components/ui/Textarea';

describe('Textarea', () => {
  it('renders textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Textarea label="Mensaje" />);
    expect(screen.getByLabelText('Mensaje')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Textarea error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('applies error styling', () => {
    render(<Textarea error="Err" />);
    expect(screen.getByRole('textbox').className).toContain('border-red-500');
  });
});

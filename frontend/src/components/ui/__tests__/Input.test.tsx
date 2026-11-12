import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@/components/ui/Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<Input error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('applies error styling when error is provided', () => {
    render(<Input error="Error" />);
    expect(screen.getByRole('textbox').className).toContain('border-red-500');
  });

  it('renders icon when provided', () => {
    render(<Input icon={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('adds pl-10 class when icon is present', () => {
    render(<Input icon={<span>🔍</span>} />);
    expect(screen.getByRole('textbox').className).toContain('pl-10');
  });

  it('passes value and onChange', async () => {
    const onChange = vi.fn();
    render(<Input value="test" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');
    await userEvent.clear(input);
    await userEvent.type(input, 'new');
    expect(onChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input className="custom-input" />);
    expect(screen.getByRole('textbox').className).toContain('custom-input');
  });
});

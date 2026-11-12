import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/ui/Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders primary variant by default', () => {
    render(<Button>Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[#DC2626]');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[#111111]');
  });

  it('renders outline variant', () => {
    render(<Button variant="outline">Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-[#DC2626]');
  });

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('text-gray-700');
  });

  it('shows loading spinner when loading', () => {
    render(<Button loading>Loading</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn.querySelector('svg')).toBeInTheDocument();
  });

  it('disables when disabled prop is true', () => {
    render(<Button disabled>Test</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders full width when fullWidth is true', () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByRole('button').className).toContain('w-full');
  });

  it('renders icon when provided', () => {
    render(<Button icon={<span data-testid="icon">★</span>}>With Icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render icon when loading', () => {
    render(<Button loading icon={<span data-testid="icon">★</span>}>With Icon</Button>);
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('uses custom type', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});

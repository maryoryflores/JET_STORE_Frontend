import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '@/components/ui/Spinner';

describe('Spinner', () => {
  it('renders svg spinner', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with default md size', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg?.className.baseVal).toContain('h-8');
  });

  it('renders with sm size', () => {
    const { container } = render(<Spinner size="sm" />);
    const svg = container.querySelector('svg');
    expect(svg?.className.baseVal).toContain('h-4');
  });

  it('renders with lg size', () => {
    const { container } = render(<Spinner size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg?.className.baseVal).toContain('h-12');
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="mt-4" />);
    expect(container.firstChild).toHaveClass('mt-4');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '@/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Content</p></Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies padding by default', () => {
    const { container } = render(<Card><p>Test</p></Card>);
    expect(container.firstChild).toHaveClass('p-6');
  });

  it('removes padding when padding=false', () => {
    const { container } = render(<Card padding={false}><p>Test</p></Card>);
    expect(container.firstChild).not.toHaveClass('p-6');
  });

  it('applies hover effect when hover=true', () => {
    const { container } = render(<Card hover><p>Test</p></Card>);
    expect(container.firstChild).toHaveClass('hover:shadow-lg');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom">Test</Card>);
    expect(container.firstChild).toHaveClass('custom');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Alert from '@/components/ui/Alert';

describe('Alert', () => {
  it('renders message', () => {
    render(<Alert type="success" message="All good!" />);
    expect(screen.getByText('All good!')).toBeInTheDocument();
  });

  it('renders success type', () => {
    const { container } = render(<Alert type="success" message="OK" />);
    expect(container.querySelector('[class*="bg-green-50"]')).toBeInTheDocument();
  });

  it('renders error type', () => {
    const { container } = render(<Alert type="error" message="Oops" />);
    expect(container.querySelector('[class*="bg-red-50"]')).toBeInTheDocument();
  });

  it('renders warning type', () => {
    const { container } = render(<Alert type="warning" message="Careful" />);
    expect(container.querySelector('[class*="bg-yellow-50"]')).toBeInTheDocument();
  });

  it('renders info type', () => {
    const { container } = render(<Alert type="info" message="FYI" />);
    expect(container.querySelector('[class*="bg-blue-50"]')).toBeInTheDocument();
  });

  it('hides when isVisible is false', () => {
    const { container } = render(<Alert type="success" message="Hidden" isVisible={false} />);
    expect(container.textContent).toBe('');
  });

  it('renders close button when onClose is provided', () => {
    render(<Alert type="success" message="Closeable" onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /cerrar/i })).toBeInTheDocument();
  });
});

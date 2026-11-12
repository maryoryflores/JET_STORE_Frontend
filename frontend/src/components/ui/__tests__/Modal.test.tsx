import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '@/components/ui/Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <p>Modal content here</p>,
  };

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders title when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal content here')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByLabelText('Cerrar')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    await userEvent.click(screen.getByLabelText('Cerrar'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal content here')).not.toBeInTheDocument();
  });

  it('renders without crashing when title is undefined', () => {
    render(<Modal isOpen={true} onClose={vi.fn()}><div>Content</div></Modal>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders fixed overlay container when open', () => {
    const { container } = render(<Modal {...defaultProps} />);
    const fixed = container.querySelector('.fixed.inset-0');
    expect(fixed).toBeInTheDocument();
  });

  it('sets body overflow to hidden when open', () => {
    render(<Modal {...defaultProps} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('resets body overflow when closed', () => {
    const { rerender } = render(<Modal {...defaultProps} />);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<Modal {...defaultProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('resets body overflow on unmount', () => {
    const { unmount } = render(<Modal {...defaultProps} />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('renders with sm size', () => {
    const { container } = render(<Modal {...defaultProps} size="sm" />);
    const modal = container.querySelector('[class*="max-w-md"]');
    expect(modal).toBeInTheDocument();
  });

  it('renders with lg size', () => {
    const { container } = render(<Modal {...defaultProps} size="lg" />);
    const modal = container.querySelector('[class*="max-w-2xl"]');
    expect(modal).toBeInTheDocument();
  });

  it('renders with xl size', () => {
    const { container } = render(<Modal {...defaultProps} size="xl" />);
    const modal = container.querySelector('[class*="max-w-4xl"]');
    expect(modal).toBeInTheDocument();
  });

  it('does not render title header when title is not provided', () => {
    render(<Modal isOpen={true} onClose={vi.fn()}><div>Content</div></Modal>);
    expect(screen.queryByLabelText('Cerrar')).not.toBeInTheDocument();
  });

  it('does not close when clicking modal content', async () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    await userEvent.click(screen.getByText('Modal content here'));
    expect(onClose).not.toHaveBeenCalled();
  });
});

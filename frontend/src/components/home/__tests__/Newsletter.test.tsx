import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Newsletter from '@/components/home/Newsletter';

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

import Swal from 'sweetalert2';

describe('Newsletter', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading', () => {
    render(<Newsletter />);
    expect(screen.getByText(/newsletter/i)).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(<Newsletter />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Newsletter />);
    expect(screen.getByRole('button', { name: /suscribir/i })).toBeInTheDocument();
  });

  it('shows error alert when submitting empty email', async () => {
    render(<Newsletter />);
    fireEvent.submit(screen.getByRole('button', { name: /suscribir/i }));
    await screen.findByText(/suscribir/i);
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'error' }),
    );
  });

  it('shows error alert for invalid email format', async () => {
    render(<Newsletter />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'notanemail' } });
    fireEvent.submit(screen.getByRole('button', { name: /suscribir/i }));
    await screen.findByText(/suscribir/i);
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'error' }),
    );
  });

  it('submits valid email and shows loading then success', async () => {
    vi.useFakeTimers();
    render(<Newsletter />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /suscribir/i }));
    });

    expect(screen.getByText('Enviando...')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'success' }),
    );
    vi.useRealTimers();
  });

  it('clears email input after successful submission', async () => {
    vi.useFakeTimers();
    render(<Newsletter />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /suscribir/i }));
    });

    expect(screen.getByText('Enviando...')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'success' }),
    );
    vi.useRealTimers();
  });

  it('disables submit button while loading', async () => {
    vi.useFakeTimers();
    render(<Newsletter />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test@example.com' } });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /suscribir/i }));
    });

    expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled();

    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    vi.useRealTimers();
  });

  it('re-enables submit button after submission completes', async () => {
    vi.useFakeTimers();
    render(<Newsletter />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test@example.com' } });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /suscribir/i }));
    });

    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    expect(screen.getByRole('button', { name: /suscribir/i })).not.toBeDisabled();
    vi.useRealTimers();
  });
});

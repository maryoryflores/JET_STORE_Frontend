import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/components/catalog/SearchBar';

describe('SearchBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders input', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<SearchBar value="" onChange={vi.fn()} placeholder="Find books..." />);
    expect(screen.getByPlaceholderText('Find books...')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<SearchBar value="react" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('react')).toBeInTheDocument();
  });

  it('calls onChange after debounce when typing', async () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'react' } });
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(onChange).toHaveBeenCalledWith('react');
  });

  it('shows clear button when there is local value', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(screen.getByLabelText('Limpiar búsqueda')).toBeInTheDocument();
  });

  it('does not show clear button when input is empty', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.queryByLabelText('Limpiar búsqueda')).not.toBeInTheDocument();
  });

  it('clears input and calls onChange when clear button clicked', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    fireEvent.click(screen.getByLabelText('Limpiar búsqueda'));
    expect(input.value).toBe('');
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('debounces rapid typing correctly', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'r' } });
    vi.advanceTimersByTime(100);
    fireEvent.change(input, { target: { value: 're' } });
    vi.advanceTimersByTime(100);
    fireEvent.change(input, { target: { value: 'rea' } });
    vi.advanceTimersByTime(100);
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('rea');
  });

  it('clears debounce timeout on unmount', () => {
    const onChange = vi.fn();
    const { unmount } = render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    unmount();
    vi.advanceTimersByTime(300);
    expect(onChange).not.toHaveBeenCalled();
  });
});

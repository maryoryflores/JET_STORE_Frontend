import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '@/components/ui/Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders default variant', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByText('Test');
    expect(badge.className).toContain('bg-gray-100');
  });

  it('renders success variant', () => {
    render(<Badge variant="success">OK</Badge>);
    expect(screen.getByText('OK').className).toContain('bg-green-100');
  });

  it('renders warning variant', () => {
    render(<Badge variant="warning">Warn</Badge>);
    expect(screen.getByText('Warn').className).toContain('bg-yellow-100');
  });

  it('renders danger variant', () => {
    render(<Badge variant="danger">Err</Badge>);
    expect(screen.getByText('Err').className).toContain('bg-red-100');
  });

  it('renders info variant', () => {
    render(<Badge variant="info">Info</Badge>);
    expect(screen.getByText('Info').className).toContain('bg-blue-100');
  });

  it('renders md size', () => {
    render(<Badge size="md">Big</Badge>);
    expect(screen.getByText('Big').className).toContain('px-3');
  });
});

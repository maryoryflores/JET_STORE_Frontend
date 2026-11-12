import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '@/components/ui/Breadcrumb';

describe('Breadcrumb', () => {
  it('renders home icon', () => {
    render(<Breadcrumb items={[]} />);
    expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', '/');
  });

  it('renders item labels', () => {
    render(<Breadcrumb items={[{ label: 'Catálogo' }]} />);
    expect(screen.getByText('Catálogo')).toBeInTheDocument();
  });

  it('renders links when href is provided', () => {
    render(<Breadcrumb items={[{ label: 'Inicio', href: '/home' }]} />);
    expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/home');
  });

  it('renders bold text for current page (no href)', () => {
    render(<Breadcrumb items={[{ label: 'Actual' }]} />);
    const el = screen.getByText('Actual');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('font-medium');
  });
});

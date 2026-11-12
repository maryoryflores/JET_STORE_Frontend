import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '@/components/layout/Sidebar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt as string} src={props.src as string} />;
  },
}));
vi.mock('next/link', () => ({
  default: ({ children, href, onClick, ...rest }: React.PropsWithChildren<{ href: string; onClick?: () => void } & Record<string, unknown>>) => (
    <a href={href} onClick={onClick} {...rest}>{children}</a>
  ),
}));

describe('Sidebar', () => {
  it('renders nav items', () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Pedidos')).toBeInTheDocument();
    expect(screen.getByText('Pagos')).toBeInTheDocument();
    expect(screen.getByText('Reportes')).toBeInTheDocument();
    expect(screen.getByText('Configuración')).toBeInTheDocument();
    expect(screen.getByText('Logs')).toBeInTheDocument();
  });

  it('collapses when isOpen is false', () => {
    const { container } = render(<Sidebar isOpen={false} />);
    const aside = container.querySelector('aside');
    expect(aside?.className).toContain('w-20');
  });

  it('expands when isOpen is true', () => {
    const { container } = render(<Sidebar isOpen={true} />);
    const aside = container.querySelector('aside');
    expect(aside?.className).toContain('w-64');
  });

  it('shows close button on mobile when onClose is provided', () => {
    render(<Sidebar isOpen={true} onClose={vi.fn()} />);
    const closeButtons = screen.getAllByLabelText('Cerrar menú');
    expect(closeButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Sidebar isOpen={true} onClose={onClose} />);
    const closeButtons = screen.getAllByLabelText('Cerrar menú');
    fireEvent.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not show close button when onClose is not provided', () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.queryByLabelText('Cerrar menú')).not.toBeInTheDocument();
  });

  it('renders JetStore brand text', () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText('JetStore')).toBeInTheDocument();
  });

  it('renders version text', () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText('JetStore Admin v1.0')).toBeInTheDocument();
  });

  it('highlights active nav item based on pathname', () => {
    render(<Sidebar isOpen={true} />);
    const activeLink = screen.getByText('Dashboard').closest('a');
    expect(activeLink?.className).toContain('bg-red-600/20');
  });

  it('has correct hrefs for nav items', () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/admin');
    expect(screen.getByText('Productos').closest('a')).toHaveAttribute('href', '/admin/productos');
    expect(screen.getByText('Logs').closest('a')).toHaveAttribute('href', '/admin/logs');
  });

  it('does not show mobile overlay when isOpen is false', () => {
    const { container } = render(<Sidebar isOpen={false} />);
    const overlays = container.querySelectorAll('[class*="fixed inset-0"]');
    expect(overlays.length).toBe(0);
  });

  it('shows mobile overlay when isOpen and onClose provided', () => {
    const { container } = render(<Sidebar isOpen={true} onClose={vi.fn()} />);
    const overlays = container.querySelectorAll('[class*="fixed inset-0"]');
    expect(overlays.length).toBeGreaterThan(0);
  });
});

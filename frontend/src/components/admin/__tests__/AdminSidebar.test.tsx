import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  );
  MockLink.displayName = 'Link';
  return { default: MockLink };
});

import AdminSidebar from '@/components/admin/AdminSidebar';

describe('AdminSidebar', () => {
  it('renders JetStore branding', () => {
    render(<AdminSidebar />);
    expect(screen.getByText('JetStore')).toBeInTheDocument();
  });

  it('renders Admin label', () => {
    render(<AdminSidebar />);
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<AdminSidebar />);
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

  it('highlights active route', () => {
    render(<AdminSidebar />);
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveAttribute('href', '/admin');
  });

  it('hides labels when collapsed', () => {
    render(<AdminSidebar collapsed />);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.getByText('J')).toBeInTheDocument();
  });
});

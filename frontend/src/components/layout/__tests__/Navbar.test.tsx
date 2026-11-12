import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(),
}));
vi.mock('@/store/cart-store', () => ({
  useCartStore: vi.fn(),
}));
vi.mock('@/store/favorites-store', () => ({
  useFavoritesStore: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt as string} src={props.src as string} />;
  },
}));
vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: React.PropsWithChildren<{ href: string } & Record<string, unknown>>) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

import { useAuthStore } from '@/store/auth-store';
import { useCartStore } from '@/store/cart-store';
import Navbar from '@/components/layout/Navbar';

const mockUseAuthStore = vi.mocked(useAuthStore);
const mockUseCartStore = vi.mocked(useCartStore);

function setupAuthenticated(overrides: Record<string, unknown> = {}) {
  mockUseAuthStore.mockReturnValue({
    usuario: { id: 1, nombreUsuario: 'Admin', correo: 'admin@test.com', rol: 'ADMIN' },
    token: 'tok',
    isAuthenticated: true,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    setUsuario: vi.fn(),
    ...overrides,
  } as ReturnType<typeof useAuthStore>);

  mockUseCartStore.mockReturnValue({
    items: [],
    total: 0,
    agregar: vi.fn(),
    eliminar: vi.fn(),
    actualizarCantidad: vi.fn(),
    vaciar: vi.fn(),
    cargarCarrito: vi.fn(),
    totalItems: vi.fn(() => 0),
    subtotal: vi.fn(() => 0),
  } as ReturnType<typeof useCartStore>);
}

function setupUnauthenticated() {
  mockUseAuthStore.mockReturnValue({
    usuario: null,
    token: null,
    isAuthenticated: false,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    setUsuario: vi.fn(),
  } as ReturnType<typeof useAuthStore>);

  mockUseCartStore.mockReturnValue({
    items: [],
    total: 0,
    agregar: vi.fn(),
    eliminar: vi.fn(),
    actualizarCantidad: vi.fn(),
    vaciar: vi.fn(),
    cargarCarrito: vi.fn(),
    totalItems: vi.fn(() => 0),
    subtotal: vi.fn(() => 0),
  } as ReturnType<typeof useCartStore>);
}

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders brand name', () => {
    setupUnauthenticated();
    render(<Navbar />);
    expect(screen.getByText('JetStore Digital')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    setupUnauthenticated();
    render(<Navbar />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/catalogo');
    expect(hrefs).toContain('/contacto');
  });

  it('shows login link when not authenticated', () => {
    setupUnauthenticated();
    render(<Navbar />);
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
  });

  it('shows user name and dropdown button when authenticated', () => {
    setupAuthenticated();
    render(<Navbar />);
    const admins = screen.getAllByText('Admin');
    expect(admins.length).toBeGreaterThanOrEqual(1);
  });

  it('opens and closes dropdown on user button click', async () => {
    setupAuthenticated();
    render(<Navbar />);
    const userBtn = screen.getByLabelText('Menú de usuario');
    await userEvent.click(userBtn);
    expect(screen.getByText('Panel Admin')).toBeInTheDocument();

    await userEvent.click(userBtn);
    expect(screen.queryByText('Panel Admin')).not.toBeInTheDocument();
  });

  it('shows logout button in dropdown', async () => {
    const logout = vi.fn();
    setupAuthenticated({ logout });
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Menú de usuario'));
    const logoutBtn = screen.getByText('Cerrar Sesión');
    await userEvent.click(logoutBtn);
    expect(logout).toHaveBeenCalled();
  });

  it('shows admin link for ADMIN role', async () => {
    setupAuthenticated();
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Menú de usuario'));
    expect(screen.getByText('Panel Admin')).toHaveAttribute('href', '/admin');
  });

  it('shows dashboard links for non-ADMIN role', async () => {
    setupAuthenticated({ usuario: { id: 2, nombreUsuario: 'User', correo: 'user@test.com', rol: 'USER' } });
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Menú de usuario'));
    expect(screen.getByText('Mi Cuenta')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText('Mis Compras')).toHaveAttribute('href', '/dashboard/compras');
  });

  it('shows cart and favorites links when authenticated', () => {
    setupAuthenticated();
    render(<Navbar />);
    const nav = screen.getByText('JetStore Digital').closest('nav')!;
    expect(nav.querySelector('a[href="/carrito"]')).toBeTruthy();
    expect(nav.querySelector('a[href="/dashboard/favoritos"]')).toBeTruthy();
  });

  it('displays user email in dropdown', async () => {
    setupAuthenticated();
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Menú de usuario'));
    expect(screen.getByText('admin@test.com')).toBeInTheDocument();
  });

  it('displays fallback text when email is missing', async () => {
    setupAuthenticated({ usuario: { id: 1, nombreUsuario: 'Admin', correo: '', rol: 'ADMIN' } });
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Menú de usuario'));
    expect(screen.getByText('Sesión activa')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    setupAuthenticated();
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Menú de usuario'));
    expect(screen.getByText('Panel Admin')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Panel Admin')).not.toBeInTheDocument();
  });

  it('shows cart badge when items exist', () => {
    mockUseAuthStore.mockReturnValue({
      usuario: { id: 1, nombreUsuario: 'Admin', correo: 'admin@test.com', rol: 'ADMIN' },
      token: 'tok',
      isAuthenticated: true,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      setUsuario: vi.fn(),
    } as ReturnType<typeof useAuthStore>);

    mockUseCartStore.mockReturnValue({
      items: [{ cantidad: 3 } as never],
      total: 0,
      agregar: vi.fn(),
      eliminar: vi.fn(),
      actualizarCantidad: vi.fn(),
      vaciar: vi.fn(),
      cargarCarrito: vi.fn(),
      totalItems: vi.fn(() => 3),
      subtotal: vi.fn(() => 0),
    } as ReturnType<typeof useCartStore>);

    render(<Navbar />);
    const badges = screen.getAllByText('3');
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('toggles mobile menu open and closed', async () => {
    setupAuthenticated();
    render(<Navbar />);
    const menuBtn = screen.getByLabelText('Abrir menú');
    await userEvent.click(menuBtn);
    expect(screen.getByLabelText('Cerrar menú')).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('Cerrar menú'));
    expect(screen.getByLabelText('Abrir menú')).toBeInTheDocument();
  });

  it('shows nav links in mobile menu', async () => {
    setupAuthenticated();
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Abrir menú'));
    const mobileLinks = screen.getAllByRole('link');
    const hrefs = mobileLinks.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/catalogo');
    expect(hrefs).toContain('/contacto');
  });

  it('shows user info and logout in mobile menu', async () => {
    const logout = vi.fn();
    setupAuthenticated({ logout });
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Abrir menú'));
    const admins = screen.getAllByText('Admin');
    expect(admins.length).toBeGreaterThanOrEqual(1);
    const mobileLogout = screen.getAllByText('Cerrar Sesión');
    expect(mobileLogout.length).toBeGreaterThanOrEqual(1);
  });

  it('calls logout from mobile menu', async () => {
    const logout = vi.fn();
    setupAuthenticated({ logout });
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Abrir menú'));
    const mobileLogout = screen.getAllByText('Cerrar Sesión')[0];
    await userEvent.click(mobileLogout);
    expect(logout).toHaveBeenCalled();
  });

  it('shows admin link in mobile menu for ADMIN', async () => {
    setupAuthenticated();
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Abrir menú'));
    const adminLinks = screen.getAllByText('Panel Admin');
    expect(adminLinks.some((el) => el.getAttribute('href') === '/admin')).toBe(true);
  });

  it('shows dashboard links in mobile menu for non-ADMIN', async () => {
    setupAuthenticated({ usuario: { id: 2, nombreUsuario: 'User', correo: 'u@t.com', rol: 'USER' } });
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Abrir menú'));
    expect(screen.getByText('Mi Cuenta')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText('Mis Compras')).toHaveAttribute('href', '/dashboard/compras');
  });

  it('shows login link in mobile menu when not authenticated', async () => {
    setupUnauthenticated();
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Abrir menú'));
    const loginLinks = screen.getAllByText('Iniciar Sesión');
    expect(loginLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('shows mobile cart link when authenticated', async () => {
    setupAuthenticated();
    render(<Navbar />);
    await userEvent.click(screen.getByLabelText('Abrir menú'));
    const cartLinks = screen.getAllByRole('link');
    const hrefs = cartLinks.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/carrito');
  });
});

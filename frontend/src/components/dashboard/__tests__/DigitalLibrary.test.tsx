import { describe, it, expect, vi } from 'vitest';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'CLIENTE' },
    token: 'tok',
    isAuthenticated: true,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    setUsuario: vi.fn(),
  })),
}));

vi.mock('@/store/cart-store', () => ({
  useCartStore: vi.fn(() => ({
    items: [{ id: 1, libroId: 1, titulo: 'Test Book', autor: 'Author', precio: 29.99, cantidad: 1, subtotal: 29.99, formato: 'PDF', imagen: '' }],
    total: 29.99,
    agregar: vi.fn(),
    eliminar: vi.fn(),
    actualizarCantidad: vi.fn(),
    vaciar: vi.fn(),
    cargarCarrito: vi.fn(),
    totalItems: vi.fn(() => 1),
    subtotal: vi.fn(() => 29.99),
  })),
}));

vi.mock('@/store/favorites-store', () => ({
  useFavoritesStore: vi.fn(() => ({
    items: [],
    toggle: vi.fn(),
    isFavorite: vi.fn(() => false),
  })),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

vi.mock('@/data/productos', () => ({
  productos: [
    { id: 1, titulo: 'Libro Test 1', autor: 'Autor 1', categoria: 'Ficción', precio: 29.99, formato: 'PDF', imagen: '', stock: 10, fechaPublicacion: '2024-01-01' },
    { id: 2, titulo: 'Libro Test 2', autor: 'Autor 2', categoria: 'No Ficción', precio: 19.99, formato: 'EPUB', imagen: '', stock: 5, fechaPublicacion: '2024-02-01' },
  ],
}));

vi.mock('@/data/compras', () => ({
  compras: [
    {
      id: 1,
      usuarioId: 1,
      fecha: '2024-01-15',
      estado: 'completado',
      total: 29.99,
      productos: [{ productoId: 1, titulo: 'Libro Test 1', precio: 29.99, cantidad: 1 }],
    },
  ],
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: Record<string, unknown>) => (
    <button>{children as React.ReactNode}</button>
  ),
}));

vi.mock('@/components/ui/Input', () => ({
  default: ({ placeholder, value, onChange }: Record<string, unknown>) => (
    <input
      placeholder={placeholder as string}
      value={value as string}
      onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
    />
  ),
}));

vi.mock('react-icons/hi', () => ({
  HiSearch: () => <svg data-testid="icon-search" />,
  HiDownload: () => <svg data-testid="icon-download" />,
  HiBookOpen: () => <svg data-testid="icon-book" />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

import { render, screen } from '@testing-library/react';
import DigitalLibrary from '@/components/dashboard/DigitalLibrary';

describe('DigitalLibrary', () => {
  it('renders purchased products', () => {
    render(<DigitalLibrary />);
    expect(screen.getByText('Libro Test 1')).toBeDefined();
  });

  it('renders the search input', () => {
    render(<DigitalLibrary />);
    expect(screen.getByPlaceholderText('Buscar en tu biblioteca...')).toBeDefined();
  });

  it('renders download button for each product', () => {
    render(<DigitalLibrary />);
    expect(screen.getByText('Descargar PDF')).toBeDefined();
  });

  it('renders product author', () => {
    render(<DigitalLibrary />);
    expect(screen.getByText('Autor 1')).toBeDefined();
  });
});

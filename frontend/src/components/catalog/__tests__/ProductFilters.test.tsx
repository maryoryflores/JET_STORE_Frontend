import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

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
    items: [],
    total: 0,
    agregar: vi.fn(),
    eliminar: vi.fn(),
    actualizarCantidad: vi.fn(),
    vaciar: vi.fn(),
    cargarCarrito: vi.fn(),
    totalItems: vi.fn(() => 0),
    subtotal: vi.fn(() => 0),
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
}));

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>,
}));

import ProductFilters from '@/components/catalog/ProductFilters';

const mockCategories = [
  { id: 1, nombre: 'Ficcion', slug: 'ficcion', descripcion: '', icono: '', imagen: '', productCount: 5 },
  { id: 2, nombre: 'Ciencia', slug: 'ciencia', descripcion: '', icono: '', imagen: '', productCount: 3 },
];

const defaultProps = {
  selectedCategories: [],
  onCategoryChange: vi.fn(),
  minPrice: '',
  maxPrice: '',
  onMinPriceChange: vi.fn(),
  onMaxPriceChange: vi.fn(),
  onClear: vi.fn(),
  categories: mockCategories,
};

describe('ProductFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders category names', () => {
    render(<ProductFilters {...defaultProps} />);
    expect(screen.getByText('Ficcion')).toBeInTheDocument();
    expect(screen.getByText('Ciencia')).toBeInTheDocument();
  });

  it('displays product count for each category', () => {
    render(<ProductFilters {...defaultProps} />);
    expect(screen.getByText('(5)')).toBeInTheDocument();
    expect(screen.getByText('(3)')).toBeInTheDocument();
  });

  it('calls onCategoryChange when a category checkbox is clicked', () => {
    render(<ProductFilters {...defaultProps} />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(defaultProps.onCategoryChange).toHaveBeenCalledWith('Ficcion');
  });

  it('renders min and max price inputs', () => {
    render(<ProductFilters {...defaultProps} />);
    expect(screen.getByPlaceholderText('Mín')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Máx')).toBeInTheDocument();
  });

  it('calls onMinPriceChange when min price input changes', () => {
    render(<ProductFilters {...defaultProps} />);
    const input = screen.getByPlaceholderText('Mín');
    fireEvent.change(input, { target: { value: '10' } });
    expect(defaultProps.onMinPriceChange).toHaveBeenCalledWith('10');
  });

  it('calls onMaxPriceChange when max price input changes', () => {
    render(<ProductFilters {...defaultProps} />);
    const input = screen.getByPlaceholderText('Máx');
    fireEvent.change(input, { target: { value: '100' } });
    expect(defaultProps.onMaxPriceChange).toHaveBeenCalledWith('100');
  });

  it('shows clear button when filters are active', () => {
    render(<ProductFilters {...defaultProps} selectedCategories={['Ficcion']} />);
    expect(screen.getByText('Limpiar Filtros')).toBeInTheDocument();
  });

  it('hides clear button when no filters are active', () => {
    render(<ProductFilters {...defaultProps} />);
    expect(screen.queryByText('Limpiar Filtros')).not.toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    render(<ProductFilters {...defaultProps} selectedCategories={['Ficcion']} />);
    fireEvent.click(screen.getByText('Limpiar Filtros'));
    expect(defaultProps.onClear).toHaveBeenCalled();
  });

  it('renders the filters heading', () => {
    render(<ProductFilters {...defaultProps} />);
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Precio')).toBeInTheDocument();
  });
});

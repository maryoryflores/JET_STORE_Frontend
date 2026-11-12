import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';

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

import Toast from '@/components/ui/Toast';

describe('Toast', () => {
  const defaultProps = {
    message: 'Operation completed',
    isVisible: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the message when visible', () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    render(<Toast {...defaultProps} isVisible={false} />);
    expect(screen.queryByText('Operation completed')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Toast {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Cerrar'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('auto-closes after the specified duration', () => {
    render(<Toast {...defaultProps} duration={3000} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders success type with correct styling', () => {
    const { container } = render(<Toast {...defaultProps} type="success" />);
    const toastDiv = container.querySelector('.bg-green-600');
    expect(toastDiv).toBeInTheDocument();
  });

  it('renders error type with correct styling', () => {
    const { container } = render(<Toast {...defaultProps} type="error" />);
    const toastDiv = container.querySelector('.bg-red-600');
    expect(toastDiv).toBeInTheDocument();
  });

  it('does not auto-close when duration is 0', () => {
    render(<Toast {...defaultProps} duration={0} />);
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('renders the default success type', () => {
    const { container } = render(<Toast {...defaultProps} />);
    const toastDiv = container.querySelector('.bg-green-600');
    expect(toastDiv).toBeInTheDocument();
  });
});

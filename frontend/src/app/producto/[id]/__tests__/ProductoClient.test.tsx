import { describe, it, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'CLIENTE' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/store/cart-store', () => ({
  useCartStore: vi.fn(() => ({
    items: [],
    total: 0,
  })),
}));

vi.mock('@/store/favorites-store', () => ({
  useFavoritesStore: vi.fn(() => ({
    items: [],
    toggle: vi.fn(),
    isFavorite: vi.fn(() => false),
  })),
}));

vi.mock('@/services/product.service', () => ({
  productService: {
    getById: vi.fn().mockResolvedValue({ data: { ok: false } }),
  },
}));

vi.mock('@/data/productos', () => ({
  productos: [
    {
      id: 1,
      titulo: 'Libro Test',
      autor: 'Autor Test',
      categoria: 'Ficción',
      precio: 50,
      formato: 'PDF',
      imagen: '',
      stock: 10,
      fechaPublicacion: '2024-01-01',
    },
  ],
}));

vi.mock('@/components/product/ProductGallery', () => ({
  default: () => <div data-testid="product-gallery" />,
}));

vi.mock('@/components/product/ProductInfo', () => ({
  default: () => <div data-testid="product-info" />,
}));

vi.mock('@/components/product/RelatedProducts', () => ({
  default: () => <div data-testid="related-products" />,
}));

vi.mock('@/components/ui/Spinner', () => ({
  default: () => <div data-testid="spinner" />,
}));

import ProductoClient from '@/app/producto/[id]/ProductoClient';

describe('ProductoClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <ProductoClient params={Promise.resolve({ id: '1' })} />
    );
    expect(container).toBeDefined();
  });
});

import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

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

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...props}>{children}</button>,
}));

vi.mock('@/components/ui/Input', () => ({
  default: (props: Record<string, unknown>) => <input aria-label={props.label as string} placeholder={props.placeholder as string} />,
}));

vi.mock('@/components/ui/Textarea', () => ({
  default: (props: Record<string, unknown>) => <textarea aria-label={props.label as string} placeholder={props.placeholder as string} />,
}));

vi.mock('@/components/ui/Toast', () => ({
  default: () => null,
}));

import ContactoClient from '@/app/contacto/ContactoClient';

describe('ContactoClient', () => {
  it('renders without crashing', () => {
    render(<ContactoClient />);
  });

  it('renders heading', () => {
    render(<ContactoClient />);
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
  });

  it('renders contact form', () => {
    render(<ContactoClient />);
    expect(screen.getByText('Envíanos un mensaje')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<ContactoClient />);
    expect(screen.getByText('Información de Contacto')).toBeInTheDocument();
    expect(screen.getByText('contacto@jetstore.pe')).toBeInTheDocument();
    expect(screen.getByText('+51 926 849 164')).toBeInTheDocument();
  });
});

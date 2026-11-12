import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'ADMIN' },
    token: 'tok',
    isAuthenticated: true,
  })),
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...props}>{children}</button>,
}));

vi.mock('@/components/ui/Input', () => ({
  default: (props: Record<string, unknown>) => <input aria-label={props.label as string} value={props.value as string} onChange={props.onChange as React.ChangeEventHandler} />,
}));

import AdminConfigClient from '@/app/admin/configuracion/AdminConfigClient';

describe('AdminConfigClient', () => {
  it('renders without crashing', () => {
    render(<AdminConfigClient />);
    expect(screen.getByText('Configuración del Sitio')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(<AdminConfigClient />);
    expect(screen.getByText('Información General')).toBeInTheDocument();
    expect(screen.getByText('Configuración de Email (SMTP)')).toBeInTheDocument();
  });

  it('renders save button', () => {
    render(<AdminConfigClient />);
    expect(screen.getByText('Guardar Configuración')).toBeInTheDocument();
  });
});

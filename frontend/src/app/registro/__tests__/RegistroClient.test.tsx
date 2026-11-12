import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(() => ({})),
    handleSubmit: vi.fn((fn: (data: unknown) => void) => (e?: React.FormEvent) => { e?.preventDefault(); fn({}); }),
    formState: { errors: {}, isSubmitting: false },
    setValue: vi.fn(),
    watch: vi.fn(() => ''),
    reset: vi.fn(),
  })),
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(() => vi.fn()),
}));

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Test', correo: 'test@test.com', rol: 'CLIENTE' },
    token: 'tok',
    isAuthenticated: true,
    register: vi.fn().mockResolvedValue({ success: true }),
  })),
}));

vi.mock('@/utils/validators', () => ({
  registerSchema: {},
  RegisterFormData: {},
}));

vi.mock('@/components/ui/Input', () => ({
  default: (props: Record<string, unknown>) => <input aria-label={props.label as string} placeholder={props.placeholder as string} />,
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...props}>{children}</button>,
}));

vi.mock('@/components/ui/Toast', () => ({
  default: () => null,
}));

import RegistroClient from '@/app/registro/RegistroClient';

describe('RegistroClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<RegistroClient />);
  });

  it('renders register form', () => {
    render(<RegistroClient />);
    expect(screen.getAllByText('Crear Cuenta').length).toBeGreaterThan(0);
    expect(screen.getByText('Regístrate en JetStore')).toBeInTheDocument();
  });

  it('renders form inputs', () => {
    render(<RegistroClient />);
    expect(screen.getByLabelText('Nombre de Usuario')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar Contraseña')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<RegistroClient />);
    expect(screen.getByRole('button', { name: 'Crear Cuenta' })).toBeInTheDocument();
  });

  it('renders login link', () => {
    render(<RegistroClient />);
    expect(screen.getByText('Inicia Sesión')).toBeInTheDocument();
  });
});

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
    login: vi.fn().mockResolvedValue({ success: true }),
  })),
}));

vi.mock('@/utils/validators', () => ({
  loginSchema: {},
  LoginFormData: {},
}));

vi.mock('@/components/ui/Input', () => ({
  default: (props: Record<string, unknown>) => <input aria-label={props.label as string} placeholder={props.placeholder as string} />,
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...props}>{children}</button>,
}));

vi.mock('@/components/ui/Alert', () => ({
  default: ({ message }: { message: string }) => <div role="alert">{message}</div>,
}));

import LoginClient from '@/app/login/LoginClient';

describe('LoginClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<LoginClient />);
  });

  it('renders login form', () => {
    render(<LoginClient />);
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('Accede a tu cuenta JetStore')).toBeInTheDocument();
  });

  it('renders form inputs', () => {
    render(<LoginClient />);
    expect(screen.getByLabelText('Nombre de Usuario')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<LoginClient />);
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
  });

  it('renders guest login button', () => {
    render(<LoginClient />);
    expect(screen.getByText('Entrar como Invitado')).toBeInTheDocument();
  });

  it('renders register link', () => {
    render(<LoginClient />);
    expect(screen.getByText('Regístrate')).toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    render(<LoginClient />);
    expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();
  });
});

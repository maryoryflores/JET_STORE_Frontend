import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(() => ({})),
    handleSubmit: vi.fn((fn: (data: unknown) => void) => (e?: React.FormEvent) => {
      e?.preventDefault();
      fn({ correo: 'juan@correo.com' });
    }),
    formState: { errors: {}, isSubmitting: false },
    setValue: vi.fn(),
    watch: vi.fn(() => ''),
    reset: vi.fn(),
  })),
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(() => vi.fn()),
}));

vi.mock('@/utils/validators', () => ({
  forgotPasswordSchema: {},
  ForgotPasswordFormData: {},
}));

vi.mock('@/services/auth.service', () => ({
  authService: {
    solicitarRecuperacion: vi.fn().mockResolvedValue({ data: { ok: true } }),
  },
}));

vi.mock('@/components/ui/Input', () => ({
  default: (props: Record<string, unknown>) => (
    <input aria-label={props.label as string} placeholder={props.placeholder as string} />
  ),
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock('@/components/ui/Alert', () => ({
  default: ({ message }: { message: string }) => <div role="alert">{message}</div>,
}));

import OlvidastePasswordClient from '@/app/recuperar-contrasena/OlvidastePasswordClient';

describe('OlvidastePasswordClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<OlvidastePasswordClient />);
  });

  it('renders the recovery form', () => {
    render(<OlvidastePasswordClient />);
    expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();
    expect(screen.getByText('Te enviaremos un enlace para que puedas restablecerla')).toBeInTheDocument();
  });

  it('renders email input and submit button', () => {
    render(<OlvidastePasswordClient />);
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByText('Enviar enlace de recuperación')).toBeInTheDocument();
  });

  it('shows the generic success message after submitting', async () => {
    const user = userEvent.setup();
    render(<OlvidastePasswordClient />);
    await user.click(screen.getByText('Enviar enlace de recuperación'));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/recibirás instrucciones para recuperar tu contraseña/);
    expect(screen.getByText('Volver a Iniciar Sesión')).toBeInTheDocument();
  });

  it('renders the back to login link', () => {
    render(<OlvidastePasswordClient />);
    expect(screen.getByText('Volver a Iniciar Sesión')).toBeInTheDocument();
  });
});
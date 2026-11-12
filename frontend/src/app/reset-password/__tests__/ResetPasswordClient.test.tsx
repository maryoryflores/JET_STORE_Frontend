import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(() => ({})),
    handleSubmit: vi.fn((fn: (data: unknown) => void) => (e?: React.FormEvent) => {
      e?.preventDefault();
      fn({ password: 'nueva123', confirmPassword: 'nueva123' });
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

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => ({ get: vi.fn(() => 'token-123') })),
}));

vi.mock('@/services/auth.service', () => ({
  authService: {
    restablecerPassword: vi.fn().mockResolvedValue({ data: { ok: true } }),
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

import { useSearchParams } from 'next/navigation';
import ResetPasswordClient from '@/app/reset-password/ResetPasswordClient';

describe('ResetPasswordClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ResetPasswordClient />);
  });

  it('renders the reset form with password fields', () => {
    render(<ResetPasswordClient />);
    expect(screen.getByText('Restablecer Contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText('Nueva contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar nueva contraseña')).toBeInTheDocument();
    expect(screen.getByText('Restablecer contraseña')).toBeInTheDocument();
  });

  it('shows success message and login link after resetting', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordClient />);
    await user.click(screen.getByText('Restablecer contraseña'));

    const message = await screen.findByText(
      'Tu contraseña ha sido actualizada correctamente.'
    );
    expect(message).toBeInTheDocument();
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
  });

  it('shows invalid link message when token is missing', () => {
    vi.mocked(useSearchParams).mockReturnValue({ get: () => null });
    render(<ResetPasswordClient />);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'El enlace de recuperación no es válido.'
    );
  });
});
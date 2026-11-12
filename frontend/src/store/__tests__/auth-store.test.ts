import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '@/store/auth-store';

vi.mock('@/services/auth.service', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    getProfile: vi.fn(),
    listUsers: vi.fn(),
  },
}));

import { authService } from '@/services/auth.service';

describe('useAuthStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ usuario: null, token: null, isAuthenticated: false });
  });

  it('starts with no auth state', () => {
    const state = useAuthStore.getState();
    expect(state.usuario).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('login success sets user and token', async () => {
    vi.mocked(authService.login).mockResolvedValue({
      data: {
        ok: true,
        mensaje: 'ok',
        payload: { token: 'abc123', usuarioId: 1, nombreUsuario: 'daniel', rol: 'ADMIN' },
      },
    } as never);

    const result = await useAuthStore.getState().login('daniel', 'secret123');
    expect(result.success).toBe(true);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().token).toBe('abc123');
    expect(useAuthStore.getState().usuario?.nombreUsuario).toBe('daniel');
  });

  it('login failure returns error', async () => {
    vi.mocked(authService.login).mockResolvedValue({
      data: { ok: false, mensaje: 'Credenciales incorrectas', payload: null },
    } as never);

    const result = await useAuthStore.getState().login('daniel', 'wrong');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Credenciales incorrectas');
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('login with server error returns error message', async () => {
    vi.mocked(authService.login).mockRejectedValue({
      response: { data: { mensaje: 'Servidor caído' } },
    });

    const result = await useAuthStore.getState().login('daniel', 'secret');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Servidor caído');
  });

  it('login with network error returns default message', async () => {
    vi.mocked(authService.login).mockRejectedValue(new Error('Network'));

    const result = await useAuthStore.getState().login('daniel', 'secret');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Error al conectar con el servidor');
  });

  it('register success returns success', async () => {
    vi.mocked(authService.register).mockResolvedValue({
      data: { ok: true, mensaje: 'Registrado', payload: { id: 1, nombreUsuario: 'lorena', correo: 'l@l.com', rol: 'CLIENTE' } },
    } as never);

    const result = await useAuthStore.getState().register({
      nombreUsuario: 'lorena',
      correo: 'l@l.com',
      password: 'secret123',
    });
    expect(result.success).toBe(true);
  });

  it('register failure returns error', async () => {
    vi.mocked(authService.register).mockResolvedValue({
      data: { ok: false, mensaje: 'Usuario ya existe', payload: null },
    } as never);

    const result = await useAuthStore.getState().register({
      nombreUsuario: 'lorena',
      correo: 'l@l.com',
      password: 'secret123',
    });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Usuario ya existe');
  });

  it('register with server error returns error message', async () => {
    vi.mocked(authService.register).mockRejectedValue({
      response: { data: { mensaje: 'Error de red' } },
    });

    const result = await useAuthStore.getState().register({
      nombreUsuario: 'lorena',
      correo: 'l@l.com',
      password: 'secret123',
    });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Error de red');
  });

  it('logout clears auth state', async () => {
    useAuthStore.setState({ usuario: { id: 1, nombreUsuario: 'd', correo: 'd@d.com', rol: 'CLIENTE' }, token: 'abc', isAuthenticated: true });
    vi.mocked(authService.logout).mockResolvedValue({ data: { ok: true, mensaje: 'ok', payload: null } } as never);

    await useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().usuario).toBeNull();
  });

  it('logout handles API error gracefully', async () => {
    useAuthStore.setState({ token: 'abc', isAuthenticated: true });
    vi.mocked(authService.logout).mockRejectedValue(new Error('fail'));

    await useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('logout without token does not call API', async () => {
    useAuthStore.setState({ token: null });
    await useAuthStore.getState().logout();
    expect(authService.logout).not.toHaveBeenCalled();
  });

  it('setUsuario updates user', () => {
    const user = { id: 5, nombreUsuario: 'test', correo: 't@t.com', rol: 'CLIENTE' as const };
    useAuthStore.getState().setUsuario(user);
    expect(useAuthStore.getState().usuario).toEqual(user);
  });
});

import { describe, it, expect, vi } from 'vitest';

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

import { authService } from '@/services/auth.service';
import api from '@/services/api';

describe('authService', () => {
  it('login calls api.post with credentials', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await authService.login('daniel', 'secret');
    expect(api.post).toHaveBeenCalledWith('/usuario/login', { nombreUsuario: 'daniel', password: 'secret' });
  });

  it('register calls api.post with data', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await authService.register({ nombreUsuario: 'l', correo: 'l@l.com', password: 's', rol: 'CLIENTE' });
    expect(api.post).toHaveBeenCalledWith('/usuario/registrar', { nombreUsuario: 'l', correo: 'l@l.com', password: 's', rol: 'CLIENTE' });
  });

  it('getProfile calls api.get', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true } } as never);
    await authService.getProfile(1);
    expect(api.get).toHaveBeenCalledWith('/usuario/perfil/1');
  });

  it('logout calls api.post with token header', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { ok: true } } as never);
    await authService.logout('mytoken');
    expect(api.post).toHaveBeenCalledWith('/usuario/cerrar-sesion', null, {
      headers: { Authorization: 'Bearer mytoken' },
    });
  });

  it('listUsers calls api.get', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true, payload: [] } } as never);
    await authService.listUsers();
    expect(api.get).toHaveBeenCalledWith('/usuario/todos');
  });
});

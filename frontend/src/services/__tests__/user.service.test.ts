import { describe, it, expect, vi } from 'vitest';

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

import { userService } from '@/services/user.service';
import api from '@/services/api';

describe('userService', () => {
  it('getProfile calls api.get', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true } } as never);
    await userService.getProfile(1);
    expect(api.get).toHaveBeenCalledWith('/usuario/perfil/1');
  });

  it('listUsers calls api.get', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { ok: true, payload: [] } } as never);
    await userService.listUsers();
    expect(api.get).toHaveBeenCalledWith('/usuario/todos');
  });
});

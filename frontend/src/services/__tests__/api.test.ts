import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from '@/store/auth-store';

vi.mock('@/store/auth-store', () => ({
  useAuthStore: {
    getState: vi.fn(),
  },
}));

import api from '@/services/api';

describe('api axios instance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('has correct baseURL', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:8080');
  });

  it('has correct timeout', () => {
    expect(api.defaults.timeout).toBe(15000);
  });

  it('has JSON content type header', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('request interceptor adds Bearer token when available', () => {
    vi.mocked(useAuthStore.getState).mockReturnValue({ token: 'mytoken' } as never);
    const config = { headers: {} as Record<string, string> };
    const interceptor = api.interceptors.request.handlers?.[0];
    if (interceptor?.fulfilled) {
      const result = interceptor.fulfilled(config);
      expect(result.headers.Authorization).toBe('Bearer mytoken');
    }
  });

  it('request interceptor does not add token when no token', () => {
    vi.mocked(useAuthStore.getState).mockReturnValue({ token: null } as never);
    const config = { headers: {} as Record<string, string> };
    const interceptor = api.interceptors.request.handlers?.[0];
    if (interceptor?.fulfilled) {
      const result = interceptor.fulfilled(config);
      expect(result.headers.Authorization).toBeUndefined();
    }
  });

  it('response interceptor passes through successful responses', () => {
    const response = { data: { ok: true } };
    const interceptor = api.interceptors.response.handlers?.[0];
    if (interceptor?.fulfilled) {
      const result = interceptor.fulfilled(response);
      expect(result).toEqual(response);
    }
  });

  it('response interceptor rejects non-401 errors', async () => {
    const error = { response: { status: 500 } };
    const interceptor = api.interceptors.response.handlers?.[0];
    if (interceptor?.rejected) {
      await expect(interceptor.rejected(error)).rejects.toEqual(error);
    }
  });
});

import { describe, it, expect } from 'vitest';
import { usuarios } from '@/data/usuarios';

describe('usuarios data', () => {
  it('exports an array of users', () => {
    expect(Array.isArray(usuarios)).toBe(true);
    expect(usuarios.length).toBe(3);
  });

  it('each user has required fields', () => {
    for (const u of usuarios) {
      expect(u.id).toBeDefined();
      expect(u.nombres).toBeDefined();
      expect(u.apellidos).toBeDefined();
      expect(u.email).toBeDefined();
      expect(u.rol).toBeDefined();
    }
  });

  it('includes an admin user', () => {
    expect(usuarios.some((u) => u.rol === 'admin')).toBe(true);
  });

  it('includes client users', () => {
    expect(usuarios.some((u) => u.rol === 'cliente')).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { stats, beneficios } from '@/data/stats';

describe('stats data', () => {
  it('exports stats array', () => {
    expect(Array.isArray(stats)).toBe(true);
    expect(stats.length).toBe(4);
  });

  it('each stat has required fields', () => {
    for (const s of stats) {
      expect(s.id).toBeDefined();
      expect(s.valor).toBeDefined();
      expect(s.label).toBeDefined();
      expect(s.icono).toBeDefined();
    }
  });
});

describe('beneficios data', () => {
  it('exports beneficios array', () => {
    expect(Array.isArray(beneficios)).toBe(true);
    expect(beneficios.length).toBe(6);
  });

  it('each beneficio has required fields', () => {
    for (const b of beneficios) {
      expect(b.id).toBeDefined();
      expect(b.titulo).toBeDefined();
      expect(b.descripcion).toBeDefined();
      expect(b.icono).toBeDefined();
    }
  });
});

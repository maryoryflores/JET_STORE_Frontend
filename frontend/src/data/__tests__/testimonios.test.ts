import { describe, it, expect } from 'vitest';
import { testimonios } from '@/data/testimonios';

describe('testimonios data', () => {
  it('exports testimonios array', () => {
    expect(Array.isArray(testimonios)).toBe(true);
    expect(testimonios.length).toBe(5);
  });

  it('each testimonio has required fields', () => {
    for (const t of testimonios) {
      expect(t.id).toBeDefined();
      expect(t.nombre).toBeDefined();
      expect(t.cargo).toBeDefined();
      expect(t.texto).toBeDefined();
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    }
  });
});

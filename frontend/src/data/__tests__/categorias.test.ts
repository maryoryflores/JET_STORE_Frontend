import { describe, it, expect } from 'vitest';
import { categorias } from '@/data/categorias';

describe('categorias data', () => {
  it('exports an array of categories', () => {
    expect(Array.isArray(categorias)).toBe(true);
    expect(categorias.length).toBe(6);
  });

  it('each category has required fields', () => {
    for (const c of categorias) {
      expect(c.id).toBeDefined();
      expect(c.nombre).toBeDefined();
      expect(c.slug).toBeDefined();
      expect(c.descripcion).toBeDefined();
      expect(c.icono).toBeDefined();
      expect(c.imagen).toBeDefined();
      expect(c.productCount).toBeGreaterThanOrEqual(0);
    }
  });

  it('has unique ids', () => {
    const ids = categorias.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('includes Tecnologia category', () => {
    expect(categorias.some((c) => c.nombre === 'Tecnología')).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { productos } from '@/data/productos';

describe('productos data', () => {
  it('exports an array of products', () => {
    expect(Array.isArray(productos)).toBe(true);
    expect(productos.length).toBeGreaterThan(0);
  });

  it('each product has required fields', () => {
    for (const p of productos) {
      expect(p.id).toBeDefined();
      expect(p.titulo).toBeDefined();
      expect(p.autor).toBeDefined();
      expect(p.precio).toBeGreaterThanOrEqual(0);
      expect(p.formato).toBeDefined();
      expect(p.stock).toBeGreaterThanOrEqual(0);
      expect(p.categoria).toBeDefined();
    }
  });

  it('has unique ids', () => {
    const ids = productos.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has 15 products', () => {
    expect(productos.length).toBe(15);
  });

  it('products have discount field when on offer', () => {
    const onSale = productos.filter((p) => p.oferta);
    for (const p of onSale) {
      expect(p.descuento).toBeDefined();
      expect(p.precioOriginal).toBeDefined();
    }
  });
});

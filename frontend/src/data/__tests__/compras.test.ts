import { describe, it, expect } from 'vitest';
import { compras } from '@/data/compras';

describe('compras data', () => {
  it('exports an array of purchases', () => {
    expect(Array.isArray(compras)).toBe(true);
    expect(compras.length).toBe(3);
  });

  it('each compra has required fields', () => {
    for (const c of compras) {
      expect(c.id).toBeDefined();
      expect(c.numeroPedido).toBeDefined();
      expect(c.fecha).toBeDefined();
      expect(c.estado).toBeDefined();
      expect(c.total).toBeGreaterThan(0);
      expect(c.metodoPago).toBeDefined();
      expect(Array.isArray(c.productos)).toBe(true);
      expect(c.direccionEnvio).toBeDefined();
    }
  });

  it('all compras are completed', () => {
    for (const c of compras) {
      expect(c.estado).toBe('completado');
    }
  });

  it('each compra has at least one product', () => {
    for (const c of compras) {
      expect(c.productos.length).toBeGreaterThanOrEqual(1);
    }
  });
});

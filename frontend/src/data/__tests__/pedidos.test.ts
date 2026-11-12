import { describe, it, expect } from 'vitest';
import { pedidos, pagos, reportesVentas, reportesProductos, reportesClientes } from '@/data/pedidos';

describe('pedidos data', () => {
  it('exports pedidos array', () => {
    expect(Array.isArray(pedidos)).toBe(true);
    expect(pedidos.length).toBe(3);
  });

  it('each pedido has required fields', () => {
    for (const p of pedidos) {
      expect(p.id).toBeDefined();
      expect(p.numeroPedido).toBeDefined();
      expect(p.cliente).toBeDefined();
      expect(p.total).toBeGreaterThan(0);
      expect(p.metodoPago).toBeDefined();
    }
  });
});

describe('pagos data', () => {
  it('exports pagos array', () => {
    expect(Array.isArray(pagos)).toBe(true);
    expect(pagos.length).toBe(3);
  });

  it('each pago has required fields', () => {
    for (const p of pagos) {
      expect(p.id).toBeDefined();
      expect(p.pedidoId).toBeDefined();
      expect(p.metodo).toBeDefined();
      expect(p.monto).toBeGreaterThan(0);
      expect(p.estado).toBeDefined();
    }
  });
});

describe('reportesVentas data', () => {
  it('exports sales reports', () => {
    expect(Array.isArray(reportesVentas)).toBe(true);
    expect(reportesVentas.length).toBe(6);
  });

  it('each report has required fields', () => {
    for (const r of reportesVentas) {
      expect(r.mes).toBeDefined();
      expect(r.ventas).toBeGreaterThan(0);
      expect(r.ingresos).toBeGreaterThan(0);
    }
  });
});

describe('reportesProductos data', () => {
  it('exports product reports', () => {
    expect(Array.isArray(reportesProductos)).toBe(true);
    expect(reportesProductos.length).toBe(5);
  });

  it('each report has required fields', () => {
    for (const r of reportesProductos) {
      expect(r.producto).toBeDefined();
      expect(r.cantidad).toBeGreaterThan(0);
      expect(r.ingresos).toBeGreaterThan(0);
    }
  });
});

describe('reportesClientes data', () => {
  it('exports client reports', () => {
    expect(Array.isArray(reportesClientes)).toBe(true);
    expect(reportesClientes.length).toBe(3);
  });

  it('each report has required fields', () => {
    for (const r of reportesClientes) {
      expect(r.cliente).toBeDefined();
      expect(r.email).toBeDefined();
      expect(r.compras).toBeGreaterThan(0);
      expect(r.totalGastado).toBeGreaterThan(0);
    }
  });
});

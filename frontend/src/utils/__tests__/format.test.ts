import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCardNumber,
  formatExpiryDate,
  getCardType,
  truncateText,
  getInitials,
  calculateDiscount,
} from '@/utils/format';

// Autor: Lucinda (Frontend) — 9 pruebas sobre utilidades de formato.

describe('formatCurrency', () => {
  it('formatea un monto como soles peruanos (PEN)', () => {
    expect(formatCurrency(25.5)).toBe('S/ 25.50');
  });
});

describe('formatCardNumber', () => {
  it('agrupa los dígitos en bloques de 4', () => {
    expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
  });
});

describe('formatExpiryDate', () => {
  it('inserta una barra después de los dos primeros dígitos', () => {
    expect(formatExpiryDate('1228')).toBe('12/28');
  });
});

describe('getCardType', () => {
  it('identifica tarjetas Visa (inician en 4)', () => {
    expect(getCardType('4111111111111111')).toBe('visa');
  });

  it('identifica tarjetas Mastercard (51-55)', () => {
    expect(getCardType('5500005555555559')).toBe('mastercard');
  });

  it('retorna "unknown" para otros prefijos', () => {
    expect(getCardType('6011000000000000')).toBe('unknown');
  });
});

describe('truncateText', () => {
  it('recorta el texto y agrega puntos suspensivos', () => {
    expect(truncateText('Libro de programación web', 10)).toBe('Libro de p...');
  });
});

describe('getInitials', () => {
  it('devuelve las iniciales en mayúsculas', () => {
    expect(getInitials('Daniel Rojas')).toBe('DR');
  });
});

describe('calculateDiscount', () => {
  it('calcula el porcentaje de descuento', () => {
    expect(calculateDiscount(100, 75)).toBe(25);
  });
});

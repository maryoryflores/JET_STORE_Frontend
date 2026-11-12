import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCardNumber,
  formatExpiryDate,
  getCardType,
  truncateText,
  getInitials,
  calculateDiscount,
  formatDate,
  formatDateShort,
} from '@/utils/format';

describe('formatCurrency', () => {
  it('formatea un monto como soles peruanos (PEN)', () => {
    expect(formatCurrency(25.5)).toMatch(/S\/[\s\u00a0]*25\.50/);
  });

  it('formatea cero', () => {
    expect(formatCurrency(0)).toMatch(/S\/[\s\u00a0]*0\.00/);
  });

  it('formatea montos grandes', () => {
    expect(formatCurrency(1500)).toMatch(/1[,.]?500/);
  });
});

describe('formatDate', () => {
  it('formatea una fecha', () => {
    const result = formatDate('2025-06-01');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});

describe('formatDateShort', () => {
  it('formatea una fecha corta', () => {
    const result = formatDateShort('2025-06-01');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});

describe('formatCardNumber', () => {
  it('agrupa los dígitos en bloques de 4', () => {
    expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
  });

  it('elimina caracteres no numéricos', () => {
    expect(formatCardNumber('4111-1111-1111-1111')).toBe('4111 1111 1111 1111');
  });

  it('trunca a 16 dígitos', () => {
    expect(formatCardNumber('41111111111111112222').replace(/\s/g, '').length).toBeLessThanOrEqual(16);
  });
});

describe('formatExpiryDate', () => {
  it('inserta una barra después de los dos primeros dígitos', () => {
    expect(formatExpiryDate('1228')).toBe('12/28');
  });

  it('retorna solo dígitos si longitud <= 2', () => {
    expect(formatExpiryDate('12')).toBe('12');
  });

  it('elimina caracteres no numéricos', () => {
    expect(formatExpiryDate('ab12cd34')).toBe('12/34');
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

  it('identifica Mastercard con prefijo 51', () => {
    expect(getCardType('5100000000000000')).toBe('mastercard');
  });
});

describe('truncateText', () => {
  it('recorta el texto y agrega puntos suspensivos', () => {
    expect(truncateText('Libro de programación web', 10)).toBe('Libro de p...');
  });

  it('retorna texto completo si es menor al límite', () => {
    expect(truncateText('Hola', 10)).toBe('Hola');
  });

  it('retorna texto completo si es igual al límite', () => {
    expect(truncateText('12345', 5)).toBe('12345');
  });
});

describe('getInitials', () => {
  it('devuelve las iniciales en mayúsculas', () => {
    expect(getInitials('Daniel Rojas')).toBe('DR');
  });

  it('devuelve una inicial para un solo nombre', () => {
    expect(getInitials('Daniel')).toBe('D');
  });

  it('devuelve solo las dos primeras iniciales', () => {
    expect(getInitials('Ana Maria Perez')).toBe('AM');
  });
});

describe('calculateDiscount', () => {
  it('calcula el porcentaje de descuento', () => {
    expect(calculateDiscount(100, 75)).toBe(25);
  });

  it('retorna 0 si no hay descuento', () => {
    expect(calculateDiscount(50, 50)).toBe(0);
  });

  it('calcula descuento del 50%', () => {
    expect(calculateDiscount(100, 50)).toBe(50);
  });
});

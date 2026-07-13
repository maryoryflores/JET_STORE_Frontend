import { describe, it, expect } from 'vitest';
import { cn } from '@/utils/cn';

// Autor: Lucinda (Frontend) — prueba de la utilidad cn (unión de clases).

describe('cn', () => {
  it('une múltiples clases de texto y omite valores falsos', () => {
    expect(cn('btn', false, null, undefined, 0, 'active')).toBe('btn active');
  });
});

import { describe, it, expect } from 'vitest';
import { cn } from '@/utils/cn';

describe('cn', () => {
  it('une múltiples clases de texto y omite valores falsos', () => {
    expect(cn('btn', false, null, undefined, 0, 'active')).toBe('btn active');
  });

  it('returns empty string with no args', () => {
    expect(cn()).toBe('');
  });

  it('returns single class', () => {
    expect(cn('btn')).toBe('btn');
  });

  it('filters out empty strings', () => {
    expect(cn('a', '', 'b')).toBe('a b');
  });

  it('handles boolean true', () => {
    expect(cn(true && 'visible', 'hidden')).toBe('visible hidden');
  });
});

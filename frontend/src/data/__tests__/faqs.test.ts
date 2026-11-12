import { describe, it, expect } from 'vitest';
import { faqs } from '@/data/faqs';

describe('faqs data', () => {
  it('exports faqs array', () => {
    expect(Array.isArray(faqs)).toBe(true);
    expect(faqs.length).toBe(10);
  });

  it('each faq has required fields', () => {
    for (const f of faqs) {
      expect(f.id).toBeDefined();
      expect(f.pregunta).toBeDefined();
      expect(f.respuesta).toBeDefined();
      expect(f.categoria).toBeDefined();
    }
  });

  it('has unique categories', () => {
    const cats = new Set(faqs.map((f) => f.categoria));
    expect(cats.size).toBeGreaterThan(1);
  });
});

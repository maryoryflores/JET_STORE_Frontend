import { describe, it, expect } from 'vitest';
import { reportService } from '@/services/report.service';

describe('reportService', () => {
  it('getSalesReport returns mock data', async () => {
    const res = await reportService.getSalesReport();
    expect(res.data.ok).toBe(true);
    expect(Array.isArray(res.data.payload)).toBe(true);
  });

  it('getTopProducts returns mock data', async () => {
    const res = await reportService.getTopProducts();
    expect(res.data.ok).toBe(true);
    expect(Array.isArray(res.data.payload)).toBe(true);
  });

  it('getTopClients returns mock data', async () => {
    const res = await reportService.getTopClients();
    expect(res.data.ok).toBe(true);
    expect(Array.isArray(res.data.payload)).toBe(true);
  });
});

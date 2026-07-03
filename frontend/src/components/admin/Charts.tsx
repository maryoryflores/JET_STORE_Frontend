'use client';

import { useMemo } from 'react';
import Card from '@/components/ui/Card';
import { reportesVentas, reportesProductos } from '@/data/pedidos';

export function SalesChart() {
  const maxVentas = useMemo(() => Math.max(...reportesVentas.map((r) => r.ventas)), []);

  return (
    <Card>
      <h3 className="text-base font-semibold text-gray-900 mb-4">Ventas por Mes</h3>
      <div className="flex items-end gap-2 h-48">
        {reportesVentas.map((r) => (
          <div key={r.mes} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs font-medium text-gray-600">{r.ventas}</span>
            <div
              className="w-full bg-gradient-to-t from-[#DC2626] to-red-400 rounded-t-md transition-all"
              style={{ height: `${(r.ventas / maxVentas) * 100}%` }}
            />
            <span className="text-xs text-gray-500 truncate w-full text-center">{r.mes}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function TopProductsChart() {
  const maxCantidad = useMemo(() => Math.max(...reportesProductos.map((r) => r.cantidad)), []);

  return (
    <Card>
      <h3 className="text-base font-semibold text-gray-900 mb-4">Productos Más Vendidos</h3>
      <div className="space-y-3">
        {reportesProductos.map((r) => (
          <div key={r.producto}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700 font-medium truncate">{r.producto}</span>
              <span className="text-gray-500">{r.cantidad} uds</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-red-500 to-[#DC2626] h-2.5 rounded-full transition-all"
                style={{ width: `${(r.cantidad / maxCantidad) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SalesChart />
      <TopProductsChart />
    </div>
  );
}

'use client';

import StatsCards from '@/components/admin/StatsCards';
import Charts from '@/components/admin/Charts';
import { pedidos } from '@/data/pedidos';

export default function AdminDashboardPage() {
  const recentOrders = pedidos.slice(0, 5);

  return (
    <div className="space-y-6">
      <StatsCards />
      <Charts />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Pedidos Recientes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-500">N° Pedido</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Cliente</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Fecha</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Estado</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((pedido) => (
                <tr key={pedido.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900">{pedido.numeroPedido}</td>
                  <td className="py-3 px-4 text-gray-600">{pedido.cliente}</td>
                  <td className="py-3 px-4 text-gray-500">{pedido.fecha}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pedido.estado === 'completado' ? 'bg-green-100 text-green-700' :
                      pedido.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">
                    S/ {pedido.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { formatCurrency } from '@/utils/format';
import { HiCurrencyDollar, HiBookOpen, HiUserGroup, HiTrendingUp } from 'react-icons/hi';

const STATS = [
  {
    label: 'Total Ventas',
    value: formatCurrency(45890),
    icon: HiCurrencyDollar,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    label: 'Productos Vendidos',
    value: '1,284',
    icon: HiBookOpen,
    gradient: 'from-green-500 to-green-600',
  },
  {
    label: 'Clientes Registrados',
    value: '8,542',
    icon: HiUserGroup,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    label: 'Ingresos Totales',
    value: formatCurrency(45890),
    icon: HiTrendingUp,
    gradient: 'from-[#DC2626] to-red-600',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

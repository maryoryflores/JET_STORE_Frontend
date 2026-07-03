'use client';

import { cn } from '@/utils/cn';

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const sortOptions = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'rating', label: 'Más valorados' },
  { value: 'ventas', label: 'Más vendidos' },
];

export default function ProductSort({ value, onChange, className }: ProductSortProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <label className="text-sm text-gray-500 whitespace-nowrap">Ordenar por:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all cursor-pointer"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

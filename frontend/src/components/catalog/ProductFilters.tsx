'use client';

import { useState } from 'react';
import { HiAdjustments, HiX } from 'react-icons/hi';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import { Categoria } from '@/types';

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categoryName: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onClear: () => void;
  className?: string;
  categories?: Categoria[];
}

export default function ProductFilters({
  selectedCategories,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
  className,
  categories = [],
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = selectedCategories.length > 0 || minPrice || maxPrice;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Abrir filtros"
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <HiAdjustments className="w-5 h-5" />
        Filtros
        {hasActiveFilters && (
          <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
        )}
      </button>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 lg:static lg:bg-transparent lg:z-auto transition-opacity',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible',
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-2xl lg:shadow-none transform transition-transform lg:static lg:transform-none lg:w-full lg:block',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className,
        )}
      >
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Filtros</h3>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar filtros" className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 lg:p-0 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)] lg:max-h-none">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Categorías</h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.nombre)}
                    onChange={() => onCategoryChange(cat.nombre)}
                    className="w-4 h-4 rounded border-gray-300 text-[#DC2626] focus:ring-[#DC2626]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {cat.nombre}
                  </span>
                  <span className="ml-auto text-xs text-gray-400">({cat.productCount})</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Precio</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                placeholder="Mín"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                placeholder="Máx"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <Button variant="outline" size="sm" fullWidth onClick={onClear}>
              Limpiar Filtros
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}

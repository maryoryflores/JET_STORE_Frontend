'use client';

import { useState } from 'react';
import { HiAdjustments, HiX, HiStar } from 'react-icons/hi';
import { cn } from '@/utils/cn';
import { categorias } from '@/data/categorias';
import Button from '@/components/ui/Button';

interface ProductFiltersProps {
  selectedCategories: number[];
  onCategoryChange: (categoryId: number) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  onClear: () => void;
  className?: string;
}

export default function ProductFilters({
  selectedCategories,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  minRating,
  onRatingChange,
  onClear,
  className,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = selectedCategories.length > 0 || minPrice || maxPrice || minRating > 0;

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
              {categorias.map((cat) => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => onCategoryChange(cat.id)}
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

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Valoración Mínima</h4>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onRatingChange(minRating === star ? 0 : star)}
                  className="p-1 transition-colors"
                >
                  <HiStar
                    className={cn(
                      'w-6 h-6 transition-colors',
                      star <= minRating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300',
                    )}
                  />
                </button>
              ))}
              {minRating > 0 && (
                <span className="ml-2 text-xs text-gray-500">{minRating}+ estrellas</span>
              )}
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

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import { productos } from '@/data/productos';
import { categorias } from '@/data/categorias';
import SearchBar from '@/components/catalog/SearchBar';
import ProductFilters from '@/components/catalog/ProductFilters';
import ProductSort from '@/components/catalog/ProductSort';
import ProductGrid from '@/components/catalog/ProductGrid';
import { Producto } from '@/types';

const ITEMS_PER_PAGE = 12;

export default function CatalogoPage() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('relevancia');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result: Producto[] = [...productos];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.titulo.toLowerCase().includes(q) ||
          p.autor.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (selectedCategories.length > 0) {
      const selectedSlugs = categorias
        .filter((c) => selectedCategories.includes(c.id))
        .map((c) => c.nombre);
      result = result.filter((p) => selectedSlugs.includes(p.categoria));
    }

    if (minPrice) {
      result = result.filter((p) => p.precio >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.precio <= Number(maxPrice));
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    switch (sort) {
      case 'precio-asc':
        result.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.precio - a.precio);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'ventas':
        result.sort((a, b) => (b.masVendido ? 1 : 0) - (a.masVendido ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    }

    return result;
  }, [search, selectedCategories, minPrice, maxPrice, minRating, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    );
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="flex items-center gap-1 hover:text-[#DC2626] transition-colors">
              <HiHome className="w-4 h-4" />
              Inicio
            </Link>
            <HiChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Catálogo</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Catálogo de Libros</h1>
          <p className="mt-2 text-gray-500">
            Explora nuestra colección de libros digitales profesionales
          </p>
        </div>

        <div className="mb-6">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
          <ProductSort value={sort} onChange={handleSortChange} />
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={(v) => { setMinPrice(v); setPage(1); }}
              onMaxPriceChange={(v) => { setMaxPrice(v); setPage(1); }}
              minRating={minRating}
              onRatingChange={(r) => { setMinRating(r); setPage(1); }}
              onClear={handleClearFilters}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="lg:hidden mb-4">
              <ProductFilters
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={(v) => { setMinPrice(v); setPage(1); }}
                onMaxPriceChange={(v) => { setMaxPrice(v); setPage(1); }}
                minRating={minRating}
                onRatingChange={(r) => { setMinRating(r); setPage(1); }}
                onClear={handleClearFilters}
              />
            </div>

            <ProductGrid products={paginated} />

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? 'bg-[#DC2626] text-white'
                        : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

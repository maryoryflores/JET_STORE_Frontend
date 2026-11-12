'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import { Producto } from '@/types';
import { productService } from '@/services/product.service';
import { productos as mockProductos } from '@/data/productos';
import SearchBar from '@/components/catalog/SearchBar';
import ProductFilters from '@/components/catalog/ProductFilters';
import ProductSort from '@/components/catalog/ProductSort';
import ProductGrid from '@/components/catalog/ProductGrid';
import Spinner from '@/components/ui/Spinner';

const ITEMS_PER_PAGE = 12;

export default function CatalogoView() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('relevancia');
  const [page, setPage] = useState(1);
  const [backendCategories, setBackendCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          productService.getAll(),
          productService.getCategories(),
        ]);
        if (prodRes.data.ok) setProductos(prodRes.data.payload);
        if (catRes.data.ok) setBackendCategories(catRes.data.payload);
      } catch {
        setProductos(
          mockProductos.map((p) => ({
            id: p.id,
            titulo: p.titulo,
            autor: p.autor,
            categoria: p.categoria,
            precio: p.precio,
            formato: p.formato,
            imagen: p.imagen,
            stock: p.stock,
            fechaCreacion: p.fechaPublicacion,
          }))
        );
        setBackendCategories([...new Set(mockProductos.map((p) => p.categoria))]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    let result: Producto[] = [...productos];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.titulo.toLowerCase().includes(q) ||
          p.autor.toLowerCase().includes(q),
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categoria));
    }

    if (minPrice) {
      result = result.filter((p) => p.precio >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.precio <= Number(maxPrice));
    }

    switch (sort) {
      case 'precio-asc':
        result.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.precio - a.precio);
        break;
      default:
        result.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
    }

    return result;
  }, [search, selectedCategories, minPrice, maxPrice, sort, productos]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((c) => c !== categoryName) : [...prev, categoryName],
    );
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const categoryFilters = useMemo(() => {
    return backendCategories.map((nombre, index) => ({
      id: index + 1,
      nombre,
      slug: nombre.toLowerCase(),
      descripcion: '',
      icono: '',
      imagen: '',
      productCount: productos.filter((p) => p.categoria === nombre).length,
    }));
  }, [backendCategories, productos]);

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
            {loading ? 'Cargando...' : `${filtered.length} producto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
          </p>
          <ProductSort value={sort} onChange={handleSortChange} />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="hidden lg:block w-64 flex-shrink-0">
              <ProductFilters
                selectedCategories={selectedCategories.map((c) => c)}
                onCategoryChange={handleCategoryChange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={(v) => { setMinPrice(v); setPage(1); }}
                onMaxPriceChange={(v) => { setMaxPrice(v); setPage(1); }}
                onClear={handleClearFilters}
                categories={categoryFilters}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="lg:hidden mb-4">
                <ProductFilters
                  selectedCategories={selectedCategories.map((c) => c)}
                  onCategoryChange={handleCategoryChange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onMinPriceChange={(v) => { setMinPrice(v); setPage(1); }}
                  onMaxPriceChange={(v) => { setMaxPrice(v); setPage(1); }}
                  onClear={handleClearFilters}
                  categories={categoryFilters}
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
        )}
      </div>
    </div>
  );
}

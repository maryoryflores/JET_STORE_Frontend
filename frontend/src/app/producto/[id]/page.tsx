'use client';

import { use } from 'react';
import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import { productos } from '@/data/productos';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';

export default function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productoId = parseInt(id, 10);
  const producto = productos.find((p) => p.id === productoId);

  if (!producto) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <p className="text-gray-500 mb-6">El libro que buscas no está disponible.</p>
          <Link
            href="/catalogo"
            className="inline-flex items-center px-6 py-3 bg-[#DC2626] text-white rounded-xl hover:bg-[#B91C1C] transition-colors"
          >
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const categoriaSlug = producto.categoria.toLowerCase();

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
            <Link href="/catalogo" className="hover:text-[#DC2626] transition-colors">Catálogo</Link>
            <HiChevronRight className="w-4 h-4" />
            <Link href={`/catalogo?categoria=${categoriaSlug}`} className="hover:text-[#DC2626] transition-colors">
              {producto.categoria}
            </Link>
            <HiChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{producto.titulo}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={producto.imagenes || [producto.imagen]} title={producto.titulo} />
          <ProductInfo producto={producto} />
        </div>

        <RelatedProducts currentId={producto.id} categoriaId={producto.categoriaId} />
      </div>
    </div>
  );
}

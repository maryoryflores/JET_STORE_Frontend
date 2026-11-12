'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import { Producto } from '@/types';
import { productService } from '@/services/product.service';
import { productos as mockProductos } from '@/data/productos';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import Spinner from '@/components/ui/Spinner';

export default function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productoId = parseInt(id, 10);
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await productService.getById(productoId);
        if (res.data.ok) {
          setProducto(res.data.payload);
        }
      } catch {
        const mock = mockProductos.find((p) => p.id === productoId);
        if (mock) {
          setProducto({
            id: mock.id,
            titulo: mock.titulo,
            autor: mock.autor,
            categoria: mock.categoria,
            precio: mock.precio,
            formato: mock.formato,
            imagen: mock.imagen,
            stock: mock.stock,
            fechaCreacion: mock.fechaPublicacion,
          });
        } else {
          setProducto(null);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [productoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

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
            <Link href={`/catalogo?categoria=${producto.categoria.toLowerCase()}`} className="hover:text-[#DC2626] transition-colors">
              {producto.categoria}
            </Link>
            <HiChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{producto.titulo}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={producto.imagen ? [producto.imagen] : []} title={producto.titulo} />
          <ProductInfo producto={producto} />
        </div>
        <RelatedProducts currentId={producto.id} categoria={producto.categoria} />
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { HiStar, HiShoppingCart, HiPhotograph } from 'react-icons/hi';
import { productos } from '@/data/productos';
import { formatCurrency, truncateText } from '@/utils/format';
import { useCartStore } from '@/store/cart-store';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface RelatedProductsProps {
  currentId: number;
  categoriaId: number;
}

export default function RelatedProducts({ currentId, categoriaId }: RelatedProductsProps) {
  const agregar = useCartStore((s) => s.agregar);

  const related = productos
    .filter((p) => p.categoriaId === categoriaId && p.id !== currentId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Relacionados</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((producto) => (
          <div
            key={producto.id}
            className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              {producto.imagen ? (
                <Image
                  src={producto.imagen}
                  alt={producto.titulo}
                  width={200}
                  height={150}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <HiPhotograph className="w-8 h-8 text-gray-300" />
              )}
              {producto.oferta && producto.descuento && (
                <Badge variant="danger" className="absolute top-2 left-2">
                  -{producto.descuento}%
                </Badge>
              )}
            </div>
            <div className="p-3 space-y-1.5">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {truncateText(producto.titulo, 35)}
              </h3>
              <p className="text-xs text-gray-500">{producto.autor}</p>
              <div className="flex items-center gap-1">
                <HiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium text-gray-700">{producto.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">{formatCurrency(producto.precio)}</span>
                {producto.precioOriginal && (
                  <span className="text-xs text-gray-400 line-through">{formatCurrency(producto.precioOriginal)}</span>
                )}
              </div>
              <Button
                fullWidth
                size="sm"
                icon={<HiShoppingCart className="w-3 h-3" />}
                onClick={() => agregar(producto)}
                disabled={!producto.stock}
              >
                {producto.stock ? 'Agregar' : 'Sin Stock'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

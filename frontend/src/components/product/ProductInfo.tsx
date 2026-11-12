'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiHeart, HiShoppingCart, HiStar, HiMinus, HiPlus } from 'react-icons/hi';
import { Producto } from '@/types';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/format';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { useFavoritesStore } from '@/store/favorites-store';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Swal from 'sweetalert2';

interface ProductInfoProps {
  producto: Producto;
}

export default function ProductInfo({ producto }: ProductInfoProps) {
  const [cantidad, setCantidad] = useState(1);
  const agregar = useCartStore((s) => s.agregar);
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Inicia sesión',
        text: 'Necesitas una cuenta para agregar productos al carrito.',
        icon: 'info',
        confirmButtonColor: '#DC2626',
        confirmButtonText: 'Ir a Login',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
      return;
    }
    agregar(producto, cantidad);
    setCantidad(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{producto.titulo}</h1>
          <button
            type="button"
            onClick={() => toggle(producto.id)}
            aria-label={isFavorite(producto.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className="flex-shrink-0 p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <HiHeart
              className={cn(
                'w-6 h-6 transition-colors',
                isFavorite(producto.id) ? 'text-red-500 fill-red-500' : 'text-gray-400',
              )}
            />
          </button>
        </div>
        <p className="text-gray-500 mt-1">por {producto.autor}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <HiStar
              key={star}
              className={cn(
                'w-5 h-5',
                star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300',
              )}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-700">4.0</span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-[#DC2626]">{formatCurrency(producto.precio)}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
        <div>
          <span className="text-xs text-gray-500">Formato</span>
          <p className="text-sm font-medium text-gray-900">{producto.formato}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Stock</span>
          <p className="text-sm font-medium text-gray-900">{producto.stock > 0 ? `${producto.stock} disponibles` : 'Agotado'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="info">{producto.categoria}</Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            aria-label="Reducir cantidad"
            className="p-3 hover:bg-gray-50 transition-colors"
          >
            <HiMinus className="w-4 h-4 text-gray-600" />
          </button>
          <span className="px-6 py-3 text-sm font-medium text-gray-900 border-x border-gray-200 min-w-[3rem] text-center">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => setCantidad(cantidad + 1)}
            aria-label="Aumentar cantidad"
            className="p-3 hover:bg-gray-50 transition-colors"
          >
            <HiPlus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <Button
          size="lg"
          icon={<HiShoppingCart className="w-5 h-5" />}
          onClick={handleAddToCart}
          disabled={producto.stock <= 0}
          className="flex-1"
        >
          {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
        </Button>
      </div>
    </div>
  );
}

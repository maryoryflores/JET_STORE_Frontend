'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiHeart, HiShoppingCart, HiPhotograph, HiStar } from 'react-icons/hi';
import { Producto } from '@/types';
import { cn } from '@/utils/cn';
import { formatCurrency, truncateText } from '@/utils/format';
import { useCartStore } from '@/store/cart-store';
import { useFavoritesStore } from '@/store/favorites-store';
import { useAuthStore } from '@/store/auth-store';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Swal from 'sweetalert2';

interface ProductGridProps {
  products: Producto[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const agregar = useCartStore((s) => s.agregar);
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleAddToCart = (producto: Producto) => {
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
    agregar(producto);
  };

  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
        <HiPhotograph className="w-16 h-16 mb-4" />
        <p className="text-lg font-medium">No se encontraron productos</p>
        <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((producto, index) => (
        <motion.div
          key={producto.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center overflow-hidden">
              {producto.imagen ? (
                <img src={producto.imagen} alt={producto.titulo} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <span className="text-red-300 text-4xl font-bold opacity-30">{producto.titulo.charAt(0)}</span>
              )}
              {producto.stock <= 0 && (
                <Badge variant="danger" className="absolute top-3 left-3">
                  Sin Stock
                </Badge>
              )}
              <button
                type="button"
                onClick={() => toggle(producto.id)}
                aria-label={isFavorite(producto.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <HiHeart
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isFavorite(producto.id) ? 'text-red-500 fill-red-500' : 'text-gray-400',
                  )}
                />
              </button>
              <Link href={`/producto/${producto.id}`} className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 bg-[#111111] text-white hover:bg-gray-800 shadow-md hover:shadow-lg px-3 py-1.5 text-sm gap-1.5 translate-y-4 group-hover:translate-y-0 transition-transform">
                  Ver Detalle
                </span>
              </Link>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {truncateText(producto.titulo, 40)}
              </h3>
              <p className="text-xs text-gray-500">{producto.autor}</p>
              <div className="flex items-center gap-1">
                <HiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-700">4.0</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">{formatCurrency(producto.precio)}</span>
              </div>
              <Button
                fullWidth
                size="sm"
                icon={<HiShoppingCart className="w-4 h-4" />}
                onClick={() => handleAddToCart(producto)}
                disabled={producto.stock <= 0}
              >
                {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

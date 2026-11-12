'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiHeart, HiShoppingCart, HiStar } from 'react-icons/hi';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { useFavoritesStore } from '@/store/favorites-store';
import { formatCurrency } from '@/utils/format';
import { productService } from '@/services/product.service';
import { Producto } from '@/types';
import { productos as mockProductos } from '@/data/productos';
import Swal from 'sweetalert2';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(<HiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
    } else {
      stars.push(<HiStar key={i} className="w-4 h-4 text-gray-300" />);
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

function ProductCard({ producto }: { producto: Producto }) {
  const [isHovered, setIsHovered] = useState(false);
  const agregar = useCartStore((s) => s.agregar);
  const { toggle, isFavorite } = useFavoritesStore();
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
    agregar(producto);
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link href={`/producto/${producto.id}`}>
        <div className="relative aspect-[4/3] bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center overflow-hidden">
          <span className="text-red-300 text-5xl font-bold opacity-30">{producto.titulo.charAt(0)}</span>
          {producto.stock <= 0 && (
            <span className="absolute top-3 left-3 bg-gray-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
              Sin Stock
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => { e.preventDefault(); toggle(producto.id); }}
        aria-label={isFavorite(producto.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all z-10 ${
          isFavorite(producto.id)
            ? 'bg-red-600 text-white'
            : 'bg-white/90 text-gray-600 hover:bg-white'
        }`}
      >
        <HiHeart className={`w-5 h-5 ${isFavorite(producto.id) ? 'fill-current' : ''}`} />
      </button>

      <div className="p-5">
        <Link href={`/producto/${producto.id}`}>
          <span className="inline-block text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full mb-2">
            {producto.categoria}
          </span>
          <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
            {producto.titulo}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{producto.autor}</p>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={4} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{formatCurrency(producto.precio)}</span>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          onClick={handleAddToCart}
          disabled={producto.stock <= 0}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiShoppingCart className="w-4 h-4" />
          {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState<Producto[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await productService.getRecent();
        if (res.data.ok) {
          setFeatured(res.data.payload.slice(0, 8));
        }
      } catch {
        setFeatured(
          mockProductos.slice(0, 8).map((p) => ({
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
      }
    };
    load();
  }, []);

  if (featured.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Productos Destacados</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Los títulos más recientes disponibles en nuestra tienda
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {featured.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </div>
    </section>
  );
}

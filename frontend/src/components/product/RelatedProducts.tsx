'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiShoppingCart } from 'react-icons/hi';
import { formatCurrency, truncateText } from '@/utils/format';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { productService } from '@/services/product.service';
import { Producto } from '@/types';
import { productos as mockProductos } from '@/data/productos';
import Button from '@/components/ui/Button';
import Swal from 'sweetalert2';

interface RelatedProductsProps {
  currentId: number;
  categoria: string;
}

export default function RelatedProducts({ currentId, categoria }: RelatedProductsProps) {
  const agregar = useCartStore((s) => s.agregar);
  const { isAuthenticated } = useAuthStore();
  const [related, setRelated] = useState<Producto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await productService.getByCategory(categoria);
        if (res.data.ok) {
          setRelated(res.data.payload.filter((p) => p.id !== currentId).slice(0, 4));
        }
      } catch {
        setRelated(
          mockProductos
            .filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase() && p.id !== currentId)
            .slice(0, 4)
            .map((p) => ({
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
    if (categoria) load();
  }, [currentId, categoria]);

  const handleAddToCart = (producto: Producto) => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Inicia sesión',
        text: 'Necesitas una cuenta para agregar productos al carrito.',
        icon: 'info',
        confirmButtonColor: '#DC2626',
        confirmButtonText: 'Ir a Login',
      }).then((result) => {
        if (result.isConfirmed) router.push('/login');
      });
      return;
    }
    agregar(producto);
  };

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
            <Link href={`/producto/${producto.id}`}>
              <div className="relative aspect-[4/3] bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                <span className="text-red-300 text-3xl font-bold opacity-30">{producto.titulo.charAt(0)}</span>
              </div>
            </Link>
            <div className="p-3 space-y-1.5">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {truncateText(producto.titulo, 35)}
              </h3>
              <p className="text-xs text-gray-500">{producto.autor}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">{formatCurrency(producto.precio)}</span>
              </div>
              <Button
                fullWidth
                size="sm"
                icon={<HiShoppingCart className="w-3 h-3" />}
                onClick={() => handleAddToCart(producto)}
                disabled={producto.stock <= 0}
              >
                {producto.stock > 0 ? 'Agregar' : 'Sin Stock'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

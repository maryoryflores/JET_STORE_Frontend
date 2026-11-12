'use client';

import { useMemo, useState, useEffect } from 'react';
import { useFavoritesStore } from '@/store/favorites-store';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { formatCurrency } from '@/utils/format';
import Button from '@/components/ui/Button';
import { HiHeart, HiShoppingCart, HiTrash } from 'react-icons/hi';
import { productService } from '@/services/product.service';
import { Producto } from '@/types';
import { productos as mockProductos } from '@/data/productos';
import Swal from 'sweetalert2';

export default function FavoritesList() {
  const { items, toggle } = useFavoritesStore();
  const { agregar } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [allProducts, setAllProducts] = useState<Producto[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await productService.getAll();
        if (res.data.ok) setAllProducts(res.data.payload);
      } catch {
        setAllProducts(
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
      }
    };
    load();
  }, []);

  const favoriteProducts = useMemo(
    () => allProducts.filter((p) => items.includes(p.id)),
    [items, allProducts]
  );

  const handleAdd = (producto: Producto) => {
    if (!isAuthenticated) {
      Swal.fire({ title: 'Inicia sesión', text: 'Necesitas una cuenta.', icon: 'info', confirmButtonColor: '#DC2626' });
      return;
    }
    agregar(producto);
  };

  if (favoriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <HiHeart className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No tienes favoritos</h3>
        <p className="text-gray-500">Agrega productos a tu lista de favoritos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteProducts.map((producto) => (
        <div key={producto.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group">
          <div className="aspect-[3/4] bg-gradient-to-br from-red-50 to-red-100 relative flex items-center justify-center">
            <span className="text-red-300 text-5xl font-bold opacity-30">{producto.titulo.charAt(0)}</span>
            <button
              onClick={() => toggle(producto.id)}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
            >
              <HiHeart className="w-5 h-5 text-red-500" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{producto.titulo}</h3>
            <p className="text-xs text-gray-500 mb-2">{producto.autor}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#DC2626]">{formatCurrency(producto.precio)}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="primary" icon={<HiShoppingCart />} onClick={() => handleAdd(producto)} className="flex-1">
                Carrito
              </Button>
              <Button size="sm" variant="ghost" icon={<HiTrash />} onClick={() => toggle(producto.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

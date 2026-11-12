'use client';

import Link from 'next/link';
import { HiShoppingCart, HiArrowLeft } from 'react-icons/hi';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

export default function CarritoPage() {
  const { items, subtotal } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="flex items-center gap-1 hover:text-[#DC2626] transition-colors">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">Carrito</span>
            </nav>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <HiShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Inicia sesión para ver tu carrito</h2>
          <p className="text-gray-500 mb-6">Necesitas una cuenta para agregar productos al carrito</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] text-white rounded-xl hover:bg-[#B91C1C] transition-colors font-medium"
          >
            Iniciar Sesión
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
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Carrito</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <HiShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-6">Agrega productos desde nuestro catálogo</p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] text-white rounded-xl hover:bg-[#B91C1C] transition-colors font-medium"
            >
              <HiArrowLeft className="w-4 h-4" />
              Ir al Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.itemId} item={item} />
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <CartSummary subtotal={subtotal()} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

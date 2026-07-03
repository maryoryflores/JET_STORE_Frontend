'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HiTrash, HiMinus, HiPlus, HiPhotograph } from 'react-icons/hi';
import { CarritoItem } from '@/types';
import { formatCurrency } from '@/utils/format';
import { useCartStore } from '@/store/cart-store';

interface CartItemProps {
  item: CarritoItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { eliminar, actualizarCantidad } = useCartStore();
  const { producto, cantidad } = item;

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
      >
        <div className="flex-shrink-0 w-16 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
          {producto.imagen ? (
            <Image src={producto.imagen} alt={producto.titulo} width={64} height={80} className="w-full h-full object-cover" />
          ) : (
            <HiPhotograph className="w-6 h-6 text-gray-300" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{producto.titulo}</h3>
          <p className="text-xs text-gray-500">{producto.autor}</p>
          <p className="text-sm font-bold text-[#DC2626] mt-1">{formatCurrency(producto.precio)}</p>
        </div>

        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => actualizarCantidad(producto.id, cantidad - 1)}
            disabled={cantidad <= 1}
            aria-label="Reducir cantidad"
            className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiMinus className="w-3 h-3 text-gray-600" />
          </button>
          <span className="px-3 py-2 text-sm font-medium text-gray-900 border-x border-gray-200 min-w-[2.5rem] text-center">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => actualizarCantidad(producto.id, cantidad + 1)}
            aria-label="Aumentar cantidad"
            className="p-2 hover:bg-gray-50 transition-colors"
          >
            <HiPlus className="w-3 h-3 text-gray-600" />
          </button>
        </div>

        <div className="text-right min-w-[5rem]">
          <p className="text-sm font-bold text-gray-900">{formatCurrency(producto.precio * cantidad)}</p>
        </div>

        <button
          type="button"
          onClick={() => eliminar(producto.id)}
          aria-label="Eliminar producto"
          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
        >
          <HiTrash className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

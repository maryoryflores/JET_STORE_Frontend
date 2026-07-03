'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Producto, CarritoItem } from '@/types';

interface CartStore {
  items: CarritoItem[];
  agregar: (producto: Producto, cantidad?: number) => void;
  eliminar: (productoId: number) => void;
  actualizarCantidad: (productoId: number, cantidad: number) => void;
  vaciar: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      agregar: (producto: Producto, cantidad = 1) => {
        set((state) => {
          const existente = state.items.find((item) => item.producto.id === producto.id);
          if (existente) {
            return {
              items: state.items.map((item) =>
                item.producto.id === producto.id
                  ? { ...item, cantidad: item.cantidad + cantidad }
                  : item
              ),
            };
          }
          return { items: [...state.items, { producto, cantidad }] };
        });
      },
      eliminar: (productoId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.producto.id !== productoId),
        }));
      },
      actualizarCantidad: (productoId: number, cantidad: number) => {
        if (cantidad < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.producto.id === productoId ? { ...item, cantidad } : item
          ),
        }));
      },
      vaciar: () => set({ items: [] }),
      totalItems: () => get().items.reduce((total, item) => total + item.cantidad, 0),
      subtotal: () => get().items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0),
    }),
    { name: 'jetstore-cart' }
  )
);

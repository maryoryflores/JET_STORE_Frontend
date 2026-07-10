'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Producto, CarritoItem } from '@/types';
import { cartService } from '@/services/cart.service';
import { useAuthStore } from './auth-store';

interface CartStore {
  items: CarritoItem[];
  total: number;
  agregar: (producto: Producto, cantidad?: number) => Promise<boolean>;
  eliminar: (libroId: number) => Promise<boolean>;
  actualizarCantidad: (libroId: number, cantidad: number) => Promise<boolean>;
  vaciar: () => void;
  cargarCarrito: () => Promise<void>;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      agregar: async (producto: Producto, cantidad = 1) => {
        const { usuario, isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated || !usuario) return false;
        try {
          const response = await cartService.addItem(usuario.id, producto.id, cantidad);
          const data = response.data;
          if (data.ok && data.payload) {
            set({
              items: data.payload.items,
              total: data.payload.total,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      eliminar: async (libroId: number) => {
        const { usuario, isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated || !usuario) return false;
        try {
          const response = await cartService.removeItem(usuario.id, libroId);
          const data = response.data;
          if (data.ok && data.payload) {
            set({
              items: data.payload.items,
              total: data.payload.total,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      actualizarCantidad: async (libroId: number, cantidad: number) => {
        const { usuario, isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated || !usuario || cantidad < 1) return false;
        try {
          await cartService.removeItem(usuario.id, libroId);
          const response = await cartService.addItem(usuario.id, libroId, cantidad);
          const data = response.data;
          if (data.ok && data.payload) {
            set({
              items: data.payload.items,
              total: data.payload.total,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      vaciar: () => set({ items: [], total: 0 }),

      cargarCarrito: async () => {
        const { usuario, isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated || !usuario) {
          set({ items: [], total: 0 });
          return;
        }
        try {
          const response = await cartService.getCart(usuario.id);
          const data = response.data;
          if (data.ok && data.payload) {
            set({
              items: data.payload.items,
              total: data.payload.total,
            });
          }
        } catch {
          set({ items: [], total: 0 });
        }
      },

      totalItems: () => get().items.reduce((acc, item) => acc + item.cantidad, 0),
      subtotal: () => get().items.reduce((acc, item) => acc + item.subtotal, 0),
    }),
    { name: 'jetstore-cart' }
  )
);

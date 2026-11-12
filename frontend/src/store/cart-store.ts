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

let localItemIdCounter = 0;

function addToLocal(items: CarritoItem[], producto: Producto, cantidad: number): CarritoItem[] {
  const existing = items.find((i) => i.libroId === producto.id);
  if (existing) {
    return items.map((i) =>
      i.libroId === producto.id
        ? { ...i, cantidad: i.cantidad + cantidad, subtotal: (i.cantidad + cantidad) * i.precioUnitario }
        : i
    );
  }
  return [
    ...items,
    {
      itemId: ++localItemIdCounter,
      libroId: producto.id,
      titulo: producto.titulo,
      autor: producto.autor,
      precioUnitario: producto.precio,
      cantidad,
      subtotal: producto.precio * cantidad,
    },
  ];
}

function removeFromLocal(items: CarritoItem[], libroId: number): CarritoItem[] {
  return items.filter((i) => i.libroId !== libroId);
}

function updateLocalQty(items: CarritoItem[], libroId: number, cantidad: number): CarritoItem[] {
  if (cantidad < 1) return items;
  return items.map((i) =>
    i.libroId === libroId
      ? { ...i, cantidad, subtotal: cantidad * i.precioUnitario }
      : i
  );
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
          const currentItems = get().items;
          const updated = addToLocal(currentItems, producto, cantidad);
          set({ items: updated, total: updated.reduce((acc, i) => acc + i.subtotal, 0) });
          return true;
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
          const currentItems = get().items;
          const updated = removeFromLocal(currentItems, libroId);
          set({ items: updated, total: updated.reduce((acc, i) => acc + i.subtotal, 0) });
          return true;
        }
      },

      actualizarCantidad: async (libroId: number, cantidad: number) => {
        const { usuario, isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated || !usuario || cantidad < 1) return false;

        try {
          const removeRes = await cartService.removeItem(usuario.id, libroId);
          const removeData = removeRes.data;
          if (!removeData.ok) return false;
          try {
            const addRes = await cartService.addItem(usuario.id, libroId, cantidad);
            const addData = addRes.data;
            if (addData.ok && addData.payload) {
              set({
                items: addData.payload.items,
                total: addData.payload.total,
              });
              return true;
            }
            return false;
          } catch {
            const restoredRes = await cartService.addItem(usuario.id, libroId, 1);
            if (restoredRes.data.ok && restoredRes.data.payload) {
              set({
                items: restoredRes.data.payload.items,
                total: restoredRes.data.payload.total,
              });
            }
            return false;
          }
        } catch {
          const currentItems = get().items;
          const updated = updateLocalQty(currentItems, libroId, cantidad);
          set({ items: updated, total: updated.reduce((acc, i) => acc + i.subtotal, 0) });
          return true;
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
          // keep locally persisted items
        }
      },

      totalItems: () => get().items.reduce((acc, item) => acc + item.cantidad, 0),
      subtotal: () => get().items.reduce((acc, item) => acc + item.subtotal, 0),
    }),
    { name: 'jetstore-cart' }
  )
);

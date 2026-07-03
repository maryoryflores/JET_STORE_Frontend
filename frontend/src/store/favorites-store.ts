'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  items: number[];
  toggle: (productoId: number) => void;
  isFavorite: (productoId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productoId: number) => {
        set((state) => {
          if (state.items.includes(productoId)) {
            return { items: state.items.filter((id) => id !== productoId) };
          }
          return { items: [...state.items, productoId] };
        });
      },
      isFavorite: (productoId: number) => get().items.includes(productoId),
    }),
    { name: 'jetstore-favorites' }
  )
);

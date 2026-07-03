'use client';

import { create } from 'zustand';

interface UIStore {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSidebarOpen: boolean;
  toggleCart: () => void;
  toggleMobileMenu: () => void;
  toggleSidebar: () => void;
  closeCart: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSidebarOpen: true,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeCart: () => set({ isCartOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));

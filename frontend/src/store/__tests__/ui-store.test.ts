import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '@/store/ui-store';

describe('useUIStore', () => {
  beforeEach(() => {
    useUIStore.setState({ isCartOpen: false, isMobileMenuOpen: false, isSidebarOpen: true });
  });

  it('starts with correct defaults', () => {
    const state = useUIStore.getState();
    expect(state.isCartOpen).toBe(false);
    expect(state.isMobileMenuOpen).toBe(false);
    expect(state.isSidebarOpen).toBe(true);
  });

  it('toggleCart toggles cart open state', () => {
    useUIStore.getState().toggleCart();
    expect(useUIStore.getState().isCartOpen).toBe(true);
    useUIStore.getState().toggleCart();
    expect(useUIStore.getState().isCartOpen).toBe(false);
  });

  it('toggleMobileMenu toggles mobile menu', () => {
    useUIStore.getState().toggleMobileMenu();
    expect(useUIStore.getState().isMobileMenuOpen).toBe(true);
    useUIStore.getState().toggleMobileMenu();
    expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
  });

  it('toggleSidebar toggles sidebar', () => {
    useUIStore.getState().toggleSidebar();
    expect(useUIStore.getState().isSidebarOpen).toBe(false);
    useUIStore.getState().toggleSidebar();
    expect(useUIStore.getState().isSidebarOpen).toBe(true);
  });

  it('closeCart sets isCartOpen to false', () => {
    useUIStore.setState({ isCartOpen: true });
    useUIStore.getState().closeCart();
    expect(useUIStore.getState().isCartOpen).toBe(false);
  });

  it('closeMobileMenu sets isMobileMenuOpen to false', () => {
    useUIStore.setState({ isMobileMenuOpen: true });
    useUIStore.getState().closeMobileMenu();
    expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
  });
});

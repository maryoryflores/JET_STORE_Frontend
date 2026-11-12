import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from '@/store/favorites-store';

describe('useFavoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ items: [] });
  });

  it('starts with empty items', () => {
    expect(useFavoritesStore.getState().items).toEqual([]);
  });

  it('toggle adds a product to favorites', () => {
    useFavoritesStore.getState().toggle(1);
    expect(useFavoritesStore.getState().items).toContain(1);
  });

  it('toggle removes a product from favorites', () => {
    useFavoritesStore.setState({ items: [1, 2, 3] });
    useFavoritesStore.getState().toggle(2);
    expect(useFavoritesStore.getState().items).not.toContain(2);
    expect(useFavoritesStore.getState().items).toEqual([1, 3]);
  });

  it('isFavorite returns true when product is in favorites', () => {
    useFavoritesStore.setState({ items: [1, 3, 5] });
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true);
    expect(useFavoritesStore.getState().isFavorite(3)).toBe(true);
  });

  it('isFavorite returns false when product is not in favorites', () => {
    useFavoritesStore.setState({ items: [1, 3, 5] });
    expect(useFavoritesStore.getState().isFavorite(2)).toBe(false);
    expect(useFavoritesStore.getState().isFavorite(4)).toBe(false);
  });
});

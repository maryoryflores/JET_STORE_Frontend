import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductGallery from '@/components/product/ProductGallery';

describe('ProductGallery', () => {
  it('renders title placeholder when no images', () => {
    render(<ProductGallery images={[]} title="My Book" />);
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(<ProductGallery images={['/img.jpg']} title="My Book" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img.jpg');
  });

  it('renders thumbnails for multiple images', () => {
    render(<ProductGallery images={['/a.jpg', '/b.jpg', '/c.jpg']} title="Book" />);
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBeGreaterThanOrEqual(3);
  });
});

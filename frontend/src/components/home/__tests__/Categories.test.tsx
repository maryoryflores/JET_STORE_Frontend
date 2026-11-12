import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Categories from '@/components/home/Categories';

describe('Categories', () => {
  it('renders section heading', () => {
    render(<Categories />);
    expect(screen.getByText(/Categor/)).toBeInTheDocument();
  });

  it('renders category cards', () => {
    render(<Categories />);
    expect(screen.getByText('Tecnología')).toBeInTheDocument();
    expect(screen.getByText('Negocios')).toBeInTheDocument();
    expect(screen.getByText('Salud')).toBeInTheDocument();
    expect(screen.getByText('Educación')).toBeInTheDocument();
    expect(screen.getByText('Diseño')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
  });

  it('each category links to catalog with slug', () => {
    render(<Categories />);
    const links = screen.getAllByRole('link');
    const catalogLinks = links.filter((l) => l.getAttribute('href')?.includes('/catalogo?categoria='));
    expect(catalogLinks.length).toBeGreaterThan(0);
  });
});

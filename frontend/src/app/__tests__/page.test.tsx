import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('@/components/home/Hero', () => ({ default: () => <div data-testid="hero" /> }));
vi.mock('@/components/home/Stats', () => ({ default: () => <div data-testid="stats" /> }));
vi.mock('@/components/home/Categories', () => ({ default: () => <div data-testid="categories" /> }));
vi.mock('@/components/home/FeaturedProducts', () => ({ default: () => <div data-testid="featured" /> }));
vi.mock('@/components/home/Benefits', () => ({ default: () => <div data-testid="benefits" /> }));
vi.mock('@/components/home/HowItWorks', () => ({ default: () => <div data-testid="how-it-works" /> }));
vi.mock('@/components/home/Testimonials', () => ({ default: () => <div data-testid="testimonials" /> }));
vi.mock('@/components/home/FAQ', () => ({ default: () => <div data-testid="faq" /> }));
vi.mock('@/components/home/Newsletter', () => ({ default: () => <div data-testid="newsletter" /> }));

import HomePage from '@/app/page';
import { screen } from '@testing-library/react';

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
  });

  it('renders all home sections', () => {
    render(<HomePage />);
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('stats')).toBeInTheDocument();
    expect(screen.getByTestId('categories')).toBeInTheDocument();
    expect(screen.getByTestId('featured')).toBeInTheDocument();
    expect(screen.getByTestId('benefits')).toBeInTheDocument();
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
    expect(screen.getByTestId('faq')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter')).toBeInTheDocument();
  });
});

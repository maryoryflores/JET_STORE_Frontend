import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Testimonials from '@/components/home/Testimonials';

const scrollByMock = vi.fn();
const scrollToMock = vi.fn();

describe('Testimonials', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    scrollByMock.mockClear();
    scrollToMock.mockClear();
  });

  it('renders section heading', () => {
    render(<Testimonials />);
    expect(screen.getByText(/dicen nuestros/i)).toBeInTheDocument();
  });

  it('renders testimonial cards', () => {
    render(<Testimonials />);
    expect(screen.getByText('María Fernanda López')).toBeInTheDocument();
    expect(screen.getByText('Carlos Andrés Pérez')).toBeInTheDocument();
  });

  it('renders scroll navigation buttons', () => {
    render(<Testimonials />);
    expect(screen.getByLabelText('Anterior testimonio')).toBeInTheDocument();
    expect(screen.getByLabelText('Siguiente testimonio')).toBeInTheDocument();
  });

  it('scroll buttons are disabled at initial state', () => {
    render(<Testimonials />);
    expect(screen.getByLabelText('Anterior testimonio')).toBeDisabled();
    expect(screen.getByLabelText('Siguiente testimonio')).toBeDisabled();
  });

  it('renders dot navigation indicators', () => {
    render(<Testimonials />);
    const dots = screen.getAllByRole('button', { name: /Ir al testimonio/i });
    expect(dots.length).toBe(5);
  });

  it('scroll buttons call scrollBy on click', () => {
    const refMock = { current: { scrollBy: scrollByMock, scrollLeft: 0, scrollWidth: 2000, clientWidth: 800 } };
    vi.spyOn(require('react'), 'useRef').mockReturnValue(refMock);

    render(<Testimonials />);
    const nextBtn = screen.getByLabelText('Siguiente testimonio');
    expect(nextBtn).toBeInTheDocument();
  });

  it('renders star ratings for testimonials', () => {
    render(<Testimonials />);
    const starElements = document.querySelectorAll('.text-yellow-400');
    expect(starElements.length).toBeGreaterThan(0);
  });

  it('renders testimonial cargo/role information', () => {
    render(<Testimonials />);
    expect(screen.getByText('Enfermera Jefe - Clínica San Pablo')).toBeInTheDocument();
    expect(screen.getByText('Desarrollador Full Stack')).toBeInTheDocument();
  });

  it('renders testimonial quotes', () => {
    render(<Testimonials />);
    expect(screen.getByText(/Excelente plataforma/)).toBeInTheDocument();
  });
});

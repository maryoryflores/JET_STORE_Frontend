import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '@/components/home/FAQ';

describe('FAQ', () => {
  it('renders section heading', () => {
    render(<FAQ />);
    expect(screen.getByText(/Preguntas Frecuentes/i)).toBeInTheDocument();
  });

  it('renders FAQ questions', () => {
    render(<FAQ />);
    expect(screen.getByText(/funciona JetStore/i)).toBeInTheDocument();
    expect(screen.getByText(/recibo mis libros/i)).toBeInTheDocument();
  });

  it('renders categories', () => {
    render(<FAQ />);
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('expands an FAQ item when clicked', () => {
    render(<FAQ />);
    const question = screen.getByText(/funciona JetStore/i);
    fireEvent.click(question);

    expect(screen.getByText(/plataforma de venta de libros digitales/i)).toBeInTheDocument();
  });

  it('collapses an expanded FAQ item when clicked again', () => {
    render(<FAQ />);
    const question = screen.getByText(/funciona JetStore/i);
    fireEvent.click(question);
    expect(screen.getByText(/plataforma de venta de libros digitales/i)).toBeInTheDocument();

    fireEvent.click(question);
    expect(screen.queryByText(/plataforma de venta de libros digitales/i)).not.toBeInTheDocument();
  });

  it('sets aria-expanded to true when FAQ is open', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    const firstFaq = buttons.find((b) => b.getAttribute('aria-expanded') !== null)!;
    expect(firstFaq.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(firstFaq);
    expect(firstFaq.getAttribute('aria-expanded')).toBe('true');
  });

  it('shows different FAQ answer when switching between questions', () => {
    render(<FAQ />);
    const questions = screen.getAllByRole('button');
    const faqButtons = questions.filter((q) => q.getAttribute('aria-expanded') !== null);

    fireEvent.click(faqButtons[0]);
    const firstAnswer = screen.queryByText(/plataforma de venta de libros digitales/i);
    expect(firstAnswer).toBeInTheDocument();

    fireEvent.click(faqButtons[1]);
    expect(firstAnswer).not.toBeInTheDocument();
  });
});

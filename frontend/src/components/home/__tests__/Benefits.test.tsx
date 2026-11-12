import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Benefits from '@/components/home/Benefits';

describe('Benefits', () => {
  it('renders section heading', () => {
    render(<Benefits />);
    expect(screen.getByText(/elegir JetStore/i)).toBeInTheDocument();
  });

  it('renders benefit cards', () => {
    render(<Benefits />);
    expect(screen.getByText('Entrega Inmediata')).toBeInTheDocument();
    expect(screen.getByText('Pago Seguro')).toBeInTheDocument();
    expect(screen.getByText('Acceso Permanente')).toBeInTheDocument();
    expect(screen.getByText('Actualizaciones Gratis')).toBeInTheDocument();
    expect(screen.getByText('Multi-dispositivo')).toBeInTheDocument();
    expect(screen.getByText('Garantía de Satisfacción')).toBeInTheDocument();
  });
});

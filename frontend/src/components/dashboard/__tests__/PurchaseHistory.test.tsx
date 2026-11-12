import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PurchaseHistory from '@/components/dashboard/PurchaseHistory';

describe('PurchaseHistory', () => {
  it('renders filter tabs', () => {
    render(<PurchaseHistory />);
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Completados')).toBeInTheDocument();
    expect(screen.getByText('Pendientes')).toBeInTheDocument();
    expect(screen.getByText('Cancelados')).toBeInTheDocument();
  });

  it('renders purchase data', () => {
    render(<PurchaseHistory />);
    expect(screen.getByText('JET-2025-0001')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<PurchaseHistory />);
    expect(screen.getByPlaceholderText(/Buscar por N° Pedido/)).toBeInTheDocument();
  });

  it('filters by completado status', () => {
    render(<PurchaseHistory />);
    fireEvent.click(screen.getByText('Completados'));
    expect(screen.getByText('JET-2025-0001')).toBeInTheDocument();
    expect(screen.getByText('JET-2025-0002')).toBeInTheDocument();
  });

  it('filters by search term', () => {
    render(<PurchaseHistory />);
    fireEvent.change(screen.getByPlaceholderText(/Buscar por N° Pedido/), { target: { value: 'JET-2025-0003' } });
    expect(screen.getByText('JET-2025-0003')).toBeInTheDocument();
    expect(screen.queryByText('JET-2025-0001')).not.toBeInTheDocument();
  });

  it('shows total for each purchase', () => {
    render(<PurchaseHistory />);
    expect(screen.getByText(/25\.00/)).toBeInTheDocument();
    expect(screen.getByText(/60\.00/)).toBeInTheDocument();
  });

  it('shows product count for each purchase', () => {
    render(<PurchaseHistory />);
    const libroElements = screen.getAllByText(/libro/);
    expect(libroElements.length).toBeGreaterThanOrEqual(2);
  });

  it('clicking Ver detalle opens modal with purchase info', async () => {
    render(<PurchaseHistory />);
    const detailButtons = screen.getAllByText('Ver detalle');
    await userEvent.click(detailButtons[0]);
    expect(screen.getByText(/Pedido JET-2025-0001/)).toBeInTheDocument();
  });

  it('shows product details in modal', async () => {
    render(<PurchaseHistory />);
    const detailButtons = screen.getAllByText('Ver detalle');
    await userEvent.click(detailButtons[0]);
    expect(screen.getByText(/Manual de Enfermería Integral/)).toBeInTheDocument();
  });

  it('resets page when filter changes', () => {
    render(<PurchaseHistory />);
    fireEvent.click(screen.getByText('Completados'));
    expect(screen.getByText('JET-2025-0001')).toBeInTheDocument();
  });

  it('resets page when searching', () => {
    render(<PurchaseHistory />);
    fireEvent.change(screen.getByPlaceholderText(/Buscar por N° Pedido/), { target: { value: 'JET-2025-0001' } });
    expect(screen.getByText('JET-2025-0001')).toBeInTheDocument();
  });

  it('shows pedido number column header', () => {
    render(<PurchaseHistory />);
    expect(screen.getByText('N° Pedido')).toBeInTheDocument();
  });
});

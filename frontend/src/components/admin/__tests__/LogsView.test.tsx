import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LogsView from '@/components/admin/LogsView';

describe('LogsView', () => {
  it('renders search input', () => {
    render(<LogsView />);
    expect(screen.getByPlaceholderText('Buscar en logs...')).toBeInTheDocument();
  });

  it('renders log entries', () => {
    render(<LogsView />);
    expect(screen.getByText('Inicio de sesión')).toBeInTheDocument();
    expect(screen.getByText('Creación de producto')).toBeInTheDocument();
  });

  it('renders date filters', () => {
    render(<LogsView />);
    expect(screen.getByText(/Desde/)).toBeInTheDocument();
    expect(screen.getByText(/Hasta/)).toBeInTheDocument();
  });

  it('filters logs by search term', () => {
    render(<LogsView />);
    const searchInput = screen.getByPlaceholderText('Buscar en logs...');
    fireEvent.change(searchInput, { target: { value: 'María' } });
    expect(screen.getByText('Compra realizada')).toBeInTheDocument();
    expect(screen.queryByText('Creación de producto')).not.toBeInTheDocument();
  });

  it('filters logs by action type', () => {
    render(<LogsView />);
    const searchInput = screen.getByPlaceholderText('Buscar en logs...');
    fireEvent.change(searchInput, { target: { value: 'Registro' } });
    expect(screen.getByText('Nuevo usuario registrado')).toBeInTheDocument();
    expect(screen.queryByText('Inicio de sesión')).not.toBeInTheDocument();
  });

  it('filters logs by IP address', () => {
    render(<LogsView />);
    const searchInput = screen.getByPlaceholderText('Buscar en logs...');
    fireEvent.change(searchInput, { target: { value: '10.0.0.42' } });
    expect(screen.getByText('Carlos Pérez')).toBeInTheDocument();
    expect(screen.queryByText('Creación de producto')).not.toBeInTheDocument();
  });

  it('filters logs by date from', () => {
    render(<LogsView />);
    const dateInputs = document.querySelectorAll('input[type="date"]');
    fireEvent.change(dateInputs[0], { target: { value: '2025-06-30' } });
    expect(screen.getByText('Inicio de sesión')).toBeInTheDocument();
    expect(screen.getByText('Creación de producto')).toBeInTheDocument();
    expect(screen.queryByText('Eliminación de categoría')).not.toBeInTheDocument();
  });

  it('updates dateFrom input value', () => {
    render(<LogsView />);
    const dateInputs = document.querySelectorAll('input[type="date"]');
    fireEvent.change(dateInputs[0], { target: { value: '2025-06-28' } });
    expect(dateInputs[0]).toHaveValue('2025-06-28');
  });

  it('updates dateTo input value', () => {
    render(<LogsView />);
    const dateInputs = document.querySelectorAll('input[type="date"]');
    fireEvent.change(dateInputs[1], { target: { value: '2025-06-30' } });
    expect(dateInputs[1]).toHaveValue('2025-06-30');
  });

  it('shows empty message when no logs match', () => {
    render(<LogsView />);
    const searchInput = screen.getByPlaceholderText('Buscar en logs...');
    fireEvent.change(searchInput, { target: { value: 'nonexistentxyz' } });
    expect(screen.getByText('No se encontraron logs')).toBeInTheDocument();
  });

  it('renders all log columns', () => {
    render(<LogsView />);
    expect(screen.getByText('Fecha')).toBeInTheDocument();
    expect(screen.getByText('Usuario')).toBeInTheDocument();
    expect(screen.getByText('Acción')).toBeInTheDocument();
    expect(screen.getByText('Detalle')).toBeInTheDocument();
    expect(screen.getByText('IP')).toBeInTheDocument();
  });

  it('displays user names in table', () => {
    render(<LogsView />);
    const rows = screen.getAllByText('Admin');
    expect(rows.length).toBeGreaterThanOrEqual(1);
  });

  it('displays IP addresses in table', () => {
    render(<LogsView />);
    const ips = screen.getAllByText('192.168.1.1');
    expect(ips.length).toBeGreaterThanOrEqual(1);
  });
});

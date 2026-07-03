'use client';

import { useState, useMemo } from 'react';
import { pedidos } from '@/data/pedidos';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import { formatDate, formatCurrency } from '@/utils/format';
import { Pedido } from '@/types';
import { HiSearch } from 'react-icons/hi';

const STATUS_OPTIONS = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'completado', label: 'Completado' },
  { value: 'cancelado', label: 'Cancelado' },
  { value: 'reembolsado', label: 'Reembolsado' },
];

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  completado: 'success',
  pendiente: 'warning',
  cancelado: 'danger',
  reembolsado: 'info',
};

export default function OrdersTable() {
  const [search, setSearch] = useState('');
  const [localPedidos, setLocalPedidos] = useState(pedidos);

  const filtered = useMemo(() => {
    if (!search.trim()) return localPedidos;
    const q = search.toLowerCase();
    return localPedidos.filter(
      (p) =>
        p.numeroPedido.toLowerCase().includes(q) ||
        p.cliente.toLowerCase().includes(q)
    );
  }, [search, localPedidos]);

  const handleStatusChange = (id: number, estado: string) => {
    setLocalPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado } : p))
    );
  };

  const columns = [
    { key: 'numeroPedido', header: 'N° Pedido' },
    { key: 'cliente', header: 'Cliente' },
    {
      key: 'fecha',
      header: 'Fecha',
      render: (item: Pedido) => formatDate(item.fecha),
    },
    {
      key: 'total',
      header: 'Total',
      render: (item: Pedido) => formatCurrency(item.total),
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (item: Pedido) => (
        <Badge variant={STATUS_VARIANT[item.estado] ?? 'default'}>
          {item.estado.charAt(0).toUpperCase() + item.estado.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (item: Pedido) => (
        <Select
          value={item.estado}
          onChange={(e) => handleStatusChange(item.id, e.target.value)}
          options={STATUS_OPTIONS}
          className="w-36"
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="w-full max-w-xs">
        <Input
          placeholder="Buscar pedidos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<HiSearch />}
        />
      </div>
      <Table columns={columns} data={filtered} keyExtractor={(item) => item.id} emptyMessage="No se encontraron pedidos" />
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { compras } from '@/data/compras';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Pagination from '@/components/ui/Pagination';
import Modal from '@/components/ui/Modal';
import { formatDate, formatCurrency } from '@/utils/format';
import { Compra } from '@/types';
import { HiSearch, HiEye } from 'react-icons/hi';

type FilterTab = 'todos' | 'completado' | 'pendiente' | 'cancelado';

const FILTERS: { key: FilterTab; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'completado', label: 'Completados' },
  { key: 'pendiente', label: 'Pendientes' },
  { key: 'cancelado', label: 'Cancelados' },
];

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'danger'> = {
  completado: 'success',
  pendiente: 'warning',
  cancelado: 'danger',
};

const ITEMS_PER_PAGE = 5;

export default function PurchaseHistory() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('todos');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Compra | null>(null);

  const filtered = useMemo(() => {
    let result = compras;
    if (activeFilter !== 'todos') {
      result = result.filter((c) => c.estado === activeFilter);
    }
    if (search.trim()) {
      result = result.filter((c) =>
        c.numeroPedido.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [activeFilter, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const columns = [
    { key: 'numeroPedido', header: 'N° Pedido' },
    {
      key: 'fecha',
      header: 'Fecha',
      render: (item: Compra) => formatDate(item.fecha),
    },
    {
      key: 'productos',
      header: 'Productos',
      render: (item: Compra) => (
        <span>{item.productos.reduce((s, p) => s + p.cantidad, 0)} libro(s)</span>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      render: (item: Compra) => formatCurrency(item.total),
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (item: Compra) => (
        <Badge variant={STATUS_VARIANT[item.estado] ?? 'default'}>
          {item.estado.charAt(0).toUpperCase() + item.estado.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'accion',
      header: 'Acción',
      render: (item: Compra) => (
        <Button size="sm" variant="ghost" icon={<HiEye />} onClick={() => setSelected(item)}>
          Ver detalle
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              type="button"
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === f.key
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="w-full max-w-xs">
          <Input
            placeholder="Buscar por N° Pedido..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            icon={<HiSearch />}
          />
        </div>
      </div>
      <Table columns={columns} data={paginated} keyExtractor={(item) => item.id} emptyMessage="No se encontraron compras" />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Pedido ${selected?.numeroPedido}`} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold text-gray-700">Fecha:</span> {formatDate(selected.fecha)}</div>
              <div><span className="font-semibold text-gray-700">Estado:</span> <Badge variant={STATUS_VARIANT[selected.estado]}>{selected.estado}</Badge></div>
              <div><span className="font-semibold text-gray-700">Método de pago:</span> {selected.metodoPago}</div>
              <div><span className="font-semibold text-gray-700">Dirección:</span> {selected.direccionEnvio}</div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Productos</h4>
              <div className="space-y-2">
                {selected.productos.map((p, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{p.titulo} x{p.cantidad}</span>
                    <span>{formatCurrency(p.precio * p.cantidad)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(selected.total)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

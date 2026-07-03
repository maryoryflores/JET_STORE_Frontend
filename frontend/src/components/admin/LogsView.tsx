'use client';

import { useState, useMemo } from 'react';
import Table from '@/components/ui/Table';
import Input from '@/components/ui/Input';
import { formatDate } from '@/utils/format';
import { HiSearch } from 'react-icons/hi';

interface LogEntry {
  id: number;
  fecha: string;
  usuario: string;
  accion: string;
  detalle: string;
  ip: string;
}

const MOCK_LOGS: LogEntry[] = [
  { id: 1, fecha: '2025-06-30T10:30:00', usuario: 'Admin', accion: 'Inicio de sesión', detalle: 'Acceso al panel admin', ip: '192.168.1.1' },
  { id: 2, fecha: '2025-06-30T11:00:00', usuario: 'Admin', accion: 'Creación de producto', detalle: 'Nuevo libro: Cloud Computing con AWS', ip: '192.168.1.1' },
  { id: 3, fecha: '2025-06-30T12:15:00', usuario: 'María López', accion: 'Compra realizada', detalle: 'Pedido JET-2025-0004', ip: '10.0.0.25' },
  { id: 4, fecha: '2025-06-29T09:00:00', usuario: 'Admin', accion: 'Actualización de usuario', detalle: 'Rol cambiado: usuario #3 a admin', ip: '192.168.1.1' },
  { id: 5, fecha: '2025-06-29T14:30:00', usuario: 'Carlos Pérez', accion: 'Registro', detalle: 'Nuevo usuario registrado', ip: '10.0.0.42' },
  { id: 6, fecha: '2025-06-28T08:00:00', usuario: 'Admin', accion: 'Eliminación de categoría', detalle: 'Categoría #7 eliminada', ip: '192.168.1.1' },
];

export default function LogsView() {
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = useMemo(() => {
    let result = MOCK_LOGS;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.usuario.toLowerCase().includes(q) ||
          l.accion.toLowerCase().includes(q) ||
          l.detalle.toLowerCase().includes(q) ||
          l.ip.includes(q)
      );
    }
    if (dateFrom) {
      result = result.filter((l) => new Date(l.fecha) >= new Date(dateFrom));
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      result = result.filter((l) => new Date(l.fecha) <= to);
    }
    return result;
  }, [search, dateFrom, dateTo]);

  const columns = [
    {
      key: 'fecha',
      header: 'Fecha',
      render: (item: LogEntry) => formatDate(item.fecha.split('T')[0]),
    },
    { key: 'usuario', header: 'Usuario' },
    { key: 'accion', header: 'Acción' },
    { key: 'detalle', header: 'Detalle' },
    { key: 'ip', header: 'IP' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-full max-w-xs">
          <Input
            placeholder="Buscar en logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<HiSearch />}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Desde:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Hasta:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          />
        </div>
      </div>
      <Table columns={columns} data={filtered} keyExtractor={(item) => item.id} emptyMessage="No se encontraron logs" />
    </div>
  );
}

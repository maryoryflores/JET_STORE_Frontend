'use client';

import { pagos } from '@/data/pedidos';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import { formatDate, formatCurrency } from '@/utils/format';
import { Pago } from '@/types';

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  completado: 'success',
  pendiente: 'warning',
  cancelado: 'danger',
  reembolsado: 'info',
};

export default function PaymentsTable() {
  const columns = [
    { key: 'numeroPedido', header: 'N° Pedido' },
    { key: 'metodo', header: 'Método' },
    {
      key: 'monto',
      header: 'Monto',
      render: (item: Pago) => formatCurrency(item.monto),
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (item: Pago) => (
        <Badge variant={STATUS_VARIANT[item.estado] ?? 'default'}>
          {item.estado.charAt(0).toUpperCase() + item.estado.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'fecha',
      header: 'Fecha',
      render: (item: Pago) => formatDate(item.fecha),
    },
  ];

  return (
    <Table columns={columns} data={pagos} keyExtractor={(item) => item.id} emptyMessage="No se encontraron pagos" />
  );
}

'use client';

import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import { SalesChart, TopProductsChart } from '@/components/admin/Charts';
import { formatCurrency } from '@/utils/format';
import { reportesClientes } from '@/data/pedidos';
import { ReporteCliente } from '@/types';
import { HiDownload } from 'react-icons/hi';

export default function ReportsView() {
  const clientColumns = [
    { key: 'cliente', header: 'Cliente' },
    { key: 'email', header: 'Email' },
    {
      key: 'compras',
      header: 'Compras',
    },
    {
      key: 'totalGastado',
      header: 'Total Gastado',
      render: (item: ReporteCliente) => formatCurrency(item.totalGastado),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button icon={<HiDownload />} onClick={() => alert('Descarga de reporte (simulación)')}>
          Descargar Reporte
        </Button>
      </div>
      <SalesChart />
      <TopProductsChart />
      <Card>
        <h3 className="text-base font-semibold text-gray-900 mb-4">Clientes Frecuentes</h3>
        <Table columns={clientColumns} data={reportesClientes} keyExtractor={(item) => reportesClientes.indexOf(item)} emptyMessage="Sin datos" />
      </Card>
    </div>
  );
}

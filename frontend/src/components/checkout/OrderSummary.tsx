'use client';

import { CarritoItem } from '@/types';
import { formatCurrency } from '@/utils/format';
import Button from '@/components/ui/Button';

interface OrderSummaryProps {
  items: CarritoItem[];
  subtotal: number;
  metodo: string;
  onConfirm: () => void;
  loading: boolean;
}

const methodLabels: Record<string, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  yape: 'Yape',
  plin: 'Plin',
  transferencia: 'Transferencia Bancaria',
  paypal: 'PayPal',
};

export default function OrderSummary({ items, subtotal, metodo, onConfirm, loading }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
      <h3 className="text-lg font-bold text-gray-900">Resumen de Compra</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.itemId} className="flex items-center justify-between text-sm">
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-medium truncate">{item.titulo}</p>
              <p className="text-gray-500 text-xs">Cant: {item.cantidad} x {formatCurrency(item.precioUnitario)}</p>
            </div>
            <span className="font-medium text-gray-900 ml-4">
              {formatCurrency(item.subtotal)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Envío</span>
          <span className="font-medium text-green-600">Gratis</span>
        </div>
        <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-[#DC2626]">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      {metodo && (
        <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-500">Método de Pago</span>
          <span className="font-medium text-gray-900">{methodLabels[metodo] || metodo}</span>
        </div>
      )}

      <Button
        fullWidth
        size="lg"
        onClick={onConfirm}
        loading={loading}
        disabled={!metodo || items.length === 0}
      >
        Confirmar Compra
      </Button>
    </div>
  );
}

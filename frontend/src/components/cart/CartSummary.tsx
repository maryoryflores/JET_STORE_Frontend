'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/format';
import Button from '@/components/ui/Button';

interface CartSummaryProps {
  subtotal: number;
}

export default function CartSummary({ subtotal }: CartSummaryProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Resumen del Pedido</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Descuento</span>
          <span className="font-medium text-green-600">S/ 0.00</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-[#DC2626]">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <Button fullWidth size="lg" onClick={() => router.push('/checkout')}>
        Proceder al Pago
      </Button>

      <Link
        href="/catalogo"
        className="block text-center text-sm text-gray-500 hover:text-[#DC2626] transition-colors"
      >
        Continuar Comprando
      </Link>
    </div>
  );
}

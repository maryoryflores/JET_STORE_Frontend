'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [orderNumber] = useState(() => {
    const num = Math.floor(100000 + Math.random() * 900000);
    return `JET-${num}`;
  });
  const [date] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  });
  const [paymentMethod] = useState(() => {
    return 'Visa **** 4242';
  });

  useEffect(() => {
    const fromCheckout = sessionStorage.getItem('jetstore-checkout-completed');
    const mpPagoId = sessionStorage.getItem('jetstore-mp-pagoId');
    const params = new URLSearchParams(window.location.search);
    const mpStatus = params.get('collection_status') || params.get('status');
    const mpPaymentId = params.get('payment_id') || params.get('collection_id');

    // Si vuelve de Mercado Pago con approved, confirmar
    if (mpPagoId && mpStatus === 'approved') {
      import('@/services/payment.service').then(({ paymentService }) => {
        paymentService.confirmarMercadoPago(Number(mpPagoId), mpPaymentId || undefined)
          .finally(() => {
            sessionStorage.removeItem('jetstore-mp-pagoId');
            sessionStorage.setItem('jetstore-checkout-completed', 'true');
          });
      });
      return;
    }

    if (!fromCheckout && !mpPagoId) {
      router.replace('/');
    } else if (fromCheckout) {
      sessionStorage.removeItem('jetstore-checkout-completed');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <OrderConfirmation
          orderNumber={orderNumber}
          date={date}
          paymentMethod={paymentMethod}
        />
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="/dashboard/compras"
            className="px-6 py-3 bg-[#111111] text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Ir a Mis Compras
          </Link>
          <Link
            href="/catalogo"
            className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}

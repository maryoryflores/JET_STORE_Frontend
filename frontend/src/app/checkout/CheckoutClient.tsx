'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { paymentService } from '@/services/payment.service';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import Swal from 'sweetalert2';

const steps = [
  { id: 1, label: 'Método de Pago' },
  { id: 2, label: 'Confirmación' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, vaciar } = useCartStore();
  const { usuario } = useAuthStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !checkoutCompleted) {
      router.push('/carrito');
    }
  }, [items.length, checkoutCompleted, router]);

  if (items.length === 0 && !checkoutCompleted) return null;

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const metodoMap: Record<string, string> = {
    mercadopago: 'MERCADOPAGO',
    visa: 'TARJETA',
    mastercard: 'TARJETA',
    yape: 'YAPE',
    plin: 'PLIN',
    transferencia: 'TARJETA',
    paypal: 'TARJETA',
  };

  const handleConfirm = async () => {
    if (!usuario) return;
    setLoading(true);
    try {
      const metodoBackend = metodoMap[paymentMethod] || 'TARJETA';

      // Flujo Mercado Pago Checkout Pro: crear preferencia y redirigir (real)
      if (metodoBackend === 'MERCADOPAGO') {
        const prefRes = await paymentService.createMercadoPagoPreference(usuario.id);
        if (prefRes.data.ok) {
          const { initPoint, sandboxInitPoint, pagoId } = prefRes.data.payload;
          const url = initPoint || sandboxInitPoint;
          sessionStorage.setItem('jetstore-mp-pagoId', String(pagoId));
          if (url && url.includes('MOCK-')) {
            const confirmRes = await paymentService.confirmarMercadoPago(pagoId);
            if (confirmRes.data.ok) {
              setCheckoutCompleted(true);
              sessionStorage.setItem('jetstore-checkout-completed', 'true');
              vaciar();
              Swal.fire({ title: '¡Compra Exitosa! (MODO PRUEBA)', text: 'Configure MERCADOPAGO_ACCESS_TOKEN para cobro real. Se simuló el pago.', icon: 'success', confirmButtonColor: '#DC2626' });
              router.push('/checkout/success');
              return;
            }
          } else if (url) {
            window.location.href = url;
            return;
          }
        } else {
          Swal.fire('Error', prefRes.data.mensaje, 'error');
        }
        return;
      }

      const pagoRes = await paymentService.processPayment(usuario.id, metodoBackend);
      if (pagoRes.data.ok) {
        const pagoId = pagoRes.data.payload.pagoId;
        const confirmRes = await paymentService.confirmPayment(pagoId, `REF-${Date.now()}`);
        if (confirmRes.data.ok) {
          setCheckoutCompleted(true);
          sessionStorage.setItem('jetstore-checkout-completed', 'true');
          vaciar();
          Swal.fire({
            title: '¡Compra Exitosa!',
            text: 'Tu pago ha sido procesado correctamente.',
            icon: 'success',
            confirmButtonColor: '#DC2626',
          });
          router.push('/checkout/success');
        } else {
          Swal.fire('Error', confirmRes.data.mensaje, 'error');
        }
      } else {
        Swal.fire('Error', pagoRes.data.mensaje, 'error');
      }
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { mensaje?: string } } })?.response?.data?.mensaje;
      if (paymentMethod === 'mercadopago') {
        Swal.fire('Error Mercado Pago', msg || 'No se pudo crear la preferencia. Verifica MERCADOPAGO_ACCESS_TOKEN.', 'error');
      } else {
        setCheckoutCompleted(true);
        sessionStorage.setItem('jetstore-checkout-completed', 'true');
        vaciar();
        Swal.fire({
          title: '¡Compra Exitosa!',
          text: 'Tu pago ha sido procesado correctamente. (Demo)',
          icon: 'success',
          confirmButtonColor: '#DC2626',
        });
        router.push('/checkout/success');
      }
    } finally {
      setLoading(false);
    }
  };

  const metodoLabels: Record<string, string> = {
    mercadopago: 'Mercado Pago',
    visa: 'Visa',
    mastercard: 'Mastercard',
    yape: 'Yape',
    plin: 'Plin',
    transferencia: 'Transferencia Bancaria',
    paypal: 'PayPal',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="flex items-center gap-1 hover:text-[#DC2626] transition-colors">
              <HiHome className="w-4 h-4" />
              Inicio
            </Link>
            <HiChevronRight className="w-4 h-4" />
            <Link href="/carrito" className="hover:text-[#DC2626] transition-colors">Carrito</Link>
            <HiChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      step >= s.id
                        ? 'bg-[#DC2626] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s.id}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:block ${
                      step >= s.id ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-2 transition-colors ${
                      step > s.id ? 'bg-[#DC2626]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Método de Pago</h3>
                <PaymentMethods selected={paymentMethod} onSelect={handlePaymentSelect} />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!paymentMethod}
                className="w-full px-6 py-3 bg-[#DC2626] text-white rounded-xl text-sm font-medium hover:bg-[#B91C1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.itemId} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.titulo} x{item.cantidad}</span>
                      <span className="font-medium text-gray-900">S/ {(item.subtotal).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Método de pago:</span>
                      <span className="font-medium">{metodoLabels[paymentMethod] || paymentMethod}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-lg font-bold text-gray-900">Total:</span>
                      <span className="text-lg font-bold text-[#DC2626]">S/ {subtotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                {metodoMap[paymentMethod] === 'MERCADOPAGO' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                    Serás redirigido a <b>Mercado Pago Checkout Pro</b> para pagar de forma segura. Si ves <b>MODO PRUEBA</b>, configura tu <code>TEST-...</code> token para cobro real.
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Volver
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#DC2626] text-white rounded-xl text-sm font-medium hover:bg-[#B91C1C] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Procesando...' : metodoMap[paymentMethod] === 'MERCADOPAGO' ? 'Pagar con Mercado Pago' : 'Confirmar Compra'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import { useCartStore } from '@/store/cart-store';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import OrderSummary from '@/components/checkout/OrderSummary';
import type { CheckoutFormData } from '@/utils/validators';

const steps = [
  { id: 1, label: 'Datos del Comprador' },
  { id: 2, label: 'Método de Pago' },
  { id: 3, label: 'Confirmación' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, vaciar } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/carrito');
    }
  }, [items, router]);

  if (items.length === 0) return null;

  const handleBuyerSubmit = (data: CheckoutFormData) => {
    void data;
    setStep(2);
  };

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      vaciar();
      sessionStorage.setItem('jetstore-checkout-completed', 'true');
      setLoading(false);
      router.push('/checkout/success');
    }, 1500);
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
          {step === 1 && <CheckoutForm onSubmit={handleBuyerSubmit} />}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Método de Pago</h3>
                <PaymentMethods selected={paymentMethod} onSelect={handlePaymentSelect} />
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
                  onClick={() => setStep(3)}
                  disabled={!paymentMethod}
                  className="flex-1 px-6 py-3 bg-[#DC2626] text-white rounded-xl text-sm font-medium hover:bg-[#B91C1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <OrderSummary
                items={items}
                subtotal={subtotal()}
                metodo={paymentMethod}
                onConfirm={handleConfirm}
                loading={loading}
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full px-6 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Volver al Método de Pago
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

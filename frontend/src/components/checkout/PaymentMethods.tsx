'use client';

import { cn } from '@/utils/cn';
import { HiCreditCard } from 'react-icons/hi';

interface PaymentMethodsProps {
  selected: string;
  onSelect: (method: string) => void;
}

const methods = [
  { id: 'mercadopago', label: 'Mercado Pago', icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" fill="#00B1EA" />
      <text x="12" y="14" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">MP</text>
    </svg>
  )},
  { id: 'visa', label: 'Visa', icon: HiCreditCard },
  { id: 'mastercard', label: 'Mastercard', icon: HiCreditCard },
  { id: 'yape', label: 'Yape', icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  )},
  { id: 'plin', label: 'Plin', icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  )},
  { id: 'transferencia', label: 'Transferencia Bancaria', icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M12 6v12M8 10l4-4 4 4" />
    </svg>
  )},
  { id: 'paypal', label: 'PayPal', icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
    </svg>
  )},
];

export default function PaymentMethods({ selected, onSelect }: PaymentMethodsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {methods.map((method) => {
        const Icon = method.icon;
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
              selected === method.id
                ? 'border-[#DC2626] bg-red-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
            )}
          >
            <Icon />
            <span className="text-xs font-medium text-gray-900 text-center leading-tight">
              {method.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

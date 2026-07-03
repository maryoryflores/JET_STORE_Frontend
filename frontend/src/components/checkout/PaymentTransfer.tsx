'use client';

import { useRef, useState } from 'react';
import { HiPhotograph } from 'react-icons/hi';
import { cn } from '@/utils/cn';

interface PaymentTransferProps {
  formData: {
    comprobante: File | null;
  };
  onChange: (field: string, value: File | null) => void;
  errors?: Record<string, string>;
}

export default function PaymentTransfer({ formData, onChange, errors = {} }: PaymentTransferProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onChange('comprobante', file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <path d="M12 6v12M8 10l4-4 4 4" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Transferencia Bancaria</p>
          <p className="text-xs text-gray-500">Depósito o transferencia a nuestra cuenta</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Banco</span>
          <span className="text-sm font-medium text-gray-900">Banco de Crédito BCP</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Titular</span>
          <span className="text-sm font-medium text-gray-900">JetStore Digital EIRL</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Número de Cuenta</span>
          <span className="text-sm font-medium text-gray-900">191-2345678-0-00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">CCI</span>
          <span className="text-sm font-medium text-gray-900">002-191-002345678000-00</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Comprobante de Pago</label>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors',
            dragOver ? 'border-[#DC2626] bg-red-50' : 'border-gray-200 hover:border-gray-300',
          )}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
          {formData.comprobante ? (
            <div className="flex items-center justify-center gap-2">
              <HiPhotograph className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">{formData.comprobante.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <HiPhotograph className="w-8 h-8 text-gray-300" />
              <p className="text-sm text-gray-500">Arrastra tu comprobante o haz clic para subirlo</p>
              <p className="text-xs text-gray-400">Solo imágenes (PNG, JPG)</p>
            </div>
          )}
        </div>
        {errors.comprobante && <p className="mt-1 text-xs text-red-500">{errors.comprobante}</p>}
      </div>
    </div>
  );
}

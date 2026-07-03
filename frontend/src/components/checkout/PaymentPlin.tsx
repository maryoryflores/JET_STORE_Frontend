'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { HiPhotograph } from 'react-icons/hi';
import { cn } from '@/utils/cn';
import Input from '@/components/ui/Input';

interface PaymentPlinProps {
  formData: {
    numeroOperacion: string;
    comprobante: File | null;
  };
  onChange: (field: string, value: string | File | null) => void;
  errors?: Record<string, string>;
}

export default function PaymentPlin({ formData, onChange, errors = {} }: PaymentPlinProps) {
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
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="3" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Plin</p>
          <p className="text-xs text-gray-500">Paga desde la app Plin</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <div className="flex flex-col items-center gap-1">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-blue-500 rounded-sm" />
              ))}
            </div>
            <span className="text-xs font-bold text-blue-600 mt-2">QR PLIN</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">+51 999 888 777</p>
          <p className="text-xs text-gray-500">JetStore Digital EIRL</p>
        </div>
      </div>

      <Input
        label="Número de Operación"
        value={formData.numeroOperacion}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('numeroOperacion', e.target.value)}
        placeholder="Ingresa el número de operación Plin"
        error={errors.numeroOperacion}
      />

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

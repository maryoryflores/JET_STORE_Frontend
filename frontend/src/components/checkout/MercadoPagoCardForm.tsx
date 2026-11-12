'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface MercadoPagoCardFormProps {
  onSubmit: (data: CardFormData) => void;
  onBack: () => void;
  loading: boolean;
  total: number;
}

export interface CardFormData {
  numeroTarjeta: string;
  nombreTitular: string;
  fechaExpiracion: string; // MM/YY
  cvv: string;
  email: string;
  dni: string;
  cuotas: string;
}

export default function MercadoPagoCardForm({ onSubmit, onBack, loading, total }: MercadoPagoCardFormProps) {
  const [form, setForm] = useState<CardFormData>({
    numeroTarjeta: '',
    nombreTitular: '',
    fechaExpiracion: '',
    cvv: '',
    email: '',
    dni: '',
    cuotas: '1',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CardFormData, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof CardFormData, string>> = {};
    const num = form.numeroTarjeta.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(num)) e.numeroTarjeta = 'Número inválido (13-19 dígitos)';
    if (form.nombreTitular.trim().length < 3) e.nombreTitular = 'Ingresa el nombre como figura en la tarjeta';
    if (!/^\d{2}\/\d{2}$/.test(form.fechaExpiracion)) e.fechaExpiracion = 'Formato MM/YY';
    else {
      const [mm, yy] = form.fechaExpiracion.split('/').map(Number);
      if (mm < 1 || mm > 12) e.fechaExpiracion = 'Mes inválido';
      else {
        const now = new Date();
        const exp = new Date(2000 + yy, mm - 1, 1);
        if (exp < new Date(now.getFullYear(), now.getMonth(), 1)) e.fechaExpiracion = 'Tarjeta vencida';
      }
    }
    if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = 'CVV inválido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
    if (!/^\d{8,12}$/.test(form.dni)) e.dni = 'DNI 8-12 dígitos';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const formatCard = (v: string) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 23);
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    if (d.length >= 3) return d.slice(0, 2) + '/' + d.slice(2);
    return d;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-7 bg-[#00B1EA] rounded flex items-center justify-center text-white text-xs font-bold">MP</div>
        <div>
          <h3 className="text-base font-bold text-gray-900">Pagar con Mercado Pago</h3>
          <p className="text-xs text-gray-500">Tarjeta de crédito / débito — Total S/ {total.toFixed(2)} PEN</p>
        </div>
      </div>

      <Input
        label="Número de tarjeta"
        placeholder="4111 1111 1111 1111"
        value={form.numeroTarjeta}
        onChange={(e) => setForm({ ...form, numeroTarjeta: formatCard(e.target.value) })}
        error={errors.numeroTarjeta}
        maxLength={23}
      />
      <Input
        label="Nombre del titular"
        placeholder="Como figura en la tarjeta"
        value={form.nombreTitular}
        onChange={(e) => setForm({ ...form, nombreTitular: e.target.value.toUpperCase() })}
        error={errors.nombreTitular}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Vencimiento (MM/YY)"
          placeholder="12/30"
          value={form.fechaExpiracion}
          onChange={(e) => setForm({ ...form, fechaExpiracion: formatExp(e.target.value) })}
          error={errors.fechaExpiracion}
          maxLength={5}
        />
        <Input
          label="CVV"
          placeholder="123"
          value={form.cvv}
          onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
          error={errors.cvv}
          maxLength={4}
        />
      </div>
      <Input
        label="Email"
        placeholder="tu@correo.com"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="DNI / Documento"
          placeholder="12345678"
          value={form.dni}
          onChange={(e) => setForm({ ...form, dni: e.target.value.replace(/\D/g, '').slice(0, 12) })}
          error={errors.dni}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cuotas</label>
          <select
            value={form.cuotas}
            onChange={(e) => setForm({ ...form, cuotas: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#DC2626]"
          >
            <option value="1">1 cuota — S/ {total.toFixed(2)}</option>
            <option value="3">3 cuotas — S/ {(total / 3).toFixed(2)} c/u</option>
            <option value="6">6 cuotas — S/ {(total / 6).toFixed(2)} c/u</option>
            <option value="12">12 cuotas — S/ {(total / 12).toFixed(2)} c/u</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
        <span>🔒</span> Pago seguro procesado por Mercado Pago. Usa tarjeta de prueba: <b>4111 1111 1111 1111</b> — cualquier fecha futura, CVV 123.
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onBack} disabled={loading} className="flex-1">
          Volver
        </Button>
        <Button type="submit" loading={loading} className="flex-1">
          Pagar S/ {total.toFixed(2)}
        </Button>
      </div>
    </form>
  );
}

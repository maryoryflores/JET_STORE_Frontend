'use client';

import { ChangeEvent } from 'react';
import { formatCardNumber, formatExpiryDate, getCardType } from '@/utils/format';
import Input from '@/components/ui/Input';

interface PaymentMastercardProps {
  formData: {
    nombreTitular: string;
    numeroTarjeta: string;
    fechaVen: string;
    cvv: string;
    telefono: string;
    documento: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export default function PaymentMastercard({ formData, onChange, errors = {} }: PaymentMastercardProps) {
  const handleCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    onChange('numeroTarjeta', formatted);
  };

  const handleExpiry = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    onChange('fechaVen', formatted);
  };

  const handleCvv = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    onChange('cvv', digits);
  };

  const cardType = getCardType(formData.numeroTarjeta);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-10 h-6 bg-yellow-500 rounded" />
        <span className="text-sm font-semibold text-yellow-600">Mastercard</span>
        {cardType && cardType !== 'unknown' && cardType !== 'mastercard' && (
          <span className="text-xs text-yellow-600 ml-auto">Tarjeta no Mastercard detectada</span>
        )}
      </div>

      <Input
        label="Nombre del Titular"
        value={formData.nombreTitular}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('nombreTitular', e.target.value)}
        placeholder="Como aparece en la tarjeta"
        error={errors.nombreTitular}
      />

      <Input
        label="Número de Tarjeta"
        value={formData.numeroTarjeta}
        onChange={handleCardNumber}
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        error={errors.numeroTarjeta}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Fecha de Vencimiento"
          value={formData.fechaVen}
          onChange={handleExpiry}
          placeholder="MM/AA"
          maxLength={5}
          error={errors.fechaVen}
        />
        <Input
          label="CVV"
          type="password"
          value={formData.cvv}
          onChange={handleCvv}
          placeholder="123"
          maxLength={4}
          error={errors.cvv}
        />
      </div>

      <Input
        label="Teléfono"
        value={formData.telefono}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('telefono', e.target.value)}
        placeholder="999 888 777"
        error={errors.telefono}
      />

      <Input
        label="Documento"
        value={formData.documento}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('documento', e.target.value)}
        placeholder="12345678"
        error={errors.documento}
      />
    </div>
  );
}

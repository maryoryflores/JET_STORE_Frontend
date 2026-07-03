'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormData } from '@/utils/validators';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  defaultValues?: Partial<CheckoutFormData>;
}

const documentoOptions = [
  { value: 'DNI', label: 'DNI' },
  { value: 'CE', label: 'Carné de Extranjería' },
  { value: 'RUC', label: 'RUC' },
];

export default function CheckoutForm({ onSubmit, defaultValues }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombres"
            placeholder="Ingresa tus nombres"
            error={errors.nombres?.message}
            {...register('nombres')}
          />
          <Input
            label="Apellidos"
            placeholder="Ingresa tus apellidos"
            error={errors.apellidos?.message}
            {...register('apellidos')}
          />
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="correo@ejemplo.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Teléfono"
            placeholder="999 888 777"
            error={errors.telefono?.message}
            {...register('telefono')}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Documento de Identidad</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Tipo de Documento"
            placeholder="Seleccionar"
            options={documentoOptions}
            error={errors.tipoDocumento?.message}
            {...register('tipoDocumento')}
          />
          <Input
            label="Número de Documento"
            placeholder="12345678"
            error={errors.documento?.message}
            {...register('documento')}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Dirección de Envío</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="País"
            placeholder="Perú"
            error={errors.pais?.message}
            {...register('pais')}
          />
          <Input
            label="Departamento"
            placeholder="Lima"
            error={errors.departamento?.message}
            {...register('departamento')}
          />
          <Input
            label="Ciudad"
            placeholder="Lima"
            error={errors.ciudad?.message}
            {...register('ciudad')}
          />
          <Input
            label="Código Postal"
            placeholder="15001"
            error={errors.codigoPostal?.message}
            {...register('codigoPostal')}
          />
          <div className="md:col-span-2">
            <Input
              label="Dirección"
              placeholder="Av. Principal 123, Urb. Las Flores"
              error={errors.direccion?.message}
              {...register('direccion')}
            />
          </div>
        </div>
      </div>

      <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
        Continuar al Pago
      </Button>
    </form>
  );
}

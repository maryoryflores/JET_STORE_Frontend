'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/utils/validators';
import { useAuthStore } from '@/store/auth-store';
import { usuarios } from '@/data/usuarios';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';

export default function ProfileForm() {
  const { usuario, setUsuario } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nombres: usuario?.nombres ?? '',
      apellidos: usuario?.apellidos ?? '',
      email: usuario?.email ?? '',
      telefono: usuario?.telefono ?? '',
      documento: usuario?.documento ?? '',
      pais: usuario?.pais ?? '',
      departamento: usuario?.departamento ?? '',
      ciudad: usuario?.ciudad ?? '',
      direccion: usuario?.direccion ?? '',
      codigoPostal: usuario?.codigoPostal ?? '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const updated = usuarios.find((u) => u.id === usuario?.id);
    if (updated) {
      const merged = { ...updated, ...data };
      setUsuario(merged);
      setToast({ visible: true, message: 'Perfil actualizado correctamente', type: 'success' });
    } else {
      setToast({ visible: true, message: 'Error al actualizar el perfil', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input id="nombres" label="Nombres" error={errors.nombres?.message} {...register('nombres')} />
          <Input id="apellidos" label="Apellidos" error={errors.apellidos?.message} {...register('apellidos')} />
          <Input id="email" label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input id="telefono" label="Teléfono" error={errors.telefono?.message} {...register('telefono')} />
          <Input id="documento" label="Documento" error={errors.documento?.message} {...register('documento')} />
          <Input id="pais" label="País" error={errors.pais?.message} {...register('pais')} />
          <Input id="departamento" label="Departamento" error={errors.departamento?.message} {...register('departamento')} />
          <Input id="ciudad" label="Ciudad" error={errors.ciudad?.message} {...register('ciudad')} />
        </div>
        <Input id="direccion" label="Dirección" error={errors.direccion?.message} {...register('direccion')} />
        <Input id="codigoPostal" label="Código Postal" error={errors.codigoPostal?.message} {...register('codigoPostal')} />
        <div className="flex justify-end">
          <Button type="submit" loading={loading}>
            Guardar Cambios
          </Button>
        </div>
      </form>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </>
  );
}

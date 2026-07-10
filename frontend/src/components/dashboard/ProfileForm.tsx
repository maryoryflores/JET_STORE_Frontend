'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/utils/validators';
import { useAuthStore } from '@/store/auth-store';
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
      nombreUsuario: usuario?.nombreUsuario ?? '',
      correo: usuario?.correo ?? '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    if (usuario) {
      setUsuario({ ...usuario, ...data });
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
          <Input id="nombreUsuario" label="Nombre de Usuario" error={errors.nombreUsuario?.message} {...register('nombreUsuario')} />
          <Input id="correo" label="Correo Electrónico" type="email" error={errors.correo?.message} {...register('correo')} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" loading={loading}>
            Guardar Cambios
          </Button>
        </div>
      </form>
      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </>
  );
}

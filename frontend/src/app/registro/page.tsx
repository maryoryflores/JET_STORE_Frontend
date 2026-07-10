'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { registerSchema, RegisterFormData } from '@/utils/validators';
import { useAuthStore } from '@/store/auth-store';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiUser } from 'react-icons/hi';

export default function RegisterPage() {
  const router = useRouter();
  const registerUser = useAuthStore((s) => s.register);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const result = await registerUser({
        nombreUsuario: data.nombreUsuario,
        correo: data.correo,
        password: data.password,
      });
      if (result.success) {
        setToast({ visible: true, message: 'Cuenta creada exitosamente', type: 'success' });
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setToast({ visible: true, message: result.error || 'Error al crear la cuenta', type: 'error' });
      }
    } catch {
      setToast({ visible: true, message: 'Error al conectar con el servidor', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#DC2626] rounded-xl mb-4">
              <span className="text-white text-2xl font-bold">J</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Crear Cuenta</h1>
            <p className="text-gray-500 text-sm mt-1">Regístrate en JetStore</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="nombreUsuario"
              label="Nombre de Usuario"
              placeholder="juanperez"
              icon={<HiUser className="w-5 h-5" />}
              error={errors.nombreUsuario?.message}
              {...register('nombreUsuario')}
            />

            <Input
              id="correo"
              label="Correo Electrónico"
              type="email"
              placeholder="tu@correo.com"
              icon={<HiMail className="w-5 h-5" />}
              error={errors.correo?.message}
              {...register('correo')}
            />

            <div className="relative">
              <Input
                id="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                icon={<HiLockClosed className="w-5 h-5" />}
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                id="confirmPassword"
                label="Confirmar Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repite tu contraseña"
                icon={<HiLockClosed className="w-5 h-5" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
              </button>
            </div>

            <Button type="submit" fullWidth loading={loading}>
              Crear Cuenta
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link
              href="/login"
              className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { resetPasswordSchema, ResetPasswordFormData } from '@/utils/validators';
import { authService } from '@/services/auth.service';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { HiLockClosed, HiEye, HiEyeOff, HiCheckCircle } from 'react-icons/hi';

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError('');
    setLoading(true);
    try {
      await authService.restablecerPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setSuccess(true);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { mensaje?: string } } };
      setError(
        axiosErr.response?.data?.mensaje || 'No se pudo restablecer la contraseña. Intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const sinToken = !token;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
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
            <h1 className="text-2xl font-bold text-gray-900">Restablecer Contraseña</h1>
            <p className="text-gray-500 text-sm mt-1">Crea una nueva contraseña para tu cuenta</p>
          </div>

          {error && (
            <div className="mb-6">
              <Alert type="error" message={error} onClose={() => setError('')} />
            </div>
          )}

          {success ? (
            <div className="space-y-5">
              <div className="flex flex-col items-center text-center py-2 gap-3">
                <HiCheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-gray-700 text-sm">
                  Tu contraseña ha sido actualizada correctamente.
                </p>
              </div>
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center px-5 py-2.5 bg-[#DC2626] text-white font-semibold rounded-lg hover:bg-[#B91C1C] transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          ) : sinToken ? (
            <Alert type="error" message="El enlace de recuperación no es válido." />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="relative">
                <Input
                  id="password"
                  label="Nueva contraseña"
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
                  label="Confirmar nueva contraseña"
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
                Restablecer contraseña
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            <Link
              href="/login"
              className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors"
            >
              Volver a Iniciar Sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
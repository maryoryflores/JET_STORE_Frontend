'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/utils/validators';
import { authService } from '@/services/auth.service';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { HiMail, HiArrowLeft } from 'react-icons/hi';

export default function OlvidastePasswordClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError('');
    setLoading(true);
    try {
      await authService.solicitarRecuperacion(data.correo);
      setSuccess(true);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { mensaje?: string } } };
      setError(
        axiosErr.response?.data?.mensaje || 'Ocurrió un error al procesar la solicitud. Intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-900">¿Olvidaste tu contraseña?</h1>
            <p className="text-gray-500 text-sm mt-1">
              Te enviaremos un enlace para que puedas restablecerla
            </p>
          </div>

          {error && (
            <div className="mb-6">
              <Alert type="error" message={error} onClose={() => setError('')} />
            </div>
          )}

          {success ? (
            <div className="space-y-5">
              <Alert
                type="info"
                message="Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña."
              />
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center px-5 py-2.5 bg-[#DC2626] text-white font-semibold rounded-lg hover:bg-[#B91C1C] transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                id="correo"
                label="Correo Electrónico"
                type="email"
                placeholder="usuario@correo.com"
                icon={<HiMail className="w-5 h-5" />}
                error={errors.correo?.message}
                {...register('correo')}
              />

              <Button type="submit" fullWidth loading={loading}>
                Enviar enlace de recuperación
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors"
            >
              <HiArrowLeft className="w-4 h-4" />
              Volver a Iniciar Sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
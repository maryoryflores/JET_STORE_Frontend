'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { loginSchema, LoginFormData } from '@/utils/validators';
import { useAuthStore } from '@/store/auth-store';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { HiUser, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setLoading(true);
    try {
      const result = await login(data.nombreUsuario, data.password);
      if (result.success) {
        const user = useAuthStore.getState().usuario;
        if (user?.rol === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(result.error || 'Credenciales inválidas.');
      }
    } catch {
      setError('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const result = await login('invitado', 'invitado123');
      if (result.success) {
        Swal.fire({
          title: 'Modo Invitado',
          text: 'Puedes navegar el sitio, pero necesitas crear una cuenta para comprar.',
          icon: 'info',
          confirmButtonColor: '#DC2626',
        });
        router.push('/catalogo');
      } else {
        setError('No se pudo acceder como invitado.');
      }
    } catch {
      setError('Error al acceder como invitado.');
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
            <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
            <p className="text-gray-500 text-sm mt-1">Accede a tu cuenta JetStore</p>
          </div>

          {error && (
            <div className="mb-6">
              <Alert type="error" message={error} onClose={() => setError('')} />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="nombreUsuario"
              label="Nombre de Usuario"
              type="text"
              placeholder="Tu nombre de usuario"
              icon={<HiUser className="w-5 h-5" />}
              error={errors.nombreUsuario?.message}
              {...register('nombreUsuario')}
            />

            <div className="relative">
              <Input
                id="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
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

            <div className="flex justify-end -mt-2">
              <Link
                href="/recuperar-contrasena"
                className="text-sm text-[#DC2626] font-medium hover:text-[#B91C1C] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="submit" fullWidth loading={loading}>
              Ingresar
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-400">o</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
          >
            Entrar como Invitado
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{' '}
            <Link
              href="/registro"
              className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

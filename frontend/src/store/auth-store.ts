'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Usuario } from '@/types';
import { authService } from '@/services/auth.service';

interface AuthStore {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (nombreUsuario: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    nombreUsuario: string;
    correo: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUsuario: (usuario: Usuario) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      usuario: null,
      token: null,
      isAuthenticated: false,

      login: async (nombreUsuario: string, password: string) => {
        try {
          const response = await authService.login(nombreUsuario, password);
          const data = response.data;
          if (data.ok && data.payload) {
            const { token, usuarioId, nombreUsuario: nombre, rol } = data.payload;
            set({
              usuario: {
                id: usuarioId,
                nombreUsuario: nombre,
                correo: '',
                rol: rol as 'CLIENTE' | 'ADMIN',
              },
              token,
              isAuthenticated: true,
            });
            return { success: true };
          }
          return { success: false, error: data.mensaje || 'Credenciales incorrectas' };
        } catch (err: unknown) {
          const axiosErr = err as { response?: { data?: { mensaje?: string } } };
          return {
            success: false,
            error: axiosErr.response?.data?.mensaje || 'Error al conectar con el servidor',
          };
        }
      },

      register: async (data) => {
        try {
          const response = await authService.register({
            ...data,
            rol: 'CLIENTE',
          });
          const result = response.data;
          if (result.ok) {
            return { success: true };
          }
          return { success: false, error: result.mensaje || 'Error al registrar' };
        } catch (err: unknown) {
          const axiosErr = err as { response?: { data?: { mensaje?: string } } };
          return {
            success: false,
            error: axiosErr.response?.data?.mensaje || 'Error al conectar con el servidor',
          };
        }
      },

      logout: async () => {
        const { token } = get();
        if (token) {
          try {
            await authService.logout(token);
          } catch {
            // ignore
          }
        }
        set({ usuario: null, token: null, isAuthenticated: false });
      },

      setUsuario: (usuario: Usuario) => set({ usuario }),
    }),
    { name: 'jetstore-auth' }
  )
);

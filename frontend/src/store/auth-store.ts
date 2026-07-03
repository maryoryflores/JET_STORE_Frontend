'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Usuario } from '@/types';

interface AuthStore {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUsuario: (usuario: Usuario) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const { usuarios } = await import('@/data/usuarios');
        if (password.length < 1) return false;
        const usuario = usuarios.find((u) => u.email === email);
        if (usuario) {
          set({
            usuario,
            token: 'mock-jwt-token',
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({
          usuario: null,
          token: null,
          isAuthenticated: false,
        });
      },
      setUsuario: (usuario: Usuario) => set({ usuario }),
    }),
    { name: 'jetstore-auth' }
  )
);

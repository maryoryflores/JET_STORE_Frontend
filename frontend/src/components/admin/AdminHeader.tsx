'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { getInitials } from '@/utils/format';
import { HiMenu, HiBell, HiChevronDown } from 'react-icons/hi';

interface AdminHeaderProps {
  title: string;
  onToggleSidebar: () => void;
}

export default function AdminHeader({ title, onToggleSidebar }: AdminHeaderProps) {
  const { usuario, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Abrir menú lateral"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        >
          <HiMenu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" aria-label="Notificaciones" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
          <HiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Menú de usuario"
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-sm font-semibold">
              {usuario ? getInitials(usuario.nombreUsuario) : 'U'}
            </div>
            <HiChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {usuario?.nombreUsuario}
                </p>
                <p className="text-xs text-gray-500 truncate">{usuario?.correo}</p>
              </div>
              <button
                type="button"
                onClick={() => { logout(); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

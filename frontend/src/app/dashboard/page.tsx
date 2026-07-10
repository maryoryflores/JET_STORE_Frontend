'use client';

import Link from 'next/link';
import { HiShoppingBag, HiBookOpen, HiHeart, HiCog } from 'react-icons/hi';
import { useAuthStore } from '@/store/auth-store';

const quickLinks = [
  { href: '/dashboard/compras', label: 'Mis Compras', icon: HiShoppingBag, desc: 'Revisa el historial de tus compras' },
  { href: '/dashboard/biblioteca', label: 'Biblioteca Digital', icon: HiBookOpen, desc: 'Accede a tus libros adquiridos' },
  { href: '/dashboard/favoritos', label: 'Favoritos', icon: HiHeart, desc: 'Tus libros guardados' },
  { href: '/dashboard/configuracion', label: 'Configuración', icon: HiCog, desc: 'Administra tu cuenta' },
];

export default function DashboardPage() {
  const usuario = useAuthStore((s) => s.usuario);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, {usuario?.nombreUsuario || 'Usuario'}
        </h1>
        <p className="text-gray-500 mt-1">Panel de control de tu cuenta JetStore Digital</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-100 transition-colors">
                <Icon className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="font-semibold text-gray-900">{link.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

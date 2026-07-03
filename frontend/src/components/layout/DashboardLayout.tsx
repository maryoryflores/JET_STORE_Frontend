'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiUser, HiShoppingBag, HiBookOpen, HiHeart, HiCog, HiMenu, HiX
} from 'react-icons/hi';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const sidebarLinks = [
  { href: '/dashboard', label: 'Perfil', icon: HiUser },
  { href: '/dashboard/compras', label: 'Mis Compras', icon: HiShoppingBag },
  { href: '/dashboard/biblioteca', label: 'Biblioteca Digital', icon: HiBookOpen },
  { href: '/dashboard/favoritos', label: 'Favoritos', icon: HiHeart },
  { href: '/dashboard/configuracion', label: 'Configuración', icon: HiCog },
];

export default function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menú"
        className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-100"
      >
        <HiMenu className="w-6 h-6" />
      </button>

      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-30">
        <div className="px-6 py-6 border-b border-gray-200">
          <Link href="/" className="text-xl font-bold text-red-600">JetStore Digital</Link>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = link.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-600 border-l-2 border-red-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-72 h-full bg-white z-10"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <Link href="/" className="text-xl font-bold text-red-600">JetStore Digital</Link>
                <button type="button" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú" className="p-1 text-gray-400 hover:text-gray-600">
                  <HiX className="w-5 h-5" />
                </button>
              </div>
              <nav className="py-4 px-3 space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = link.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-red-50 text-red-600 border-l-2 border-red-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <link.icon className="w-5 h-5 flex-shrink-0" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="lg:ml-64 min-h-screen py-8 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-gray-500">{description}</p>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}

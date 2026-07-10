'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiShoppingCart, HiHeart, HiUser, HiChevronDown, HiLogout } from 'react-icons/hi';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCartStore();
  const { usuario, isAuthenticated, logout } = useAuthStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image src="/logo.png" alt="JetStore Digital" width={45} height={45} className="w-10 h-10 lg:w-11 lg:h-11" priority />
            <span className="text-xl lg:text-2xl font-bold text-red-600 tracking-tight">JetStore Digital</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-red-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated && (
              <>
                <Link
                  href="/carrito"
                  className="relative p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <HiShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <Link
                  href="/dashboard/favoritos"
                  className="p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <HiHeart className="w-6 h-6" />
                </Link>
              </>
            )}

            {isAuthenticated && usuario ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label="Menú de usuario"
                  className="flex items-center gap-2 p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <HiUser className="w-6 h-6" />
                  <span className="text-sm font-medium">{usuario.nombreUsuario}</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-medium text-white">{usuario.nombreUsuario}</p>
                        <p className="text-xs text-gray-400 truncate">{usuario.correo || 'Sesión activa'}</p>
                      </div>
                      {usuario.rol === 'ADMIN' ? (
                        <Link
                          href="/admin"
                          className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Panel Admin
                        </Link>
                      ) : (
                        <>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Mi Cuenta
                          </Link>
                          <Link
                            href="/dashboard/compras"
                            className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Mis Compras
                          </Link>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => { logout(); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-red-500 transition-colors flex items-center gap-2"
                      >
                        <HiLogout className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-3">
            {isAuthenticated && (
              <Link href="/carrito" className="relative p-2 text-gray-300">
                <HiShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="p-2 text-gray-300 hover:text-white"
            >
              {isMobileOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-black border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-red-600/20 text-red-500'
                      : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="px-4 pb-4 border-t border-white/10 pt-4 space-y-2">
              {isAuthenticated && (
                <Link
                  href="/dashboard/favoritos"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-900 transition-colors"
                >
                  <HiHeart className="w-5 h-5" />
                  Favoritos
                </Link>
              )}
              {isAuthenticated && usuario ? (
                <>
                  <div className="px-4 py-3 flex items-center gap-3">
                    <HiUser className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{usuario.nombreUsuario}</p>
                      <p className="text-xs text-gray-400">{usuario.correo || 'Sesión activa'}</p>
                    </div>
                  </div>
                  {usuario.rol === 'ADMIN' ? (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-900 transition-colors"
                    >
                      Panel Admin
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileOpen(false)}
                        className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-900 transition-colors"
                      >
                        Mi Cuenta
                      </Link>
                      <Link
                        href="/dashboard/compras"
                        onClick={() => setIsMobileOpen(false)}
                        className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-900 transition-colors"
                      >
                        Mis Compras
                      </Link>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => { logout(); setIsMobileOpen(false); }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-900 transition-colors"
                  >
                    <HiLogout className="w-5 h-5" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-center bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

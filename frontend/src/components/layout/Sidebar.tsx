'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiHome, HiCollection, HiTag, HiUsers, HiShoppingBag,
  HiCreditCard, HiChartBar, HiCog, HiDocumentReport, HiX
} from 'react-icons/hi';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: HiHome },
  { href: '/admin/productos', label: 'Productos', icon: HiCollection },
  { href: '/admin/categorias', label: 'Categorías', icon: HiTag },
  { href: '/admin/usuarios', label: 'Usuarios', icon: HiUsers },
  { href: '/admin/pedidos', label: 'Pedidos', icon: HiShoppingBag },
  { href: '/admin/pagos', label: 'Pagos', icon: HiCreditCard },
  { href: '/admin/reportes', label: 'Reportes', icon: HiChartBar },
  { href: '/admin/configuracion', label: 'Configuración', icon: HiCog },
  { href: '/admin/logs', label: 'Logs', icon: HiDocumentReport },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="h-full flex flex-col bg-black">
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logo.png" alt="JetStore Digital" width={36} height={36} className="w-9 h-9" />
          <span className="text-lg font-bold text-red-600">JetStore</span>
        </Link>
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Cerrar menú" className="lg:hidden p-1 text-gray-400 hover:text-white">
            <HiX className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-red-600/20 text-red-500 border-l-2 border-red-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className={isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">JetStore Admin v1.0</p>
      </div>
    </div>
  );

  return (
    <>
      <aside className={`hidden lg:flex flex-col fixed left-0 top-0 h-full bg-black z-40 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isOpen && onClose && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-72 h-full bg-black z-10"
            >
              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

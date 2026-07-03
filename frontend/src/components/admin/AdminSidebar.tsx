'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import {
  HiChartBar,
  HiBookOpen,
  HiTag,
  HiUsers,
  HiShoppingCart,
  HiCreditCard,
  HiDocumentReport,
  HiCog,
  HiClipboardList,
} from 'react-icons/hi';

interface AdminSidebarProps {
  collapsed?: boolean;
}

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: HiChartBar },
  { href: '/admin/productos', label: 'Productos', icon: HiBookOpen },
  { href: '/admin/categorias', label: 'Categorías', icon: HiTag },
  { href: '/admin/usuarios', label: 'Usuarios', icon: HiUsers },
  { href: '/admin/pedidos', label: 'Pedidos', icon: HiShoppingCart },
  { href: '/admin/pagos', label: 'Pagos', icon: HiCreditCard },
  { href: '/admin/reportes', label: 'Reportes', icon: HiDocumentReport },
  { href: '/admin/configuracion', label: 'Configuración', icon: HiCog },
  { href: '/admin/logs', label: 'Logs', icon: HiClipboardList },
];

export default function AdminSidebar({ collapsed = false }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'bg-[#111111] text-white min-h-screen flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-gray-800">
        {collapsed ? (
          <span className="text-xl font-bold text-[#DC2626] mx-auto">J</span>
        ) : (
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#DC2626]">JetStore</span>
            <span className="text-xs text-gray-400 mt-1">Admin</span>
          </Link>
        )}
      </div>
      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#DC2626] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

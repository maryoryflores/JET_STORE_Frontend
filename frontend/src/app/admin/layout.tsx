'use client';
import { useAuthStore } from '@/store/auth-store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { cn } from '@/utils/cn';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, usuario } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || usuario?.rol !== 'ADMIN') router.push('/');
  }, [isAuthenticated, usuario, router]);

  if (!isAuthenticated || usuario?.rol !== 'ADMIN') return null;

  const pageTitle = pathname.split('/').pop() || 'Dashboard';
  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar collapsed={!sidebarOpen} />
      <div className={cn('flex-1 transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-20')}>
        <AdminHeader title={formattedTitle} onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { productos } from '@/data/productos';
import { compras } from '@/data/compras';
import { useAuthStore } from '@/store/auth-store';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { HiSearch, HiDownload, HiBookOpen } from 'react-icons/hi';
import Link from 'next/link';

export default function DigitalLibrary() {
  const { usuario } = useAuthStore();
  const [search, setSearch] = useState('');

  const purchasedIds = useMemo(() => {
    if (!usuario) return new Set<number>();
    const userPurchases = compras.filter(
      (c) => c.estado === 'completado'
    );
    const ids = new Set<number>();
    userPurchases.forEach((c) => c.productos.forEach((p) => ids.add(p.productoId)));
    return ids;
  }, [usuario]);

  const purchasedProducts = useMemo(() => {
    return productos.filter((p) => purchasedIds.has(p.id));
  }, [purchasedIds]);

  const filtered = useMemo(() => {
    if (!search.trim()) return purchasedProducts;
    const q = search.toLowerCase();
    return purchasedProducts.filter(
      (p) => p.titulo.toLowerCase().includes(q) || p.autor.toLowerCase().includes(q)
    );
  }, [purchasedProducts, search]);

  if (purchasedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <HiBookOpen className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No tienes libros en tu biblioteca</h3>
        <p className="text-gray-500 mb-6">Explora nuestro catálogo y comienza a leer</p>
        <Link href="/catalogo">
          <Button>Ir al Catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="max-w-md">
        <Input
          placeholder="Buscar en tu biblioteca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<HiSearch />}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((producto) => (
          <div key={producto.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center">
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
              <HiBookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{producto.titulo}</h3>
            <p className="text-xs text-gray-500 mb-4">{producto.autor}</p>
            <Button size="sm" icon={<HiDownload />} variant="primary" className="w-full" onClick={() => alert('Descargando PDF (simulación)')}>
              Descargar PDF
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

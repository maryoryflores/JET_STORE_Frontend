'use client';

import { useState, useEffect } from 'react';
import { productService } from '@/services/product.service';
import { productos as mockProductos } from '@/data/productos';
import StatsCards from '@/components/admin/StatsCards';
import Charts from '@/components/admin/Charts';
import { Producto } from '@/types';

export default function AdminDashboardPage() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await productService.getAll();
        if (res.data.ok) setProductos(res.data.payload);
      } catch {
        setProductos(
          mockProductos.map((p) => ({
            id: p.id,
            titulo: p.titulo,
            autor: p.autor,
            categoria: p.categoria,
            precio: p.precio,
            formato: p.formato,
            imagen: p.imagen,
            stock: p.stock,
            fechaCreacion: p.fechaPublicacion,
          }))
        );
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <StatsCards />
      <Charts />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Libros Registrados</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Título</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Autor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Categoría</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Formato</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-500">Stock</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-500">Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.slice(0, 5).map((libro) => (
                <tr key={libro.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900">{libro.titulo}</td>
                  <td className="py-3 px-4 text-gray-600">{libro.autor}</td>
                  <td className="py-3 px-4 text-gray-600">{libro.categoria}</td>
                  <td className="py-3 px-4 text-gray-500">{libro.formato}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">{libro.stock}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">
                    S/ {libro.precio.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

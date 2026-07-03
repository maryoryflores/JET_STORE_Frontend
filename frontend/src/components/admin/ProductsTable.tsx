'use client';

import { useState, useMemo } from 'react';
import { productos } from '@/data/productos';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { formatCurrency } from '@/utils/format';
import { Producto } from '@/types';
import { HiSearch, HiPlus, HiPencil, HiTrash, HiBookOpen } from 'react-icons/hi';

export default function ProductsTable() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Producto | null>(null);
  const [deleting, setDeleting] = useState<Producto | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return productos;
    const q = search.toLowerCase();
    return productos.filter((p) => p.titulo.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q));
  }, [search]);

  const columns = [
    {
      key: 'imagen',
      header: 'Imagen',
      render: (item: Producto) => {
        void item;
        return (
          <div className="w-10 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
            <HiBookOpen className="w-5 h-5 text-gray-400" />
          </div>
        );
      },
    },
    { key: 'titulo', header: 'Título' },
    { key: 'categoria', header: 'Categoría' },
    {
      key: 'precio',
      header: 'Precio',
      render: (item: Producto) => formatCurrency(item.precio),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (item: Producto) => (
        <Badge variant={item.stock ? 'success' : 'danger'}>
          {item.stock ? 'Disponible' : 'Agotado'}
        </Badge>
      ),
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (item: Producto) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" icon={<HiPencil />} onClick={() => { setEditing(item); setModalOpen(true); }}>
            Editar
          </Button>
          <Button size="sm" variant="ghost" icon={<HiTrash />} onClick={() => setDeleting(item)} />
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    if (deleting && window.confirm(`¿Eliminar "${deleting.titulo}"?`)) {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-full max-w-xs">
          <Input placeholder="Buscar productos..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<HiSearch />} />
        </div>
        <Button icon={<HiPlus />} onClick={() => { setEditing(null); setModalOpen(true); }}>
          Agregar Producto
        </Button>
      </div>
      <Table columns={columns} data={filtered} keyExtractor={(item) => item.id} emptyMessage="No se encontraron productos" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar Producto' : 'Agregar Producto'} size="lg">
        <p className="text-sm text-gray-500">Formulario de producto (simulación)</p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={() => setModalOpen(false)}>{editing ? 'Guardar' : 'Crear'}</Button>
        </div>
      </Modal>
      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Eliminar Producto">
        <p className="text-sm text-gray-600">¿Estás seguro de eliminar &ldquo;{deleting?.titulo}&rdquo;?</p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleting(null)}>Cancelar</Button>
          <Button variant="primary" onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}

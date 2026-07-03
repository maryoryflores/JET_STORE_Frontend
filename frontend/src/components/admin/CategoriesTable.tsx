'use client';

import { useState } from 'react';
import { categorias } from '@/data/categorias';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { Categoria } from '@/types';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';

export default function CategoriesTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Categoria | null>(null);
  const [deleting, setDeleting] = useState<Categoria | null>(null);

  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'descripcion', header: 'Descripción' },
    {
      key: 'productCount',
      header: 'Productos',
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (item: Categoria) => (
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
    if (deleting && window.confirm(`¿Eliminar categoría "${deleting.nombre}"?`)) {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button icon={<HiPlus />} onClick={() => { setEditing(null); setModalOpen(true); }}>
          Agregar Categoría
        </Button>
      </div>
      <Table columns={columns} data={categorias} keyExtractor={(item) => item.id} emptyMessage="No hay categorías" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar Categoría' : 'Agregar Categoría'}>
        <div className="space-y-4">
          <Input label="Nombre" defaultValue={editing?.nombre ?? ''} />
          <Input label="Descripción" defaultValue={editing?.descripcion ?? ''} />
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={() => setModalOpen(false)}>{editing ? 'Guardar' : 'Crear'}</Button>
        </div>
      </Modal>
      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Eliminar Categoría">
        <p className="text-sm text-gray-600">¿Estás seguro de eliminar &ldquo;{deleting?.nombre}&rdquo;?</p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleting(null)}>Cancelar</Button>
          <Button onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { Categoria } from '@/types';
import { categoryService, CategoriaPayload } from '@/services/category.service';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';

function toCategoriaView(p: CategoriaPayload): Categoria {
  return {
    id: p.id,
    nombre: p.nombre,
    slug: p.nombre.toLowerCase().replace(/\s+/g, '-'),
    descripcion: p.descripcion ?? '',
    icono: 'HiTag',
    imagen: '',
    productCount: p.productCount,
  };
}

export default function CategoriesTable() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Categoria | null>(null);
  const [formNombre, setFormNombre] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Categoria | null>(null);

  const fetchCategorias = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.getAll();
      const payload = res.data.payload ?? [];
      setCategorias(payload.map(toCategoriaView));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error al cargar categorías';
      const axiosMsg = (e as { response?: { data?: { mensaje?: string } } })?.response?.data?.mensaje;
      setError(axiosMsg || msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (modalOpen) {
      setFormNombre(editing?.nombre ?? '');
      setFormError(null);
    }
  }, [modalOpen, editing]);

  const handleSave = async () => {
    const nombre = formNombre.trim();
    if (!nombre) {
      setFormError('El nombre es requerido');
      return;
    }
    if (nombre.length > 255) {
      setFormError('Máximo 255 caracteres');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      if (editing) {
        const res = await categoryService.update(editing.id, nombre);
        const updated = toCategoriaView(res.data.payload);
        setCategorias((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        const res = await categoryService.create(nombre);
        const created = toCategoriaView(res.data.payload);
        setCategorias((prev) => [...prev, created]);
      }
      setModalOpen(false);
      setEditing(null);
    } catch (e: unknown) {
      const axiosMsg = (e as { response?: { data?: { mensaje?: string } } })?.response?.data?.mensaje;
      setFormError(axiosMsg || 'Error al guardar la categoría');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await categoryService.delete(deleting.id);
      setCategorias((prev) => prev.filter((c) => c.id !== deleting.id));
      setDeleting(null);
    } catch (e: unknown) {
      const axiosMsg = (e as { response?: { data?: { mensaje?: string } } })?.response?.data?.mensaje;
      alert(axiosMsg || 'Error al eliminar la categoría');
    }
  };

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

  if (loading) return <p className="text-sm text-gray-500">Cargando categorías...</p>;
  if (error) return <div className="space-y-2"><p className="text-sm text-red-600">{error}</p><Button size="sm" onClick={fetchCategorias}>Reintentar</Button></div>;

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
          <Input label="Nombre" value={formNombre} onChange={(e) => setFormNombre(e.target.value)} placeholder="Ej: Tecnología" error={formError ?? undefined} />
          <p className="text-xs text-gray-400">La descripción se genera automáticamente. Producto Count se calcula según libros asociados.</p>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? 'Guardando...' : editing ? 'Guardar' : 'Crear'}</Button>
        </div>
      </Modal>
      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Eliminar Categoría">
        <p className="text-sm text-gray-600">¿Estás seguro de eliminar &ldquo;{deleting?.nombre}&rdquo;? {deleting && deleting.productCount > 0 && <span className="text-red-600 font-medium">Tiene {deleting.productCount} libro(s) asociado(s) y no se podrá eliminar.</span>}</p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleting(null)}>Cancelar</Button>
          <Button onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}

'use client';

import { useState, useMemo, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import { productService, LibroData } from '@/services/product.service';
import { productos as mockProductos } from '@/data/productos';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { formatCurrency } from '@/utils/format';
import { Producto } from '@/types';
import { HiSearch, HiPlus, HiTrash, HiPencil } from 'react-icons/hi';
import Swal from 'sweetalert2';

const emptyForm: LibroData = {
  titulo: '',
  autor: '',
  categoria: { nombre: '' },
  precio: 0,
  formato: 'PDF',
  imagen: '',
  stock: 0,
};

export default function ProductsTable() {
  const [search, setSearch] = useState('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Producto | null>(null);
  const [form, setForm] = useState<LibroData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Producto | null>(null);
  const [addingStock, setAddingStock] = useState<Producto | null>(null);
  const [stockQty, setStockQty] = useState('1');

  const loadAll = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        productService.getAll(),
        adminService.getCategories(),
      ]);
      if (prodRes.data.ok) setProductos(prodRes.data.payload);
      if (catRes.data.ok) setCategorias(catRes.data.payload);
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
      setCategorias([...new Set(mockProductos.map((p) => p.categoria))]);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          productService.getAll(),
          adminService.getCategories(),
        ]);
        if (!controller.signal.aborted) {
          if (prodRes.data.ok) setProductos(prodRes.data.payload);
          if (catRes.data.ok) setCategorias(catRes.data.payload);
        }
      } catch {
        if (!controller.signal.aborted) {
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
          setCategorias([...new Set(mockProductos.map((p) => p.categoria))]);
        }
      }
    };
    run();
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return productos;
    const q = search.toLowerCase();
    return productos.filter(
      (p) =>
        p.titulo.toLowerCase().includes(q) ||
        p.autor.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q)
    );
  }, [search, productos]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (p: Producto) => {
    setEditing(p);
    setForm({
      id: p.id,
      titulo: p.titulo,
      autor: p.autor,
      categoria: { nombre: p.categoria },
      precio: p.precio,
      formato: p.formato,
      imagen: '',
      stock: p.stock,
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.titulo.trim() || !form.autor.trim()) {
      Swal.fire('Campos requeridos', 'Título y autor son obligatorios.', 'warning');
      return;
    }
    setSaving(true);
    try {
      const data: LibroData = {
        ...form,
        id: editing?.id,
        precio: Number(form.precio),
        stock: Number(form.stock),
      };
      await adminService.saveProduct(data);
      setFormOpen(false);
      loadAll();
      Swal.fire(
        editing ? 'Actualizado' : 'Creado',
        editing ? 'Libro actualizado correctamente.' : 'Libro creado correctamente.',
        'success'
      );
    } catch {
      Swal.fire('Error', 'No se pudo guardar el libro.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await adminService.deleteProduct(deleting.id);
      setProductos((prev) => prev.filter((p) => p.id !== deleting.id));
      setDeleting(null);
      Swal.fire('Eliminado', 'El libro ha sido eliminado.', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo eliminar el libro.', 'error');
    }
  };

  const handleAddStock = async () => {
    if (!addingStock) return;
    const qty = parseInt(stockQty, 10);
    if (isNaN(qty) || qty < 1) return;
    try {
      await adminService.addStock(addingStock.id, qty);
      setProductos((prev) =>
        prev.map((p) => (p.id === addingStock.id ? { ...p, stock: p.stock + qty } : p))
      );
      setAddingStock(null);
      setStockQty('1');
      Swal.fire('Stock actualizado', `Se agregaron ${qty} unidades.`, 'success');
    } catch {
      Swal.fire('Error', 'No se pudo actualizar el stock.', 'error');
    }
  };

  const setField = (key: keyof LibroData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const columns = [
    {
      key: 'imagen',
      header: '',
      render: (item: Producto) => (
        <div className="w-10 h-14 bg-gradient-to-br from-red-50 to-red-100 rounded flex items-center justify-center overflow-hidden">
          <span className="text-red-400 font-bold text-sm">{item.titulo.charAt(0)}</span>
        </div>
      ),
    },
    { key: 'titulo', header: 'Título' },
    { key: 'autor', header: 'Autor' },
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
        <Badge variant={item.stock > 0 ? 'success' : 'danger'}>
          {item.stock > 0 ? `${item.stock} uds` : 'Agotado'}
        </Badge>
      ),
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (item: Producto) => (
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" icon={<HiPencil />} onClick={() => openEdit(item)}>
            Editar
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon={<HiPlus />}
            onClick={() => {
              setAddingStock(item);
              setStockQty('1');
            }}
          >
            Stock
          </Button>
          <Button size="sm" variant="ghost" icon={<HiTrash />} onClick={() => setDeleting(item)} />
        </div>
      ),
    },
  ];

  const categoryOptions = categorias.map((c) => ({ value: c, label: c }));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-full max-w-xs">
          <Input
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<HiSearch />}
          />
        </div>
        <Button icon={<HiPlus />} onClick={openCreate}>
          Nuevo Libro
        </Button>
      </div>

      <Table
        columns={columns}
        data={filtered}
        keyExtractor={(item) => item.id}
        emptyMessage="No se encontraron productos"
      />

      {/* Modal Crear / Editar */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Editar Libro' : 'Nuevo Libro'}
      >
        <div className="space-y-4">
          <Input
            label="Título *"
            value={form.titulo}
            onChange={(e) => setField('titulo', e.target.value)}
            placeholder="Título del libro"
          />
          <Input
            label="Autor *"
            value={form.autor}
            onChange={(e) => setField('autor', e.target.value)}
            placeholder="Nombre del autor"
          />
          <Select
            label="Categoría"
            value={form.categoria?.nombre ?? ''}
            onChange={(e) => setField('categoria', { nombre: e.target.value })}
            options={categoryOptions}
            placeholder="Seleccionar categoría"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Precio (S/)"
              type="number"
              min={0}
              value={form.precio}
              onChange={(e) => setField('precio', e.target.value)}
            />
            <Input
              label="Stock"
              type="number"
              min={0}
              value={form.stock}
              onChange={(e) => setField('stock', e.target.value)}
            />
          </div>
          <Select
            label="Formato"
            value={form.formato}
            onChange={(e) => setField('formato', e.target.value)}
            options={[
              { value: 'PDF', label: 'PDF' },
              { value: 'FISICO', label: 'Físico' },
              { value: 'EBOOK', label: 'E-Book' },
            ]}
          />
          <Input
            label="URL de imagen"
            value={form.imagen ?? ''}
            onChange={(e) => setField('imagen', e.target.value)}
            placeholder="/productos/imagen.jpg"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setFormOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} loading={saving}>
              {editing ? 'Guardar Cambios' : 'Crear Libro'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal Agregar Stock */}
      <Modal
        isOpen={!!addingStock}
        onClose={() => setAddingStock(null)}
        title={`Agregar Stock: ${addingStock?.titulo}`}
      >
        <div className="space-y-4">
          <Input
            label="Cantidad"
            type="number"
            value={stockQty}
            onChange={(e) => setStockQty(e.target.value)}
            min={1}
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setAddingStock(null)}>
              Cancelar
            </Button>
            <Button onClick={handleAddStock}>Agregar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal Eliminar */}
      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Eliminar Producto">
        <p className="text-sm text-gray-600">
          ¿Estás seguro de eliminar &ldquo;{deleting?.titulo}&rdquo;?
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleting(null)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

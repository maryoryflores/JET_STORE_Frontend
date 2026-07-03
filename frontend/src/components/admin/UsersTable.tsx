'use client';

import { useState, useMemo } from 'react';
import { usuarios } from '@/data/usuarios';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import { formatDate } from '@/utils/format';
import { Usuario } from '@/types';
import { HiSearch } from 'react-icons/hi';

export default function UsersTable() {
  const [search, setSearch] = useState('');
  const [localUsuarios] = useState(usuarios);
  const [roles, setRoles] = useState<Record<number, 'cliente' | 'admin'>>(
    Object.fromEntries(usuarios.map((u) => [u.id, u.rol]))
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return localUsuarios;
    const q = search.toLowerCase();
    return localUsuarios.filter(
      (u) =>
        `${u.nombres} ${u.apellidos}`.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [search, localUsuarios]);

  const handleRoleChange = (id: number, rol: string) => {
    setRoles((prev) => ({ ...prev, [id]: rol as 'cliente' | 'admin' }));
  };

  const columns = [
    {
      key: 'nombre',
      header: 'Nombre',
      render: (item: Usuario) => `${item.nombres} ${item.apellidos}`,
    },
    { key: 'email', header: 'Email' },
    {
      key: 'rol',
      header: 'Rol',
      render: (item: Usuario) => (
        <Badge variant={item.rol === 'admin' ? 'info' : 'default'}>
          {item.rol === 'admin' ? 'Admin' : 'Cliente'}
        </Badge>
      ),
    },
    {
      key: 'fechaRegistro',
      header: 'Registro',
      render: (item: Usuario) => formatDate(item.fechaRegistro),
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (item: Usuario) => (
        <Select
          value={roles[item.id]}
          onChange={(e) => handleRoleChange(item.id, e.target.value)}
          options={[
            { value: 'cliente', label: 'Cliente' },
            { value: 'admin', label: 'Admin' },
          ]}
          className="w-32"
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="w-full max-w-xs">
        <Input
          placeholder="Buscar usuarios..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<HiSearch />}
        />
      </div>
      <Table columns={columns} data={filtered} keyExtractor={(item) => item.id} emptyMessage="No se encontraron usuarios" />
    </div>
  );
}

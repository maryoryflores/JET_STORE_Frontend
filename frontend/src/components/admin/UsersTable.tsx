'use client';

import { useState, useMemo, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import { usuarios as mockUsuarios } from '@/data/usuarios';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { HiSearch } from 'react-icons/hi';

interface BackendUsuario {
  id: number;
  nombreUsuario: string;
  correo: string;
  rol: string;
}

export default function UsersTable() {
  const [search, setSearch] = useState('');
  const [usuarios, setUsuarios] = useState<BackendUsuario[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminService.getUsers();
        if (res.data.ok) setUsuarios(res.data.payload);
      } catch {
        setUsuarios(
          mockUsuarios.map((u) => ({
            id: u.id,
            nombreUsuario: `${u.nombres} ${u.apellidos}`,
            correo: u.email,
            rol: u.rol === 'admin' ? 'ADMIN' : 'CLIENTE',
          }))
        );
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return usuarios;
    const q = search.toLowerCase();
    return usuarios.filter(
      (u) =>
        u.nombreUsuario.toLowerCase().includes(q) ||
        u.correo.toLowerCase().includes(q)
    );
  }, [search, usuarios]);

  const columns = [
    {
      key: 'nombreUsuario',
      header: 'Usuario',
      render: (item: BackendUsuario) => item.nombreUsuario,
    },
    { key: 'correo', header: 'Email' },
    {
      key: 'rol',
      header: 'Rol',
      render: (item: BackendUsuario) => (
        <Badge variant={item.rol === 'ADMIN' ? 'info' : 'default'}>
          {item.rol === 'ADMIN' ? 'Admin' : 'Cliente'}
        </Badge>
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

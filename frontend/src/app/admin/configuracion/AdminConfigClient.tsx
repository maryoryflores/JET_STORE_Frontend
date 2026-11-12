'use client';

import { useState } from 'react';
import { HiSave } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function AdminConfiguracionPage() {
  const [form, setForm] = useState({
    siteName: 'JetStore Digital',
    description: 'Compra libros digitales en PDF al instante.',
    email: 'soporte@jetstore.com',
    smtpHost: 'smtp.jetstore.com',
    smtpPort: '587',
    smtpUser: 'noreply@jetstore.com',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Configuración del Sitio</h2>

        {saved && (
          <div className="mb-4 bg-green-50 text-green-700 rounded-lg p-3 text-sm font-medium">
            Configuración guardada exitosamente.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-2">
              Información General
            </h3>
            <Input
              label="Nombre del Sitio"
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
            />
            <div>
              <label htmlFor="site-desc" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                id="site-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all resize-none"
                rows={3}
              />
            </div>
            <Input
              label="Email de Contacto"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-2">
              Configuración de Email (SMTP)
            </h3>
            <Input
              label="Servidor SMTP"
              value={form.smtpHost}
              onChange={(e) => setForm({ ...form, smtpHost: e.target.value })}
            />
            <Input
              label="Puerto SMTP"
              value={form.smtpPort}
              onChange={(e) => setForm({ ...form, smtpPort: e.target.value })}
            />
            <Input
              label="Usuario SMTP"
              value={form.smtpUser}
              onChange={(e) => setForm({ ...form, smtpUser: e.target.value })}
            />
          </div>

          <Button type="submit" icon={<HiSave className="w-4 h-4" />}>
            Guardar Configuración
          </Button>
        </form>
      </div>
    </div>
  );
}

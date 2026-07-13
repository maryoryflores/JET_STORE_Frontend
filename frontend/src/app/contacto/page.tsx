'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Toast from '@/components/ui/Toast';

export default function ContactoPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast({ show: true, message: 'Mensaje enviado correctamente. Te responderemos pronto.', type: 'success' });
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  const contactInfo = [
    { icon: HiMail, label: 'Email', value: 'contacto@jetstore.pe' },
    { icon: HiPhone, label: 'Teléfono', value: '+51 926 849 164' },
    { icon: HiLocationMarker, label: 'Dirección', value: 'Jr. Pedro Galvez 883' },
    { icon: HiClock, label: 'Horario', value: 'Lun - domingo: 24/7' },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-red-700 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-extrabold mb-4">
            Contáctanos
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-200 max-w-xl mx-auto">
            Estamos aquí para ayudarte. Responde tu consulta en menos de 24 horas.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Nombre" placeholder="Tu nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
                  <Input label="Email" type="email" placeholder="tu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <Input label="Asunto" placeholder="¿Sobre qué deseas consultar?" value={formData.asunto} onChange={(e) => setFormData({ ...formData, asunto: e.target.value })} required />
                <Textarea label="Mensaje" placeholder="Escribe tu mensaje aquí..." value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} required />
                <Button type="submit" size="lg" fullWidth>Enviar Mensaje</Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Información de Contacto</h2>
              <div className="grid gap-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-semibold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                <p className="text-gray-500">Mapa</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
    </>
  );
}

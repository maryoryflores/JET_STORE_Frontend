'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { HiMail } from 'react-icons/hi';
import Swal from 'sweetalert2';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa un correo electrónico válido.',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setEmail('');
    Swal.fire({
      icon: 'success',
      title: '¡Suscrito!',
      text: 'Gracias por suscribirte. Recibirás nuestras mejores ofertas.',
      timer: 3000,
      showConfirmButton: false,
    });
  };

  return (
    <section className="py-20 bg-gradient-to-r from-red-700 via-red-600 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <HiMail className="w-16 h-16 text-red-300 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Suscríbete a nuestro newsletter
          </h2>
          <p className="text-red-200 mb-8 max-w-lg mx-auto">
            Recibe las mejores ofertas, nuevos lanzamientos y contenido exclusivo directamente en tu correo.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              aria-label="Correo electrónico para newsletter"
              className="w-full px-5 py-3.5 rounded-xl border-0 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
            >
              {loading ? 'Enviando...' : 'Suscribirse'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

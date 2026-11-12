'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-black">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-40 lg:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            Compra Libros Digitales
            <span className="block text-red-300">al Instante</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Accede a cientos de PDFs educativos y profesionales desde cualquier dispositivo. 
            Descarga inmediata, pago seguro y calidad garantizada.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-2 bg-white text-red-700 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-all duration-200 text-lg"
            >
              Explorar Catálogo
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/catalogo?oferta=true"
              className="inline-flex items-center border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 text-lg"
            >
              Ver Ofertas
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

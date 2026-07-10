'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiComputerDesktop, HiBriefcase, HiHeart, HiAcademicCap, HiPaintBrush, HiMegaphone
} from 'react-icons/hi2';
import type { Categoria } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiComputerDesktop,
  HiBriefcase,
  HiHeart,
  HiAcademicCap,
  HiPaintBrush,
  HiMegaphone,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staticCategories: Categoria[] = [
  { id: 1, nombre: 'Tecnología', slug: 'tecnologia', descripcion: 'Libros de tecnología y programación', icono: 'HiComputerDesktop', imagen: '', productCount: 0 },
  { id: 2, nombre: 'Negocios', slug: 'negocios', descripcion: 'Libros de negocios y emprendimiento', icono: 'HiBriefcase', imagen: '', productCount: 0 },
  { id: 3, nombre: 'Salud', slug: 'salud', descripcion: 'Libros de salud y medicina', icono: 'HiHeart', imagen: '', productCount: 0 },
  { id: 4, nombre: 'Educación', slug: 'educacion', descripcion: 'Libros de educación y pedagogía', icono: 'HiAcademicCap', imagen: '', productCount: 0 },
  { id: 5, nombre: 'Diseño', slug: 'diseno', descripcion: 'Libros de diseño y creatividad', icono: 'HiPaintBrush', imagen: '', productCount: 0 },
  { id: 6, nombre: 'Marketing', slug: 'marketing', descripcion: 'Libros de marketing digital', icono: 'HiMegaphone', imagen: '', productCount: 0 },
];

function CategoryCard({ categoria }: { categoria: Categoria }) {
  const Icon = iconMap[categoria.icono] || HiComputerDesktop;

  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`/catalogo?categoria=${categoria.slug}`}
        className="group block bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
          {Icon && <Icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{categoria.nombre}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{categoria.descripcion}</p>
      </Link>
    </motion.div>
  );
}

export default function Categories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Categorías</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explora nuestra amplia colección de libros digitales organizados por categorías
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {staticCategories.map((cat) => (
            <CategoryCard key={cat.id} categoria={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

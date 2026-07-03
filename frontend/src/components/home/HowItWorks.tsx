'use client';

import { motion } from 'framer-motion';
import { HiSearch, HiShoppingCart, HiCloudDownload, HiBookOpen } from 'react-icons/hi';

const steps = [
  {
    number: 1,
    title: 'Explora el catálogo',
    description: 'Navega por nuestras categorías y encuentra el libro que necesitas.',
    icon: HiSearch,
  },
  {
    number: 2,
    title: 'Selecciona y compra',
    description: 'Elige tu libro, realiza el pago de forma segura y rápida.',
    icon: HiShoppingCart,
  },
  {
    number: 3,
    title: 'Recibe al instante',
    description: 'El PDF estará disponible para descargar inmediatamente después de la compra.',
    icon: HiCloudDownload,
  },
  {
    number: 4,
    title: 'Disfruta tu libro',
    description: 'Lee en cualquier dispositivo, cuando quieras y donde quieras.',
    icon: HiBookOpen,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">¿Cómo funciona?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Comprar libros digitales nunca fue tan fácil. Sigue estos simples pasos
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4"
        >
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-red-200" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-5 shadow-lg">
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <span className="absolute top-0 -right-2 md:right-auto md:-top-2 md:left-12 w-7 h-7 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">
                {step.number}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm max-w-xs">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="md:hidden w-0.5 h-8 bg-red-200 mt-4" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

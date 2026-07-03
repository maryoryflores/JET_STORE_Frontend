'use client';

import { motion } from 'framer-motion';
import { HiLightningBolt, HiCloudDownload, HiRefresh, HiDeviceMobile, HiBadgeCheck } from 'react-icons/hi';
import { HiShieldCheck } from 'react-icons/hi2';
import { beneficios } from '@/data/stats';
import type { Beneficio } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiLightningBolt,
  HiShieldCheck,
  HiCloudDownload,
  HiRefresh,
  HiDeviceMobile,
  HiBadgeCheck,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function BenefitCard({ beneficio }: { beneficio: Beneficio }) {
  const Icon = iconMap[beneficio.icono];

  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors duration-300">
        {Icon && <Icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{beneficio.titulo}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{beneficio.descripcion}</p>
    </motion.div>
  );
}

export default function Benefits() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">¿Por qué elegir JetStore Digital?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia en libros digitales con beneficios exclusivos para nuestros lectores
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {beneficios.map((ben) => (
            <BenefitCard key={ben.id} beneficio={ben} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

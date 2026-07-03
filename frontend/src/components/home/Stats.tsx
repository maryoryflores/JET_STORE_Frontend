'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiLibrary } from 'react-icons/hi';
import {
  HiBookOpen, HiUserGroup, HiStar
} from 'react-icons/hi2';
import { stats } from '@/data/stats';
import type { Stat } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiBookOpen,
  HiUserGroup,
  HiLibrary,
  HiStar,
};

function AnimatedStat({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('');
  const Icon = iconMap[stat.icono];

  useEffect(() => {
    if (!inView) return;

    const raw = stat.valor.replace(/[^0-9.]/g, '');
    const suffix = stat.valor.replace(/[0-9,.]/g, '');
    const target = parseInt(raw.replace(/,/g, ''), 10);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setDisplayValue(current.toLocaleString('es-PE') + suffix);
      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(stat.valor);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, stat.valor]);

  return (
    <div ref={ref} className="text-center">
      <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
        {Icon && <Icon className="w-6 h-6 text-red-300" />}
      </div>
      <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{displayValue || stat.valor}</p>
      <p className="text-sm text-red-200 font-medium">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 px-6 sm:px-10 py-8 sm:py-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <AnimatedStat key={stat.id} stat={stat} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

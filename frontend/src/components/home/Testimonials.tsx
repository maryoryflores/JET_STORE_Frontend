'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { testimonios } from '@/data/testimonios';
import type { Testimonio } from '@/types';

function TestimonialCard({ testimonio }: { testimonio: Testimonio }) {
  return (
    <div className="flex-shrink-0 w-[85vw] sm:w-[400px] lg:w-[380px] bg-white rounded-2xl border border-gray-100 p-7 shadow-sm mx-3">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
          {testimonio.nombre.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{testimonio.nombre}</h4>
          <p className="text-xs text-gray-500">{testimonio.cargo}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <HiStar
            key={i}
            className={`w-4 h-4 ${i < testimonio.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{testimonio.texto}&rdquo;</p>
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const updateScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollPos(scrollLeft);
      setMaxScroll(scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(updateScroll, 300);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Lo que dicen nuestros clientes</h2>
            <p className="text-gray-500 max-w-xl">
              Miles de lectores confían en nosotros para sus libros digitales
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={scrollPos <= 0}
              aria-label="Anterior testimonio"
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={scrollPos >= maxScroll}
              aria-label="Siguiente testimonio"
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={updateScroll}
          className="flex overflow-x-auto gap-4 pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonios.map((testimonio) => (
            <motion.div
              key={testimonio.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <TestimonialCard testimonio={testimonio} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonios.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.querySelector('div')?.clientWidth || 400;
                  scrollRef.current.scrollTo({ left: i * (cardWidth + 24), behavior: 'smooth' });
                  setTimeout(updateScroll, 300);
                }
              }}
              aria-label={`Ir al testimonio ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                Math.abs(scrollPos - i * 400) < 200 ? 'bg-red-600 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

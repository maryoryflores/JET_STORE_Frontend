'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { faqs } from '@/data/faqs';
import type { FAQ } from '@/types';

function AccordionItem({ faq, isOpen, onClick }: { faq: FAQ; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{faq.pregunta}</span>
        <HiChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div id={`faq-answer-${faq.id}`} className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {faq.respuesta}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const grouped = faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
    if (!acc[faq.categoria]) acc[faq.categoria] = [];
    acc[faq.categoria].push(faq);
    return acc;
  }, {});

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Preguntas Frecuentes</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Resuelve tus dudas sobre nuestra plataforma de libros digitales
          </p>
        </div>

        <div className="space-y-6">
          {Object.entries(grouped).map(([categoria, items]) => (
            <div key={categoria}>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{categoria}</h3>
              <div className="space-y-2">
                {items.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiCheckCircle, HiDownload } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface OrderConfirmationProps {
  orderNumber: string;
  date: string;
  paymentMethod: string;
}

const methodLabels: Record<string, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  yape: 'Yape',
  plin: 'Plin',
  transferencia: 'Transferencia Bancaria',
  paypal: 'PayPal',
};

export default function OrderConfirmation({ orderNumber, date, paymentMethod }: OrderConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-lg mx-auto"
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <HiCheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-bold text-gray-900">¡Compra Realizada con Éxito!</h2>
          <p className="text-gray-500">Tu pedido ha sido procesado correctamente</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-xl p-4 space-y-3 text-left"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Número de Pedido</span>
            <span className="text-sm font-bold text-gray-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Fecha</span>
            <span className="text-sm text-gray-900">{date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Estado</span>
            <Badge variant="success" size="md">Completado</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Método de Pago</span>
            <span className="text-sm font-medium text-gray-900">
              {methodLabels[paymentMethod] || paymentMethod}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Button fullWidth size="lg" icon={<HiDownload className="w-5 h-5" />} onClick={() => alert('Comprobante descargado (simulación)')}>
            Descargar Comprobante
          </Button>

          <div className="flex gap-3">
            <Link href="/dashboard/compras" className="flex-1">
              <Button fullWidth variant="outline">
                Ir a Mis Compras
              </Button>
            </Link>
            <Link href="/catalogo" className="flex-1">
              <Button fullWidth variant="secondary">
                Seguir Comprando
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

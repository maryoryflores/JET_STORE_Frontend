'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiExclamation, HiInformationCircle, HiX } from 'react-icons/hi';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  isVisible?: boolean;
}

export default function Alert({ type, message, onClose, isVisible = true }: AlertProps) {
  const config = {
    success: { icon: HiCheckCircle, bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200', iconColor: 'text-green-500' },
    error: { icon: HiXCircle, bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200', iconColor: 'text-red-500' },
    warning: { icon: HiExclamation, bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200', iconColor: 'text-yellow-500' },
    info: { icon: HiInformationCircle, bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200', iconColor: 'text-blue-500' },
  };

  const { icon: Icon, bg, text, border, iconColor } = config[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-start gap-3 p-4 rounded-lg border ${bg} ${border}`}
        >
          <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
          <p className={`text-sm flex-1 ${text}`}>{message}</p>
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Cerrar" className={`p-1 hover:opacity-70 transition-opacity ${text}`}>
              <HiX className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

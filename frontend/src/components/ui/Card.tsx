import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
}

export default function Card({ children, className, padding = true, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-100 shadow-sm',
        padding && 'p-6',
        hover && 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}

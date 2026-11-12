'use client';
import { cn } from '@/utils/cn';
import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading = false, icon, fullWidth = false, className, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DC2626] active:scale-[0.98] hover:scale-[1.02]',
          variant === 'primary' && 'bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-md hover:shadow-lg',
          variant === 'secondary' && 'bg-[#111111] text-white hover:bg-gray-800 shadow-md hover:shadow-lg',
          variant === 'outline' && 'border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white',
          variant === 'ghost' && 'text-gray-700 hover:bg-gray-100',
          size === 'sm' && 'px-3 py-1.5 text-sm gap-1.5',
          size === 'md' && 'px-5 py-2.5 text-sm gap-2',
          size === 'lg' && 'px-8 py-3.5 text-base gap-2.5',
          fullWidth && 'w-full',
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        type={type}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children && <span>{children}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

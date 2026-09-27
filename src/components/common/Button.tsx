import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  fullWidth = false,
  size = 'md',
  className = '',
  disabled,
  ...props
}) => {
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-accent-secondary text-white font-medium shadow-sm hover:opacity-95';
      break;
    case 'secondary':
      variantStyles = 'bg-transparent text-primary border border-hairline hover:bg-sunken';
      break;
    case 'danger':
      variantStyles = 'bg-status-danger text-white font-medium hover:opacity-95';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent text-secondary hover:bg-sunken hover:text-primary';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-sm rounded-xl';
      break;
    case 'md':
      sizeStyles = 'px-4 py-2.5 text-base rounded-[16px]';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3.5 text-lg font-semibold rounded-[18px] min-h-[52px]';
      break;
  }

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary/40 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${sizeStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

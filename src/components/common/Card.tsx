import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  interactive = false,
}) => {
  const isClickable = !!onClick || interactive;

  return (
    <motion.div
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      onClick={onClick}
      className={`bg-surface border border-hairline rounded-[20px] p-5 transition-colors ${
        isClickable ? 'cursor-pointer hover:border-accent-primary/30' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

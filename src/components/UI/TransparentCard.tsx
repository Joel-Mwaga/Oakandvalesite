import React from 'react';
import { motion } from 'framer-motion';

interface TransparentCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
}

const TransparentCard: React.FC<TransparentCardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  blur = 'md'
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <motion.div
      className={`
        bg-white/10 ${blurClasses[blur]} border border-white/20 rounded-xl
        ${hover ? 'hover:bg-white/20 hover:border-white/30 transition-all duration-300' : ''}
        ${className}
      `}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default TransparentCard;
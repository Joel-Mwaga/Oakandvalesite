import React from 'react';
import { motion } from 'framer-motion';

interface OakValeLogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

const OakValeLogo: React.FC<OakValeLogoProps> = ({
  className = '',
  size = 56,
  animate = true
}) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={animate ? { scale: 1.05 } : {}}
    >
      <img
        src="/Oak & Vale Homes Logo (Upscaled) - 2.png"
        alt="Oak & Vale Homes"
        width={size}
        height={size}
        className="drop-shadow-lg"
      />
    </motion.div>
  );
};

export default OakValeLogo;

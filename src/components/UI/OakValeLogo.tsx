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
      whileHover={animate ? { scale: 1.05, rotate: 5 } : {}}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="95"
          fill="url(#circleGradient)"
          stroke="#D97706"
          strokeWidth="3"
          initial={animate ? { scale: 0 } : {}}
          animate={animate ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.g
          filter="url(#glow)"
          initial={animate ? { opacity: 0, y: 10 } : {}}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <path
            d="M100 140 L100 85"
            stroke="url(#treeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <ellipse
            cx="100"
            cy="50"
            rx="35"
            ry="30"
            fill="url(#treeGradient)"
            opacity="0.9"
          />

          <circle cx="80" cy="60" r="22" fill="url(#treeGradient)" opacity="0.85" />
          <circle cx="120" cy="60" r="22" fill="url(#treeGradient)" opacity="0.85" />
          <circle cx="70" cy="75" r="18" fill="url(#treeGradient)" opacity="0.8" />
          <circle cx="130" cy="75" r="18" fill="url(#treeGradient)" opacity="0.8" />
          <circle cx="100" cy="80" r="25" fill="url(#treeGradient)" opacity="0.9" />

          <path
            d="M85 140 Q75 145 70 155 L75 160 Q80 150 85 145 Z"
            fill="#B45309"
          />
          <path
            d="M115 140 Q125 145 130 155 L125 160 Q120 150 115 145 Z"
            fill="#B45309"
          />

          <circle cx="75" cy="50" r="3" fill="#FBBF24" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="125" cy="50" r="3" fill="#FBBF24" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="40" r="3" fill="#FBBF24" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1s" repeatCount="indefinite" />
          </circle>
        </motion.g>
      </svg>
    </motion.div>
  );
};

export default OakValeLogo;

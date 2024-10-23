"use client"

import React from 'react';
import { motion } from 'framer-motion';

const APTCoinsLogo = () => {
  return (
    <div className="flex items-center">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mr-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="url(#blue-gradient)" strokeWidth="2"/>
          <circle cx="12" cy="12" r="7" fill="url(#blue-gradient)"/>
          <path d="M12 6V8M12 16V18M6 12H8M16 12H18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <defs>
            <linearGradient id="blue-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        APTCoins
      </span>
    </div>
  );
};

export default APTCoinsLogo;
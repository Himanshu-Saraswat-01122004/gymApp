'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

interface MotivationalQuoteProps {
  firstName: string;
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ firstName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      className="text-center bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-12 rounded-3xl border border-white/10 backdrop-blur-sm"
    >
      <div className="p-4 bg-purple-500/20 rounded-full w-fit mx-auto mb-6">
        <FaCheckCircle className="text-4xl text-purple-400" />
      </div>
      <blockquote className="text-2xl md:text-3xl font-bold text-white mb-4">
        &quot;The only bad workout is the one that didn&apos;t happen.&quot;
      </blockquote>
      <p className="text-gray-400 text-lg">Keep pushing your limits, {firstName}. Every rep counts!</p>
    </motion.div>
  );
};

export default MotivationalQuote;

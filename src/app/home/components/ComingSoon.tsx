'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa';

const ComingSoon = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="text-center mb-16"
    >
      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="flex justify-center mb-6">
          <FaClock className="text-4xl text-purple-400 animate-spin-slow" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
        <p className="text-gray-400">
          Your personal dashboard with workout stats, progress tracking, and more will be available soon!
        </p>
      </div>
    </motion.div>
  );
};

export default ComingSoon;

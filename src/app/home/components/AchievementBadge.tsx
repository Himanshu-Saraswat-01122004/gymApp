'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AchievementBadge = ({ icon: Icon, title, progress, color }: {
  icon: React.ElementType;
  title: string;
  progress: number;
  color: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300 group"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 ${color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="text-white text-lg" />
      </div>
      <span className="text-white font-medium text-sm">{title}</span>
    </div>
    <div className="w-full bg-gray-700/50 rounded-full h-2">
      <motion.div
        className={`h-2 rounded-full ${color.replace('bg-', 'bg-gradient-to-r from-').replace('/20', '/60')} to-purple-500`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
    <p className="text-xs text-gray-400 mt-1">{progress}% Complete</p>
  </motion.div>
);

export default AchievementBadge;

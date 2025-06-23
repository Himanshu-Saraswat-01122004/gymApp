'use client';

import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ icon: Icon, title, value, color, bgColor }: {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
  bgColor: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`${bgColor} p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group cursor-pointer`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold ${color} mt-1`}>{value}</p>
      </div>
      <div className={`p-4 ${bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`text-2xl ${color}`} />
      </div>
    </div>
  </motion.div>
);

export default StatsCard;

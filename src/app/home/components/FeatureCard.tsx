'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, color }: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300 group"
  >
    <div className={`p-4 ${color} rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="text-2xl text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

export default FeatureCard;

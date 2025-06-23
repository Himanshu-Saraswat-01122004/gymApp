'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaArrowRight } from 'react-icons/fa';

const WorkoutCard = ({ title, exercises, color, bgGradient }: {
  title: string;
  exercises: string;
  color: string;
  bgGradient: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`${bgGradient} p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group cursor-pointer`}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <FaPlay className={`${color} group-hover:scale-110 transition-transform duration-300`} />
    </div>
    <p className="text-gray-300 text-sm">{exercises} exercises</p>
    <div className="mt-4 flex items-center text-purple-300 text-sm font-medium">
      <span>Start Workout</span>
      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
    </div>
  </motion.div>
);

export default WorkoutCard;

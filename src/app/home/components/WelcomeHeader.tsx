'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaPlay, FaChartLine, FaUtensils } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface WelcomeHeaderProps {
  greeting: string;
  firstName: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ greeting, firstName }) => {
  const router = useRouter();

  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-block p-3 bg-purple-500/20 rounded-full mb-6"
      >
        <FaDumbbell className="text-4xl text-purple-400" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-6xl md:text-7xl font-bold mb-6"
      >
        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {greeting},
        </span>
        <br />
        <span className="text-white">{firstName}!</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
      >
        Ready to crush your fitness goals? Let&apos;s make today count with an amazing workout session!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-purple-500/25"
        >
          <FaPlay /> Start Today&apos;s Workout
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/dashboard')}
          className="bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3 cursor-pointer"
        >
          <FaChartLine /> View Progress
        </motion.button>

        <a
          href="http://157.245.101.60:7436/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-green-500/25"
          >
            <FaUtensils /> Find Your Meal Plan
          </motion.button>
        </a>
      </motion.div>
    </div>
  );
};

export default WelcomeHeader;

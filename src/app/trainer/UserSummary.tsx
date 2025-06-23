'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaWeight, FaChartLine, FaArrowUp, FaArrowDown, FaExchangeAlt } from 'react-icons/fa';

interface BMIData {
  weight: number;
  timestamp: string;
  bmi: number;
  category: string;
}

interface UserData {
  userId: string;
  name: string;
  bmiData: BMIData[];
}

interface UserSummaryProps {
  user: UserData;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, unit, colorClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800/70 p-4 rounded-lg flex items-center"
  >
    <div className={`mr-4 p-3 rounded-full ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-bold text-white">{value} <span className="text-sm font-normal text-gray-400">{unit}</span></p>
    </div>
  </motion.div>
);

const UserSummary: React.FC<UserSummaryProps> = ({ user }) => {
  if (!user || !user.bmiData || user.bmiData.length === 0) {
    return null;
  }

  const sortedData = [...user.bmiData].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const startingWeight = sortedData[0].weight;
  const currentWeight = sortedData[sortedData.length - 1].weight;
  const weightChange = currentWeight - startingWeight;

  const bmis = sortedData.map(d => d.bmi);
  const highestBMI = Math.max(...bmis);
  const lowestBMI = Math.min(...bmis);

  const getWeightChangeIcon = () => {
    if (weightChange < 0) return <FaArrowDown className="text-green-300" />;
    if (weightChange > 0) return <FaArrowUp className="text-red-300" />;
    return <FaExchangeAlt className="text-gray-300" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={<FaWeight size={20} />} label="Starting Weight" value={startingWeight.toFixed(1)} unit="kg" colorClass="bg-blue-500/20 text-blue-400" />
        <StatCard icon={<FaWeight size={20} />} label="Current Weight" value={currentWeight.toFixed(1)} unit="kg" colorClass="bg-green-500/20 text-green-400" />
        <StatCard icon={getWeightChangeIcon()} label="Weight Change" value={weightChange.toFixed(1)} unit="kg" colorClass="bg-purple-500/20 text-purple-400" />
        <StatCard icon={<FaChartLine size={20} />} label="Highest BMI" value={highestBMI.toFixed(2)} unit="" colorClass="bg-red-500/20 text-red-400" />
        <StatCard icon={<FaChartLine size={20} />} label="Lowest BMI" value={lowestBMI.toFixed(2)} unit="" colorClass="bg-yellow-500/20 text-yellow-400" />
      </div>
    </motion.div>
  );
};

export default UserSummary;

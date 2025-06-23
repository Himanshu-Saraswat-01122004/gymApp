'use client';

import React from 'react';
import { motion } from 'framer-motion';

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

interface UserDataTableProps {
  user: UserData;
}

const UserDataTable: React.FC<UserDataTableProps> = ({ user }) => {
  if (!user || !user.bmiData || user.bmiData.length === 0) {
    return null;
  }

  const sortedBmiData = [...user.bmiData].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        BMI History for <span className="text-purple-400">{user.name}</span>
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800/50">
            <tr>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Date</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Weight (kg)</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">BMI</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedBmiData.map((entry, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-gray-700/50"
              >
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-400">{new Date(entry.timestamp).toLocaleDateString()}</td>
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-400">{entry.weight.toFixed(1)}</td>
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-400">{entry.bmi.toFixed(2)}</td>
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-400">{entry.category}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserDataTable;

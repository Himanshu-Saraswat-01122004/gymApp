"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaWeight, FaUserCircle, FaTrophy } from 'react-icons/fa';
import axios from 'axios';
import BMIAnalysis from './BMIAnalysis';

interface BMIEntry {
  weight: number;
  timestamp: string;
}

export default function BMIDashboard() {
  const { data: session } = useSession();
  const [weight, setWeight] = useState('');
  const [bmiData, setBmiData] = useState<any[]>([]);
  const [height, setHeight] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchBMIData();
  }, []);

  const fetchBMIData = async () => {
    try {
      const response = await axios.get('/api/bmi');
      const { height, weightEntries } = response.data;
      setHeight(height);
      setBmiData(weightEntries);
    } catch (error) {
      console.error('Error fetching BMI data:', error);
    }
  };

  const handleWeightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) {
      setError('Please enter your weight');
      return;
    }

    const weightNumber = parseFloat(weight);
    if (isNaN(weightNumber) || weightNumber <= 0) {
      setError('Please enter a valid weight (greater than 0)');
      return;
    }

    setError('');
    setSuccess('');

    try {
      await axios.post('/api/bmi', { weight: weightNumber });
      setWeight('');
      setSuccess('Weight added successfully!');
      fetchBMIData();
    } catch (error) {
      setError('Error adding weight entry. Please try again.');
      console.error('Error adding weight entry:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaWeight className="text-3xl text-purple-400" />
          <h2 className="text-2xl font-bold text-white">BMI Tracker</h2>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-gray-400"
        >
          <span>Track your BMI progress</span>
          <FaTrophy className="text-lg text-purple-400" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Weight Input Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-2xl shadow-xl border border-gray-600"
        >
          <div className="text-center mb-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 text-gray-400"
            >
              <span>Enter your weight</span>
              <FaWeight className="text-lg text-purple-400" />
            </motion.div>
          </div>
          <form onSubmit={handleWeightSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight (kg)"
                className="w-full px-4 py-3 rounded-lg bg-gray-600 border border-gray-500 focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Add Weight Entry
            </button>
          </form>
        </motion.div>

        {/* BMI Analysis */}
        <BMIAnalysis bmiData={bmiData} height={height} />
      </div>
    </div>
  );
}

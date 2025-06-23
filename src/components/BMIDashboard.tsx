"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaWeight, FaChartLine, FaUserCircle, FaTrophy } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale } from 'chart.js';
// import { TooltipItem } from 'chart.js/types/basic';
import axios from 'axios';

// Initialize Chart.js
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale
);

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

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(3);
  };

  const chartData = {
    labels: bmiData.map(entry => new Date(entry.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'BMI',
        data: bmiData.map(entry => calculateBMI(entry.weight, height || 0)),
        borderColor: '#4F46E5',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
          fontSize: 14
        }
      },
      title: {
        display: true,
        text: 'BMI Progress Over Time',
        color: '#fff',
        font: {
          size: 18
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value.toFixed(3)}`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: false,
        title: {
          display: true,
          text: 'BMI',
          color: '#fff'
        },
        ticks: {
          precision: 3,
          stepSize: 0.05,
          color: '#fff',
          callback: (value: number | string) => {
            if (typeof value === 'number') {
              return value.toFixed(3);
            }
            return value;
          }
        },
        grid: {
          color: '#444',
          drawBorder: true
        }
      },
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Date',
          color: '#fff'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          color: '#fff'
        },
        grid: {
          color: '#444',
          drawBorder: true
        }
      }
    }
  } as any;

  useEffect(() => {
    if (bmiData.length > 0) {
      const latestBMI = calculateBMI(bmiData[bmiData.length - 1].weight, height || 0);
      const latestBMINumber = parseFloat(latestBMI);
      
      // Update chart options with suggestedMin and suggestedMax
      chartOptions.scales.y.suggestedMin = latestBMINumber - 5;
      chartOptions.scales.y.suggestedMax = latestBMINumber + 5;
    }
  }, [bmiData, height]);

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
          <FaChartLine className="text-lg text-purple-400" />
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
              whileHover={{ scale: 1.1 }}
              className="text-3xl text-purple-400 mb-2"
            >
              <FaWeight />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">Add Your Weight</h3>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400 text-sm"
            >
              Track your progress by adding your current weight
            </motion.p>
          </div>
          
          <form onSubmit={handleWeightSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Current Weight (kg)</label>
              <div className="relative">
                <motion.input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  placeholder="Enter weight in kg"
                  required
                  min="0"
                  step="0.1"
                  whileFocus={{ scale: 1.02 }}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">kg</span>
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-green-500"
                >
                  {success}
                </motion.p>
              )}
            </div>
            <motion.button
              type="submit"
              className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md hover:from-purple-700 hover:to-purple-800 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
              disabled={error !== ''}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {error ? 'Fix Error' : 'Add Weight'}
            </motion.button>
          </form>
        </motion.div>

        {/* BMI Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">BMI Progress</h2>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="text-2xl text-purple-400"
            >
              <FaChartLine />
            </motion.div>
          </div>
          <div className="h-[400px]">
            {bmiData.length > 0 ? (
              <Line
                data={chartData}
                options={chartOptions}
              />
            ) : (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-400"
              >
                No data yet. Add your first weight entry!
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

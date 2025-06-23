"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale } from 'chart.js';
import { FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

interface BMIAnalysisProps {
  bmiData: BMIEntry[];
  height: number | null;
}

export default function BMIAnalysis({ bmiData, height }: BMIAnalysisProps) {
  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(3);
  };

  // BMI Categories
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  // Calculate statistics
  const latestBMI = bmiData.length > 0 ? calculateBMI(bmiData[bmiData.length - 1].weight, height || 0) : 'N/A';
  const latestBMICategory = bmiData.length > 0 ? getBMICategory(parseFloat(latestBMI)) : 'N/A';
  const firstBMI = bmiData.length > 0 ? calculateBMI(bmiData[0].weight, height || 0) : 'N/A';
  const progress = bmiData.length > 1 ? 
    ((parseFloat(latestBMI) - parseFloat(firstBMI)) / parseFloat(firstBMI) * 100).toFixed(2) + '%' : 'N/A';

  // Chart data with categories
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
            const bmi = parseFloat(value);
            const category = getBMICategory(bmi);
            return `${label}: ${value.toFixed(3)} (${category})`;
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

  return (
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
          <span>BMI Progress Analysis</span>
          <FaChartLine className="text-lg text-purple-400" />
        </motion.div>
      </div>

      {/* Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Current Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-purple-400 transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Current Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Latest BMI</span>
              <span className="text-2xl font-bold text-white">{latestBMI}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Category</span>
              <span className="text-lg font-semibold text-white">{latestBMICategory}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status</span>
              <div className="flex items-center gap-2">
                {(() => {
                  switch (latestBMICategory) {
                    case 'Underweight':
                      return <span className="text-red-400">Below Healthy Range</span>;
                    case 'Normal weight':
                      return <span className="text-green-400">Healthy Range</span>;
                    case 'Overweight':
                      return <span className="text-yellow-400">Above Healthy Range</span>;
                    case 'Obese':
                      return <span className="text-red-400">High Risk</span>;
                    default:
                      return <span className="text-gray-400">N/A</span>;
                  }
                })()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-purple-400 transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Initial BMI</span>
              <span className="text-lg font-semibold text-white">{firstBMI}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Change</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-white">{progress}</span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: progress.includes('-') ? '100%' : '100%' }}
                  transition={{ duration: 1 }}
                  className={`h-1 rounded-full ${progress.includes('-') ? 'bg-red-400' : 'bg-green-400'}`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BMI Chart */}
      <div className="h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg border border-gray-700 p-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaWeight } from 'react-icons/fa';
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
    if (!weight) return;

    try {
      await axios.post('/api/bmi', { weight: parseFloat(weight) });
      setWeight('');
      fetchBMIData();
    } catch (error) {
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
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff'
        }
      },
      title: {
        display: true,
        text: 'BMI Progress Over Time',
        color: '#fff'
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
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">BMI Tracker</h2>
        <div className="flex items-center gap-2">
          <FaWeight className="text-2xl text-purple-400" />
          <span className="text-gray-400">Track your BMI progress</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weight Input Form */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <form onSubmit={handleWeightSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Current Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter weight in kg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Weight Entry
            </button>
          </form>
        </div>

        {/* BMI Chart */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">BMI Progress</h3>
          <div className="h-[300px]">
            {bmiData.length > 0 ? (
              <Line options={chartOptions} data={chartData} />
            ) : (
              <p className="text-center text-gray-400">No data yet. Add your first weight entry!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

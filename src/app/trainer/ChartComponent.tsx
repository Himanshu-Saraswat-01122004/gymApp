'use client'

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  TooltipItem
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler // Register the Filler plugin for gradient backgrounds
);

// Interface for user BMI data
interface UserBMIData {
  userId: string;
  name: string;
  bmiData: Array<{
    weight: number;
    timestamp: string;
    bmi: number;
    category: string;
  }>;
}

// Props for the ChartComponent
interface ChartComponentProps {
  usersBMIData: UserBMIData[];
}

// Utility function to determine BMI category
const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

// Main Chart Component
const ChartComponent: React.FC<ChartComponentProps> = ({ usersBMIData }) => {
  
  // Memoize chart data to avoid recalculating on every render
  const chartData = useMemo(() => {
    // Use a predefined color palette for better aesthetics
    const colors = [
      { border: 'hsl(210, 70%, 50%)', background: 'hsla(210, 70%, 50%, 0.1)' },
      { border: 'hsl(40, 90%, 60%)', background: 'hsla(40, 90%, 60%, 0.1)' },
      { border: 'hsl(160, 70%, 45%)', background: 'hsla(160, 70%, 45%, 0.1)' },
      { border: 'hsl(340, 80%, 60%)', background: 'hsla(340, 80%, 60%, 0.1)' },
      { border: 'hsl(280, 70%, 65%)', background: 'hsla(280, 70%, 65%, 0.1)' },
    ];

    return {
      labels: usersBMIData.length > 0 ? usersBMIData[0].bmiData.map(entry => new Date(entry.timestamp).toLocaleDateString()) : [],
      datasets: usersBMIData.map((user, index) => {
        const color = colors[index % colors.length];
        return {
          label: user.name,
          data: user.bmiData.map(entry => entry.bmi),
          borderColor: color.border,
          backgroundColor: color.background, // For gradient fill
          tension: 0.4,
          fill: true, // Enable the fill
          pointBackgroundColor: color.border,
          pointHoverBorderColor: '#fff',
          pointHoverRadius: 6,
        };
      })
    };
  }, [usersBMIData]);

  // Memoize chart options
  const chartOptions = useMemo((): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: usersBMIData.length <= 10, // Only show legend for 10 or fewer users
        position: 'top' as const,
        labels: {
          color: '#e5e7eb', // Lighter gray for better contrast
          font: {
            size: 14,
            family: 'inherit'
          },
          padding: 20,
        }
      },
      title: {
        display: true,
        text: 'BMI Progress of All Users',
        color: '#ffffff',
        font: {
          size: 20,
          weight: 'bold',
          family: 'inherit'
        },
        padding: {
          bottom: 20,
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.8)', // Darker, theme-aligned tooltip
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        titleColor: '#e5e7eb',
        bodyColor: '#d1d5db',
        padding: 12,
        boxPadding: 4,
        callbacks: {
          label: function(context: TooltipItem<'line'>) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (value === null) return label;
            const category = getBMICategory(value);
            return `${label}: ${value.toFixed(2)} (${category})`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false, // Start axis closer to the data for better readability
        ticks: {
          color: '#9ca3af',
          precision: 1
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.08)',

        }
      },
      x: {
        ticks: {
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.08)',

        }
      }
    }
  }), [usersBMIData.length]); // Re-evaluate when the number of users changes

  // Handle empty state
  if (!usersBMIData || usersBMIData.length === 0 || usersBMIData.every(u => u.bmiData.length === 0)) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-800/50 rounded-lg">
        <p className="text-gray-400">No BMI data available to display.</p>
      </div>
    );
  }

  return <Line data={chartData} options={chartOptions} />;
};

export default ChartComponent;
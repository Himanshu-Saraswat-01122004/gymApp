"use client";
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaDumbbell, FaChartLine, FaUtensils, FaBell } from 'react-icons/fa';
import { HiOutlineCalendar, HiOutlineUserGroup, HiOutlineFire } from 'react-icons/hi';
import { HiOutlineSun, HiOutlineCloud, HiOutlineBell } from 'react-icons/hi';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import axios from 'axios';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [motivationQuote, setMotivationQuote] = useState('');
  const [streak, setStreak] = useState(15);
  const [weather, setWeather] = useState({
    icon: 'sunny',
    temperature: 25,
    condition: 'Sunny'
  });

  // Initialize Chart.js
  useEffect(() => {
    ChartJS.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale
    );
  }, []);

  const progressOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Progress Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  } as const;

  const progressData = {
    labels: ['1M', '2M', '3M', '4M', '5M', '6M', '7M'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [65, 63, 62, 61, 60, 59, 58],
        borderColor: '#3B82F6',
        tension: 0.4,
      },
      {
        label: 'BMI',
        data: [25, 24.5, 24, 23.5, 23, 22.5, 22],
        borderColor: '#10B981',
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    // Change quote every 5 seconds
    const interval = setInterval(() => {
      const quotes = [
        "The only bad workout is the one that didn't happen.",
        "Sweat is just fat crying.",
        "The pain you feel today will be the strength you feel tomorrow.",
        "Train insane or remain the same."
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setMotivationQuote(randomQuote);
    }, 5000);

    return () => clearInterval(interval);
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-4xl font-bold mb-4">Welcome to Your Fitness Journey</div>
          <div className="text-xl text-gray-400">Loading your personalized dashboard...</div>
          <div className="mt-4">
            <div className="w-16 h-16 border-4 border-white rounded-full animate-spin"></div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="w-full max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-2">Welcome, {session?.user?.name || 'User'}!</h1>
          <p className="text-xl text-gray-400">Your Personal Fitness Dashboard</p>
          <div className="mt-8">
            <div className="flex gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-4 rounded-lg flex items-center gap-3"
              >
                <HiOutlineCalendar className="text-2xl" />
                <div>
                  <p className="text-sm text-gray-400">Current Streak</p>
                  <h3 className="text-2xl font-bold">{streak} days</h3>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-4 rounded-lg flex items-center gap-3"
              >
                <HiOutlineFire className="text-2xl" />
                <div>
                  <p className="text-sm text-gray-400">Level</p>
                  <h3 className="text-2xl font-bold">5</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Weather Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Weather Conditions</h2>
              <p className="text-gray-400">Check the weather before your workout</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-4xl">
                {weather.icon === 'sunny' ? (
                  <HiOutlineSun />
                ) : weather.icon === 'cloudy' ? (
                  <HiOutlineCloud />
                ) : (
                  <HiOutlineBell />
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold">{weather.temperature}°C</h3>
                <p className="text-gray-400">{weather.condition}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Chart Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Progress Over Time</h2>
          <div className="h-[300px]">
            <Line options={progressOptions} data={progressData} />
          </div>
        </motion.div>

        {/* Goals Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Your Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Weight Loss</h3>
              <p className="text-gray-400">Lose 10kg in 3 months</p>
              <div className="w-full bg-gray-600 rounded-full h-2.5 mt-4">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Strength Gain</h3>
              <p className="text-gray-400">Increase bench press by 20kg</p>
              <div className="w-full bg-gray-600 rounded-full h-2.5 mt-4">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Endurance</h3>
              <p className="text-gray-400">Run 5km in under 25 minutes</p>
              <div className="w-full bg-gray-600 rounded-full h-2.5 mt-4">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Community Feed Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Community Feed</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src="/user1.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-bold">JohnDoe</h3>
                  <p className="text-gray-400">Just completed a 5km run!</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src="/user2.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-bold">JaneSmith</h3>
                  <p className="text-gray-400">New personal best in deadlift!</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <HiOutlineFire className="text-4xl mb-2" />
            <h3 className="text-2xl font-bold mb-2">200</h3>
            <p className="text-gray-400">Total Workouts</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <HiOutlineCalendar className="text-4xl mb-2" />
            <h3 className="text-2xl font-bold mb-2">{streak} days</h3>
            <p className="text-gray-400">Current Streak</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <HiOutlineUserGroup className="text-4xl mb-2" />
            <h3 className="text-2xl font-bold mb-2">5</h3>
            <p className="text-gray-400">Level</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <FaChartLine className="text-4xl mb-2" />
            <h3 className="text-2xl font-bold mb-2">85%</h3>
            <p className="text-gray-400">Monthly Progress</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Workout Plan Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <FaDumbbell className="text-4xl mr-3" />
              <h2 className="text-2xl font-bold">Workout Plan</h2>
            </div>
            <p className="text-gray-400 mb-4">Your personalized workout schedule for the week.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
              View Plan
            </button>
          </motion.div>

          {/* Progress Tracking Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <FaChartLine className="text-4xl mr-3" />
              <h2 className="text-2xl font-bold">Progress Tracking</h2>
            </div>
            <p className="text-gray-400 mb-4">Monitor your gains and track your personal bests.</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
              View Stats
            </button>
          </motion.div>

          {/* Meal Suggestions Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <FaUtensils className="text-4xl mr-3" />
              <h2 className="text-2xl font-bold">Meal Suggestions</h2>
            </div>
            <p className="text-gray-400 mb-4">Get diet plans and meal ideas to match your goals.</p>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Get Meals
            </button>
          </motion.div>
        </div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg text-center mb-8"
        >
          <p className="text-xl italic text-gray-400">"{motivationQuote}"</p>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Start Workout
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Log Meal
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Add Weight
          </button>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Welcome, {session?.user?.name || 'User'}!</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder Card 1: Workout Plan */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Workout Plan</h2>
            <p>Your personalized workout schedule for the week.</p>
          </div>

          {/* Placeholder Card 2: Progress Tracking */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Progress Tracking</h2>
            <p>Monitor your gains and track your personal bests.</p>
          </div>

          {/* Placeholder Card 3: Meal Suggestions */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Meal Suggestions</h2>
            <p>Get diet plans and meal ideas to match your goals.</p>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // or a redirect component, but useEffect handles it
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Welcome, {session?.user?.name || 'User'}!</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder Card 1: Workout Plan */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Workout Plan</h2>
            <p>Your personalized workout schedule for the week.</p>
          </div>

          {/* Placeholder Card 2: Progress Tracking */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Progress Tracking</h2>
            <p>Monitor your gains and track your personal bests.</p>
          </div>

          {/* Placeholder Card 3: Meal Suggestions */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Meal Suggestions</h2>
            <p>Get diet plans and meal ideas to match your goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

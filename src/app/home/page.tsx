"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaDumbbell, 
  FaFire, 
  FaTrophy, 
  FaUsers, 
  FaChartLine, 
  FaCalendarAlt, 
  FaPlay,
  FaArrowRight,
  FaClock,
  FaHeart,
  FaBullseye,
  FaBolt,
  FaUserFriends,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';

// Quick Stats Card Component
const StatsCard = ({ icon: Icon, title, value, color, bgColor }: {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
  bgColor: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`${bgColor} p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group cursor-pointer`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold ${color} mt-1`}>{value}</p>
      </div>
      <div className={`p-4 ${bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`text-2xl ${color}`} />
      </div>
    </div>
  </motion.div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, color }: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300 group"
  >
    <div className={`p-4 ${color} rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="text-2xl text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

// Workout Category Card
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

// Achievement Badge Component
const AchievementBadge = ({ icon: Icon, title, progress, color }: {
  icon: React.ElementType;
  title: string;
  progress: number;
  color: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300 group"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 ${color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="text-white text-lg" />
      </div>
      <span className="text-white font-medium text-sm">{title}</span>
    </div>
    <div className="w-full bg-gray-700/50 rounded-full h-2">
      <motion.div
        className={`h-2 rounded-full ${color.replace('bg-', 'bg-gradient-to-r from-').replace('/20', '/60')} to-purple-500`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
    <p className="text-xs text-gray-400 mt-1">{progress}% Complete</p>
  </motion.div>
);

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500 mx-auto"></div>
            <div className="animate-ping absolute inset-0 rounded-full h-20 w-20 border-4 border-purple-300 opacity-20"></div>
          </div>
          <p className="text-white text-xl mt-6 font-medium">Loading your fitness journey...</p>
        </div>
      </div>
    );
  }

  const firstName = session?.user?.name?.split(' ')[0] || 'Athlete';
  const currentHour = currentTime.getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:40px_40px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
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
              Ready to crush your fitness goals? Let's make today count with an amazing workout session!
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
                <FaPlay /> Start Today's Workout
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard')}
                className="bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <FaChartLine /> View Progress
              </motion.button>
            </motion.div>
          </div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mb-16"
          >
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex justify-center mb-6">
                <FaClock className="text-4xl text-purple-400 animate-spin-slow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-gray-400">
                Your personal dashboard with workout stats, progress tracking, and more will be available soon!
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 pb-16">


        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-12 rounded-3xl border border-white/10 backdrop-blur-sm"
        >
          <div className="p-4 bg-purple-500/20 rounded-full w-fit mx-auto mb-6">
            <FaCheckCircle className="text-4xl text-purple-400" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-bold text-white mb-4">
            "The only bad workout is the one that didn't happen."
          </blockquote>
          <p className="text-gray-400 text-lg">Keep pushing your limits, {firstName}. Every rep counts!</p>
        </motion.div>
      </div>
    </div>
  );
}
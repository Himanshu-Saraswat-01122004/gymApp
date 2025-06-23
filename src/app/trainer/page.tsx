'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ChartComponent from './ChartComponent';

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

export default function TrainerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [usersBMIData, setUsersBMIData] = React.useState<UserBMIData[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [refreshKey, setRefreshKey] = React.useState(0)





  React.useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role !== 'TRAINER') {
        router.push('/')
        return
      }
      
      let isMounted = true;

      const fetchBMIData = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await fetch(`/api/trainer/bmi?cache=${refreshKey}`);
          if (!response.ok) {
            throw new Error('Failed to fetch BMI data');
          }
          const data = await response.json();
          // console.log(data)
          if (isMounted) {
            setUsersBMIData(data);
          }
        } catch (error) {
          console.error('Error fetching BMI data:', error);
          if (isMounted) {
            setError('Failed to load BMI data. Please try again.');
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      fetchBMIData();

      return () => {
        isMounted = false;
      };
    }
  }, [session, status, router, refreshKey])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/')
    return null
  }

  if (status === 'authenticated' && session?.user?.role !== 'TRAINER') {
    router.push('/')
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  if (status === 'authenticated' && session?.user?.role === 'TRAINER') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-white mb-4">Trainer Dashboard</h1>
            <p className="text-lg text-gray-400 mb-8">Monitor all users' BMI progress.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">BMI Progress Chart</h2>
              <div className="flex items-center space-x-2 text-purple-400">
                <FaChartLine className="text-2xl" />
                <span className="text-sm font-medium">Real-time Data</span>
              </div>
            </div>
            
            <div className="h-[600px]">
              <ChartComponent usersBMIData={usersBMIData} />
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return null
}

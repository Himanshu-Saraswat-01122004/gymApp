'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaChartLine, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ChartComponent from './ChartComponent';
import UserDataTable from './UserDataTable';
import UserSummary from './UserSummary';

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
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role !== 'TRAINER') {
        router.push('/');
        return;
      }
      
      let isMounted = true;

      const fetchBMIData = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await fetch(`/api/trainer/bmi?cache=${Date.now()}`);
          if (!response.ok) {
            throw new Error('Failed to fetch BMI data');
          }
          const data = await response.json();
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
  }, [session, status, router]);

  const selectedUser = usersBMIData.find(user => user.userId === selectedUserId);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'TRAINER')) {
    router.push('/');
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white">Trainer Dashboard</h1>
            {session?.user?.name && (
              <p className="text-xl font-semibold text-white">
                Welcome, {session.user.name}
              </p>
            )}
          </div>
          <p className="text-lg text-gray-400 mt-2">Monitor all users&apos; BMI progress.</p>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <label htmlFor="user-select" className="flex items-center text-lg font-medium text-gray-300 mb-2">
            <FaUsers className="mr-2 text-purple-400" />
            View a Specific User&apos;s Data
          </label>
          <select
            id="user-select"
            value={selectedUserId || ''}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full max-w-xs bg-gray-800 border border-gray-700 text-white rounded-lg py-2 px-4 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">-- Select a User --</option>
            {usersBMIData.map(user => (
              <option key={user.userId} value={user.userId}>
                {user.name}
              </option>
            ))}
          </select>
        </motion.div>

        {selectedUser && (
          <>
            <UserSummary user={selectedUser} />
            <UserDataTable user={selectedUser} />
          </>
        )}
      </div>
    </div>
  );
}

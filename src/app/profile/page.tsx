"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaUser, FaVenusMars, FaRulerVertical, FaWeight, FaBullseye, FaCheckCircle, FaExclamationCircle, FaEdit, FaSave, FaStar, FaTrophy, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';

const ProfileInfoItem = ({ icon: Icon, label, value }: { icon: IconType; label: string; value: string | number }) => (
  <div className="flex items-center gap-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-xl border border-white/10 h-full backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300 group">
    <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all duration-300">
      <Icon className="text-purple-400 text-xl flex-shrink-0" />
    </div>
    <div>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
      <p className="text-xl font-bold text-white mt-1">{value || 'Not set'}</p>
    </div>
  </div>
);

const BMIDisplay = ({ height, weight }: { height: number; weight: number }) => {
  if (!height || !weight) return null;

  const heightInMeters = height / 100;
  const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
  let category = '';
  let colorClass = '';
  let bgClass = '';

  if (bmi < 18.5) { 
    category = 'Underweight'; 
    colorClass = 'text-blue-400';
    bgClass = 'from-blue-500/20 to-blue-600/20';
  } else if (bmi < 25) { 
    category = 'Healthy'; 
    colorClass = 'text-green-400';
    bgClass = 'from-green-500/20 to-green-600/20';
  } else if (bmi < 30) { 
    category = 'Overweight'; 
    colorClass = 'text-yellow-400';
    bgClass = 'from-yellow-500/20 to-yellow-600/20';
  } else { 
    category = 'Obesity'; 
    colorClass = 'text-red-400';
    bgClass = 'from-red-500/20 to-red-600/20';
  }

  return (
    <div className={`bg-gradient-to-br ${bgClass} p-6 rounded-xl border border-white/10 col-span-1 md:col-span-2 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300`}>
      <p className="text-sm text-gray-400 mb-4 text-center font-medium">Body Mass Index (BMI)</p>
      <div className="flex items-center justify-center gap-6">
        <div className={`text-5xl font-bold ${colorClass}`}>{bmi}</div>
        <div className="text-center">
          <div className={`font-bold text-xl ${colorClass}`}>{category}</div>
          <div className="text-sm text-gray-400 mt-1">Category</div>
        </div>
      </div>
    </div>
  );
};

const ProfileCompletion = ({ formData }: { formData: { [key: string]: string | number } }) => {
  const fields = ['age', 'gender', 'height', 'weight', 'goals', 'benchPress', 'squat', 'deadlift'];
  const filledFields = fields.filter(field => formData[field] && formData[field] !== '').length;
  const completion = Math.round((filledFields / fields.length) * 100);

  return (
    <div className="mb-8 bg-gradient-to-r from-gray-800/40 to-gray-900/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg font-bold text-white">Profile Completion</p>
        <p className="text-lg font-bold text-purple-300">{completion}%</p>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${completion}%` }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </div>
      <p className="text-sm text-gray-400 mt-2">Complete your profile to unlock all features</p>
    </div>
  );
};

const MembershipStatus = () => (
  <div className="space-y-4">
    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
      <div className="p-2 bg-yellow-500/20 rounded-lg">
        <FaStar className="text-yellow-400" />
      </div>
      Membership
    </h3>
    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-8 rounded-xl border border-yellow-400/20 text-center backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300">
      <div className="flex items-center justify-center gap-2 mb-4">
        <FaStar className="text-yellow-400 text-2xl" />
        <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Premium Plan</p>
      </div>
      <p className="text-gray-300 mb-6 text-lg">Renews on: 24 July, 2024</p>
      <button className="w-full py-3 px-6 rounded-xl font-bold transition-all bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 hover:from-yellow-500/30 hover:to-orange-500/30 text-white hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20">
        Manage Subscription
      </button>
    </div>
  </div>
);

const BestLiftCard = ({ exercise, weight }: { exercise: string; weight: string }) => (
  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-xl border border-white/10 text-center flex flex-col justify-center items-center h-full backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300 group">
    <div className="p-3 bg-purple-500/20 rounded-lg mb-3 group-hover:bg-purple-500/30 transition-all duration-300">
      <FaTrophy className="text-purple-400 text-xl" />
    </div>
    <p className="text-sm text-gray-400 font-medium mb-2">{exercise}</p>
    <p className="text-2xl font-bold text-white">{weight}</p>
  </div>
);

const PersonalBests = ({ formData }: { formData: { benchPress?: string, squat?: string, deadlift?: string } }) => (
  <div className="space-y-4">
    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
      <div className="p-2 bg-purple-500/20 rounded-lg">
        <FaTrophy className="text-purple-400" />
      </div>
      Personal Bests
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BestLiftCard exercise="Bench Press" weight={formData.benchPress ? `${formData.benchPress} kg` : 'Not set'} />
      <BestLiftCard exercise="Squat" weight={formData.squat ? `${formData.squat} kg` : 'Not set'} />
      <BestLiftCard exercise="Deadlift" weight={formData.deadlift ? `${formData.deadlift} kg` : 'Not set'} />
    </div>
  </div>
);

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', height: '', weight: '', goals: '', createdAt: '', benchPress: '', squat: '', deadlift: '' });
  const [originalFormData, setOriginalFormData] = useState({ name: '', age: '', gender: '', height: '', weight: '', goals: '', createdAt: '', benchPress: '', squat: '', deadlift: '' });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    else if (status === 'authenticated') {
      const fetchProfile = async () => {
        try {
          const res = await fetch('/api/profile');
          if (!res.ok) throw new Error('Failed to fetch profile');
          const data = await res.json();
          const profileData = { name: data.name || '', age: data.age || '', gender: data.gender || '', height: data.height || '', weight: data.weight || '', goals: data.goals || '', createdAt: data.createdAt || '', benchPress: data.benchPress || '', squat: data.squat || '', deadlift: data.deadlift || '' };
          setFormData(profileData);
          setOriginalFormData(profileData);
        } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred'); }
      };
      fetchProfile();
    }
  }, [status, router]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(originalFormData);
    setIsEditMode(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      const updatedData = await res.json();
      setSuccess('Profile updated successfully!');
      const newUserData = updatedData.user;
      setOriginalFormData(newUserData);
      setFormData(newUserData);
      setIsEditMode(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-xl">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="w-full max-w-7xl bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Profile Sidebar */}
          <div className="flex-shrink-0 flex flex-col items-center gap-8 w-full lg:w-1/3 bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-10 rounded-3xl border border-white/10 shadow-xl backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500">
            <div className="relative group">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile Picture"
                  width={160}
                  height={160}
                  className="rounded-full ring-4 ring-purple-500/30 shadow-2xl group-hover:ring-purple-400/50 transition-all duration-300"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-7xl font-bold text-white shadow-2xl ring-4 ring-purple-500/30 group-hover:ring-purple-400/50 transition-all duration-300">
                  {formData.name && formData.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-900 shadow-lg" title="Online"></div>
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white">{formData.name || 'User'}</h1>
              <div className="flex items-center justify-center gap-3 text-purple-300 font-medium bg-purple-500/10 px-4 py-2 rounded-full">
                <FaEnvelope className="text-lg" />
                <span className="text-sm">{session?.user?.email}</span>
              </div>
              {formData.createdAt && (
                <div className="flex items-center justify-center gap-3 text-sm text-gray-400 bg-gray-700/20 px-4 py-2 rounded-full">
                  <FaCalendarAlt />
                  <span>Member since {new Date(formData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Profile Details</h2>
              {!isEditMode && (
                <motion.button 
                  onClick={() => setIsEditMode(true)} 
                  className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEdit /> Edit Profile
                </motion.button>
              )}
            </div>

            {/* Success/Error Messages */}
            <div className="h-16 mb-6 flex items-center justify-center">
              <AnimatePresence>
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20, scale: 0.9 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 20, scale: 0.9 }} 
                    className="bg-green-500/20 text-green-300 p-4 rounded-xl flex items-center justify-center gap-3 text-base border border-green-500/30 backdrop-blur-sm"
                  >
                    <FaCheckCircle className="text-xl" /> 
                    <span>{success}</span>
                  </motion.div>
                )}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20, scale: 0.9 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 20, scale: 0.9 }} 
                    className="bg-red-500/20 text-red-300 p-4 rounded-xl flex items-center justify-center gap-3 text-base border border-red-500/30 backdrop-blur-sm"
                  >
                    <FaExclamationCircle className="text-xl" /> 
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {isEditMode ? (
                <motion.form 
                  key="edit-form" 
                  onSubmit={handleSubmit} 
                  className="space-y-8" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <input 
                        type="number" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                        placeholder="Age" 
                        className="w-full bg-gray-800/50 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm hover:border-purple-400/50" 
                      />
                    </div>
                    <div className="relative group">
                      <FaVenusMars className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange} 
                        className="w-full bg-gray-800/50 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none transition-all backdrop-blur-sm hover:border-purple-400/50"
                      >
                        <option value="" disabled>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="relative group">
                      <FaRulerVertical className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <input 
                        type="number" 
                        name="height" 
                        value={formData.height} 
                        onChange={handleChange} 
                        placeholder="Height (cm)" 
                        className="w-full bg-gray-800/50 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm hover:border-purple-400/50" 
                      />
                    </div>
                    <div className="relative group">
                      <FaWeight className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <input 
                        type="number" 
                        name="weight" 
                        value={formData.weight} 
                        onChange={handleChange} 
                        placeholder="Weight (kg)" 
                        className="w-full bg-gray-800/50 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm hover:border-purple-400/50" 
                      />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <FaBullseye className="absolute top-6 left-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    <textarea 
                      name="goals" 
                      value={formData.goals} 
                      onChange={handleChange} 
                      placeholder="Fitness Goals" 
                      rows={4} 
                      className="w-full bg-gray-800/50 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm hover:border-purple-400/50"
                    />
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-6 rounded-xl border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <FaTrophy className="text-purple-400" />
                      </div>
                      Personal Bests (kg)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="relative group">
                        <FaTrophy className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        <input 
                          type="number" 
                          name="benchPress" 
                          value={formData.benchPress} 
                          onChange={handleChange} 
                          placeholder="Bench Press" 
                          className="w-full bg-gray-800/50 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm hover:border-purple-400/50" 
                        />
                      </div>
                      <div className="relative group">
                        <FaTrophy className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        <input 
                          type="number" 
                          name="squat" 
                          value={formData.squat} 
                          onChange={handleChange} 
                          placeholder="Squat" 
                          className="w-full bg-gray-800/50 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm hover:border-purple-400/50" 
                        />
                      </div>
                      <div className="relative group">
                        <FaTrophy className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        <input 
                          type="number" 
                          name="deadlift" 
                          value={formData.deadlift} 
                          onChange={handleChange} 
                          placeholder="Deadlift" 
                          className="w-full bg-gray-800/50 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm hover:border-purple-400/50" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <motion.button 
                      type="button" 
                      onClick={handleCancel} 
                      className="py-3 px-8 font-bold text-white bg-gray-600/50 rounded-xl hover:bg-gray-600/70 transition-all border border-gray-500/50 hover:border-gray-400"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button 
                      type="submit" 
                      disabled={isLoading} 
                      className="flex items-center gap-3 py-3 px-8 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 shadow-lg hover:shadow-purple-500/25"
                      whileHover={{ scale: isLoading ? 1 : 1.05 }}
                      whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    >
                      <FaSave /> {isLoading ? 'Saving...' : 'Save Changes'}
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="view-form" 
                  className="space-y-8" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                >
                  <ProfileCompletion formData={formData} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileInfoItem icon={FaUser} label="Age" value={formData.age} />
                    <ProfileInfoItem icon={FaVenusMars} label="Gender" value={formData.gender} />
                    <ProfileInfoItem icon={FaRulerVertical} label="Height" value={formData.height ? `${formData.height} cm` : ''} />
                    <ProfileInfoItem icon={FaWeight} label="Weight" value={formData.weight ? `${formData.weight} kg` : ''} />
                    <BMIDisplay height={Number(formData.height)} weight={Number(formData.weight)} />
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <p className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <FaBullseye className="text-blue-400" />
                      </div>
                      Fitness Goals
                    </p>
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10 min-h-[120px]">
                      <p className="text-white whitespace-pre-wrap text-lg leading-relaxed">{formData.goals || 'Not set'}</p>
                    </div>
                  </div>
                  
                  <MembershipStatus />
                  <PersonalBests formData={formData} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
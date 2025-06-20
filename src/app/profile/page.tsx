"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaUser, FaVenusMars, FaRulerVertical, FaWeight, FaBullseye, FaCheckCircle, FaExclamationCircle, FaEdit, FaSave, FaStar, FaTrophy, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';

const ProfileInfoItem = ({ icon: Icon, label, value }: { icon: IconType; label: string; value: string | number }) => (
  <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg border border-white/10 h-full">
    <Icon className="text-purple-400 text-xl flex-shrink-0" />
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value || 'Not set'}</p>
    </div>
  </div>
);

const BMIDisplay = ({ height, weight }: { height: number; weight: number }) => {
  if (!height || !weight) return null;

  const heightInMeters = height / 100;
  const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
  let category = '';
  let colorClass = '';

  if (bmi < 18.5) { category = 'Underweight'; colorClass = 'text-blue-400';
  } else if (bmi < 25) { category = 'Healthy'; colorClass = 'text-green-400';
  } else if (bmi < 30) { category = 'Overweight'; colorClass = 'text-yellow-400';
  } else { category = 'Obesity'; colorClass = 'text-red-400'; }

  return (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-white/10 col-span-1 md:col-span-2">
      <p className="text-sm text-gray-400 mb-2 text-center">Body Mass Index (BMI)</p>
      <div className="flex items-center justify-center gap-4">
        <div className={`text-4xl font-bold ${colorClass}`}>{bmi}</div>
        <div className={`font-semibold text-lg ${colorClass}`}>{category}</div>
      </div>
    </div>
  );
};

const ProfileCompletion = ({ formData }: { formData: { [key: string]: string | number } }) => {
  const fields = ['age', 'gender', 'height', 'weight', 'goals', 'benchPress', 'squat', 'deadlift'];
  const filledFields = fields.filter(field => formData[field] && formData[field] !== '').length;
  const completion = Math.round((filledFields / fields.length) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-semibold text-white">Profile Completion</p>
        <p className="text-sm font-bold text-purple-300">{completion}%</p>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${completion}%` }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

const MembershipStatus = () => (
  <div className="space-y-4">
    <h3 className="text-2xl font-bold text-white flex items-center gap-3"><FaStar /> Membership</h3>
    <div className="bg-gray-900/50 p-6 rounded-lg border border-white/10 text-center">
      <p className="text-2xl font-bold text-purple-300">Premium Plan</p>
      <p className="text-gray-400">Renews on: 24 July, 2024</p>
      <button className="mt-4 w-full py-2 px-4 rounded-lg font-semibold transition-all bg-purple-600/50 border border-purple-500 hover:bg-purple-600">
        Manage Subscription
      </button>
    </div>
  </div>
);

const BestLiftCard = ({ exercise, weight }: { exercise: string; weight: string }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-white/10 text-center flex flex-col justify-center items-center h-full">
        <p className="text-sm text-gray-400">{exercise}</p>
        <p className="text-2xl font-bold text-white mt-1">{weight}</p>
    </div>
)

const PersonalBests = ({ formData }: { formData: { benchPress?: string, squat?: string, deadlift?: string } }) => (
  <div className="space-y-4">
    <h3 className="text-2xl font-bold text-white flex items-center gap-3"><FaTrophy /> Personal Bests</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

  if (status === 'loading') return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 flex flex-col items-center gap-6 w-full md:w-1/3 bg-gray-900/50 p-8 rounded-2xl border border-white/10 shadow-lg hover:border-purple-500/50 transition-all duration-300">
            <div className="relative">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile Picture"
                  width={128}
                  height={128}
                  className="rounded-full ring-4 ring-white/20 shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-6xl font-bold text-white shadow-lg ring-4 ring-white/20">
                  {formData.name && formData.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-gray-900" title="Online"></div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">{formData.name}</h1>
              <div className="flex items-center justify-center gap-2 mt-2 text-purple-300 font-medium">
                <FaEnvelope />
                <span>{session?.user?.email}</span>
              </div>
              {formData.createdAt && (
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-400">
                  <FaCalendarAlt />
                  <span>Member since {new Date(formData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Profile Details</h2>
              {!isEditMode && (
                <motion.button onClick={() => setIsEditMode(true)} className="flex items-center gap-2 bg-purple-600/50 text-white py-2 px-4 rounded-lg border border-purple-500 hover:bg-purple-600 transition-all">
                  <FaEdit /> Edit
                </motion.button>
              )}
            </div>

            <div className="h-12 mb-4 flex items-center justify-center">
              <AnimatePresence>
                {success && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="bg-green-500/20 text-green-300 p-3 rounded-lg flex items-center justify-center gap-2 text-sm"><FaCheckCircle /> <span>{success}</span></motion.div>}
                {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="bg-red-500/20 text-red-300 p-3 rounded-lg flex items-center justify-center gap-2 text-sm"><FaExclamationCircle /> <span>{error}</span></motion.div>}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {isEditMode ? (
                <motion.form key="edit-form" onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative"><FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" /><input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="w-full bg-gray-900/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                    <div className="relative"><FaVenusMars className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" /><select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-gray-900/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"><option value="" disabled>Gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
                    <div className="relative"><FaRulerVertical className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" /><input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" className="w-full bg-gray-900/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                    <div className="relative"><FaWeight className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" /><input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" className="w-full bg-gray-900/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                  </div>
                  <div className="relative"><FaBullseye className="absolute top-5 left-4 text-gray-400" /><textarea name="goals" value={formData.goals} onChange={handleChange} placeholder="Fitness Goals" rows={4} className="w-full bg-gray-900/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea></div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3"><FaTrophy /> Personal Bests (kg)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="relative"><FaTrophy className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" /><input type="number" name="benchPress" value={formData.benchPress} onChange={handleChange} placeholder="Bench Press" className="w-full bg-gray-900/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                      <div className="relative"><FaTrophy className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" /><input type="number" name="squat" value={formData.squat} onChange={handleChange} placeholder="Squat" className="w-full bg-gray-900/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                      <div className="relative"><FaTrophy className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" /><input type="number" name="deadlift" value={formData.deadlift} onChange={handleChange} placeholder="Deadlift" className="w-full bg-gray-900/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <motion.button type="button" onClick={handleCancel} className="py-2 px-6 font-bold text-white bg-gray-600/50 rounded-lg hover:bg-gray-700 transition-all">Cancel</motion.button>
                    <motion.button type="submit" disabled={isLoading} className="flex items-center gap-2 py-2 px-6 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"><FaSave /> {isLoading ? 'Saving...' : 'Save'}</motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div key="view-form" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ProfileCompletion formData={formData} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileInfoItem icon={FaUser} label="Age" value={formData.age} />
                    <ProfileInfoItem icon={FaVenusMars} label="Gender" value={formData.gender} />
                    <ProfileInfoItem icon={FaRulerVertical} label="Height" value={formData.height ? `${formData.height} cm` : ''} />
                    <ProfileInfoItem icon={FaWeight} label="Weight" value={formData.weight ? `${formData.weight} kg` : ''} />
                    <BMIDisplay height={Number(formData.height)} weight={Number(formData.weight)} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Fitness Goals</p>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-white/10 min-h-[100px]">
                      <p className="text-white whitespace-pre-wrap">{formData.goals || 'Not set'}</p>
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

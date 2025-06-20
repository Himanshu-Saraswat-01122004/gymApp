"use client";
import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

"use client"
import Link from 'next/link';
import Dumbbell from '@/components/Dumbbell';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-500">GymApp</span>
        </h1>

        <p className="mt-3 text-2xl">
          Your ultimate fitness companion
        </p>

        <div className="mt-8 w-64 h-64">
          <Dumbbell />
        </div>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link href="/login" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-500 focus:text-blue-500">
            
              <h3 className="text-2xl font-bold">Login &rarr;</h3>
              <p className="mt-4 text-xl">
                Already a member? Log in to continue your journey.
              </p>
            
          </Link>

          <Link href="/signup" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-500 focus:text-blue-500">
            
              <h3 className="text-2xl font-bold">Signup &rarr;</h3>
              <p className="mt-4 text-xl">
                Join us today and start your fitness adventure.
              </p>
            
          </Link>
        </div>
      </main>
    </div>
  );
}

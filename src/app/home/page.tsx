"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  _id: string;
  name: string;
  email: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        setUser(res.data.data);
      } catch (error: any) {
        console.log(error.message);
        // Optionally, redirect to login if token is invalid or expired
        router.push('/login');
      }
    };

    getUserDetails();
  }, [router]);

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Welcome, {user ? user.name : 'User'}!</h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

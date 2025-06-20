"use client";

import Link from 'next/link';
import { FaDumbbell, FaUserCircle } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-900/80 backdrop-blur-md text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors">
          <FaDumbbell />
          <span>Royal Fitness</span>
        </Link>
        <nav className="space-x-4 flex items-center">
          {status === 'loading' ? (
            <div className="w-24 h-8 bg-gray-700 rounded-lg animate-pulse"></div>
          ) : session ? (
            <>
              <span className="text-gray-300">Welcome, {session.user?.name || 'User'}!</span>
              <Link href="/dashboard" className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

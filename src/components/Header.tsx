"use client";

import Link from 'next/link';
import { FaDumbbell, FaUserCircle, FaChevronDown, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Header = () => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center p-4 text-white">
        <Link href="/" className="flex items-center space-x-3 text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors">
          <FaDumbbell className="transform hover:rotate-[-15deg] transition-transform" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Royal Fitness</span>
        </Link>
        <nav className="space-x-2 flex items-center">
          {status === 'loading' ? (
            <div className="w-36 h-9 bg-gray-700/50 rounded-lg animate-pulse"></div>
          ) : session ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-full hover:bg-gray-700/80 transition-colors"
              >
                <FaUserCircle className="text-purple-400" />
                <span className="font-semibold">{session.user?.name || 'User'}</span>
                <FaChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                  >
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600 hover:text-white transition-colors">Dashboard</Link>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })} 
                      className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-transparent border border-purple-500 rounded-lg hover:bg-purple-500/20 transition-all">
                <FaSignInAlt /> Login
              </Link>
              <Link href="/signup" className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
                <FaUserPlus /> Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

"use client";

import { FaGithub, FaTwitter, FaLinkedin, FaDumbbell } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-purple-400">
              <FaDumbbell />
              <span>Royal Fitness</span>
            </Link>
            <p className="mt-4 text-sm">Crush your fitness goals with the ultimate workout companion.</p>
            <p className="mt-4 text-xs text-gray-500">&copy; {new Date().getFullYear()} Royal Fitness. All rights reserved.</p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold text-white tracking-wider">Product</h3>
            <nav className="mt-4 space-y-2">
              <Link href="/#features" className="block hover:text-purple-400 transition-colors">Features</Link>
              <Link href="/pricing" className="block hover:text-purple-400 transition-colors">Pricing</Link>
              <Link href="/contact" className="block hover:text-purple-400 transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-bold text-white tracking-wider">Legal</h3>
            <nav className="mt-4 space-y-2">
              <Link href="/privacy" className="block hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-purple-400 transition-colors">Terms of Service</Link>
            </nav>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="font-bold text-white tracking-wider">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-purple-400 hover:scale-110 transition-all"><FaGithub size={24} /></a>
              <a href="#" className="hover:text-purple-400 hover:scale-110 transition-all"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-purple-400 hover:scale-110 transition-all"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

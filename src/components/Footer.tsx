"use client";

import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Royal Fitness. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-white transition-colors"><FaGithub size={24} /></a>
          <a href="#" className="hover:text-white transition-colors"><FaTwitter size={24} /></a>
          <a href="#" className="hover:text-white transition-colors"><FaLinkedin size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

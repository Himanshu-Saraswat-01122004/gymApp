"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      await axios.post("/api/auth/signup", user);
      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.status === 400) {
        toast.error(axiosError.response.data.message || "User already exists");
      } else {
        toast.error("Signup failed. Please try again.");
      }
      console.log("Signup failed", error);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1974&auto=format&fit=crop')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={backgroundStyle} className="flex items-center justify-center min-h-screen text-white">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 space-y-6 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold">Create an Account</h1>
          <p className="text-gray-400">Join us and start your fitness journey</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSignup(); }} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full p-3 pl-10 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full p-3 pl-10 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full p-3 pl-10 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            Create Account
          </motion.button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400 text-sm">OR CONTINUE WITH</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <div className="space-y-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full flex items-center justify-center p-3 font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <FcGoogle size={22} className="mr-2" /> Continue with Google
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full flex items-center justify-center p-3 font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors">
                <FaFacebook size={22} className="mr-2" /> Continue with Facebook
            </motion.button>
        </div>
        <div className="text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

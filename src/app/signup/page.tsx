"use client";
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSignup = async () => {
    try {
      // Step 1: Create the user account
      await axios.post("/api/auth/signup", user);
      toast.success("Account created successfully! Logging you in...");

      // Step 2: Automatically sign in the user
      const result = await signIn('credentials', {
        redirect: false,
        email: user.email,
        password: user.password,
      });

      if (result?.error) {
        // This might happen if there's a delay or issue, redirect to login as a fallback
        toast.error("Login failed after signup. Please log in manually.");
        router.push('/login');
      } else {
        // Step 3: Redirect to the home page on successful login
        toast.success("Logged in successfully!");
        router.push('/home');
      }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div style={backgroundStyle} className="flex items-center justify-center min-h-screen text-white">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md p-8 space-y-6 bg-black/50 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-700"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-gray-400 mt-2">Join us and start your fitness journey</p>
        </motion.div>

        <motion.form 
          variants={itemVariants}
          onSubmit={(e) => { e.preventDefault(); onSignup(); }}
          className="space-y-5"
        >
          <div className="relative">
            <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full p-3 pl-12 bg-gray-800/60 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              id="name"
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full p-3 pl-12 bg-gray-800/60 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full p-3 pl-12 pr-12 bg-gray-800/60 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              id="password"
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              required
            />
            <div 
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(168, 85, 247, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300"
          >
            Create Account
          </motion.button>
        </motion.form>

        <motion.div variants={itemVariants} className="flex items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button 
              onClick={() => signIn('google', { callbackUrl: '/home' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} 
              className="w-full flex items-center justify-center p-3 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
          >
              <FcGoogle size={22} className="mr-3" /> Continue with Google
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-purple-400 hover:underline hover:text-purple-300 transition-colors">
            Log in
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDumbbell, FaChartLine, FaTrophy } from 'react-icons/fa';
import Image from 'next/image';
import ParticlesComponent from '@/components/ParticlesComponent';

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Ken Burns Effect */}
        <motion.img
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2070&auto=format&fit=crop"
          alt="Gym background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: 'reverse' }}
        />
        {/* Particles */}
        <div className="absolute inset-0 z-10">
          <ParticlesComponent id="tsparticles-hero" />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-20"></div>
        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent z-20"></div>

        {/* Content */}
        <main className="relative z-30 flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Crush Your Fitness Goals
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-2xl text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The ultimate companion to track your workouts, set new records, and transform your body. Your journey to greatness starts now.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/home">
              <motion.div
                className="px-8 py-4 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(168, 85, 247, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <FaArrowRight />
              </motion.div>
            </Link>
          </motion.div>
        </main>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold">Features Built for <span className="text-purple-400">Results</span></h2>
            <p className="text-gray-400 mt-2">Everything you need to take your fitness to the next level.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg text-center hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300"
            >
              <FaDumbbell className="text-5xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Track Workouts</h3>
              <p className="text-gray-400">Log every set, rep, and weight to monitor your progress with precision.</p>
            </motion.div>
            {/* Feature Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg text-center hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300"
            >
              <FaChartLine className="text-5xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Visualize Progress</h3>
              <p className="text-gray-400">See your strength gains and body changes with intuitive charts and graphs.</p>
            </motion.div>
            {/* Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg text-center hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300"
            >
              <FaTrophy className="text-5xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Set & Crush Goals</h3>
              <p className="text-gray-400">Define your fitness goals and stay motivated with personalized milestones.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold">What Our <span className="text-pink-500">Members</span> Say</h2>
            <p className="text-gray-400 mt-2">Real stories from real people who transformed their lives.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900 p-8 rounded-lg shadow-lg"
            >
              <p className="text-gray-300 italic">&quot;This app is a game-changer. The workout tracking is so intuitive, and seeing my progress in the charts keeps me motivated every single day.&quot;</p>
              <div className="flex items-center mt-4">
                <Image className="w-12 h-12 rounded-full mr-4 object-cover" src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=200" alt="User avatar" width={48} height={48} />
                <div>
                  <p className="font-bold text-white">Rohan Sharma</p>
                  <p className="text-sm text-gray-500">College Student</p>
                </div>
              </div>
            </motion.div>
            {/* Testimonial Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900 p-8 rounded-lg shadow-lg"
            >
              <p className="text-gray-300 italic">&quot;I&apos;ve tried many fitness apps, but none have the community feel and goal-setting features of GymApp. I&apos;ve finally hit my weight loss target!&quot;</p>
              <div className="flex items-center mt-4">
                <Image className="w-12 h-12 rounded-full mr-4 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" alt="User avatar" width={48} height={48} />
                <div>
                  <p className="font-bold text-white">Priya Patel</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </motion.div>
            {/* Testimonial Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gray-900 p-8 rounded-lg shadow-lg"
            >
              <p className="text-gray-300 italic">&quot;As a professional trainer, I recommend this app to all my clients. It&apos;s the perfect tool to stay accountable and see real, measurable results.&quot;</p>
              <div className="flex items-center mt-4">
                <Image className="w-12 h-12 rounded-full mr-4 object-cover" src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=200" alt="User avatar" width={48} height={48} />
                <div>
                  <p className="font-bold text-white">Vikram Singh</p>
                  <p className="text-sm text-gray-500">Certified Fitness Coach</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Ready to Transform Your Body?</h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">Join a community of fitness enthusiasts who are crushing their goals every day. Your journey to a stronger, healthier you is just one click away.</p>
            <div className="mt-8">
              <Link href="/signup" passHref>
                <motion.a
                  className="px-10 py-5 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300 inline-flex items-center gap-2 text-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px rgba(168, 85, 247, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join the Community Today <FaArrowRight />
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

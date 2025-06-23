'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaTimes, FaPlay } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const media = [
  { type: 'image', src: '/media/gym1.jpeg' },
  { type: 'image', src: '/media/gym2.jpeg' },
  { type: 'video', src: '/media/10 Second gym video.mp4' },
  { type: 'image', src: '/media/gym3.jpeg' },
  { type: 'image', src: '/media/gym5.jpeg' },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export default function GalleryPage() {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = page < 0 ? media.length + (page % media.length) : page % media.length;
  const currentMedia = media[imageIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleThumbnailClick = (index: number) => {
    const newDirection = index > page ? 1 : -1;
    setPage([index, newDirection]);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {currentMedia.type === 'image' && (
        <motion.div
          key={imageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={currentMedia.src}
            alt="background"
            layout="fill"
            objectFit="cover"
            className="opacity-30 blur-lg scale-110"
            priority
          />
        </motion.div>
      )}

      <Link href="/home" className="absolute top-6 right-6 z-20 text-white bg-black/50 p-3 rounded-full hover:bg-black/80 transition-colors cursor-pointer">
        <FaTimes size={20} />
      </Link>

      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className="absolute w-full h-full flex items-center justify-center"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          >
            {currentMedia.type === 'image' ? (
              <Image
                src={currentMedia.src}
                alt={`Gym gallery image ${imageIndex + 1}`}
                width={1200}
                height={800}
                objectFit="contain"
                quality={100}
                className="rounded-lg shadow-2xl"
                priority
              />
            ) : (
              <video
                src={currentMedia.src}
                width="1200"
                height="800"
                controls
                autoPlay
                muted
                loop
                className="rounded-lg shadow-2xl max-h-full"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-10">
        <button
          onClick={() => paginate(-1)}
          className="bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-colors focus:outline-none"
        >
          <FaChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-10">
        <button
          onClick={() => paginate(1)}
          className="bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-colors focus:outline-none"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-sm">
        <div className="flex justify-center items-center gap-4">
          {media.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`cursor-pointer rounded-md overflow-hidden transition-all duration-300 ${imageIndex === index ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50' : 'opacity-60 hover:opacity-100'}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={`thumbnail ${index + 1}`}
                  width={100}
                  height={60}
                  objectFit="cover"
                />
              ) : (
                <div className="relative w-[100px] h-[60px] bg-black flex items-center justify-center">
                  <video src={item.src} className="w-full h-full object-cover" muted />
                  <FaPlay className="absolute text-white/70" size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Navbar from "../components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const AboutUs = () => {
  // List of image filenames
  const images = [
    "/src/images/13.jpg",
    "/src/images/z19.jpg",
    "/src/images/1.jpg",
    "/src/images/z8.jpg",
    "/src/images/z24.jpg",
    "/src/images/z9.jpg",
    "/src/images/z17.jpg",
    "/src/images/2.jpg",
    "/src/images/4.jpg",
    "/src/images/9.jpg",
  ];

  // State to track the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to move to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-12">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Our Love Story
        </h1>
        <p className="text-lg text-gray-700">
          This photobooth is a celebration of our journey together. Every photo
          captures a moment of love, laughter, and happiness.
        </p>
      </motion.div>

      {/* Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 max-w-3xl"
      >
        {/* Image Display */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Our Memory ${currentIndex + 1}`}
              className="w-full h-[500px] object-contain transform transition-transform hover:scale-105"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={prevImage}
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
          >
            <HiArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
          >
            <HiArrowRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>

      {/* Message Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 max-w-3xl text-center space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-900">To My Love</h2>
        <p className="text-lg text-gray-700">
          You are my greatest adventure, my forever partner, and my truest
          friend. Thank you for filling my life with so much joy and love.
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12"
      >
        <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">
          Capture More Memories
        </button>
      </motion.div>
    </div>
  );
};

export default AboutUs;
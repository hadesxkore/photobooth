import React from "react";
import Navbar from "../components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { HiCamera, HiPhotograph, HiHeart, HiLightningBolt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-8">
            <h1 className="text-5xl sm:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Capture
              </span>{" "}
              Your Perfect Moments
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your special occasions into timeless memories with our state-of-the-art photo booth experience.
            </p>
            <div className="flex flex-wrap gap-4">
            <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-400/20"
      onClick={() => navigate("/Capture")}  // Navigate to Capture page
    >
      <HiCamera className="w-6 h-6" />
      <span>Let's Capture Now</span>
    </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                <HiLightningBolt className="w-6 h-6" />
                <span>View Gallery</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
  className="relative"
  animate={{
    y: [0, -10, 0], // Moves up by 10px, then back down
  }}
  transition={{
    duration: 5, // Controls speed (slower for smooth effect)
    repeat: Infinity, // Keeps repeating forever
    repeatType: "mirror", // Ensures smooth up & down motion
  }}
>
  <img
    src="/src/images/samplept1.jpg"
    alt="Photo Booth"
    className="rounded-2xl shadow-2xl"
  />
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/20 to-transparent" />
</motion.div>

        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose SnapBooth?</h2>
            <p className="text-xl text-gray-600">Experience the perfect blend of fun and technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: HiCamera,
                title: "High-Quality Photos",
                description: "Professional-grade cameras and lighting for perfect shots every time"
              },
              {
                icon: HiPhotograph,
                title: "Instant Prints",
                description: "Get your photos instantly with our fast printing technology"
              },
              {
                icon: HiHeart,
                title: "Fun Props & Filters",
                description: "Wide selection of digital props and filters to make your photos unique"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of happy customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                event: "Wedding Celebration",
                text: "The perfect addition to our wedding! Our guests loved it!"
              },
              {
                name: "Mike Chen",
                event: "Corporate Event",
                text: "Professional service and amazing quality photos. Highly recommended!"
              },
              {
                name: "Emily Brown",
                event: "Birthday Party",
                text: "So much fun! The digital props made our photos extra special."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="space-y-4">
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-blue-600">{testimonial.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
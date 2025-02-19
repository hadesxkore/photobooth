import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  HiMenu, 
  HiX, 
  HiCamera, 
  HiOutlineHome,
  HiOutlineCamera,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineExclamationCircle
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // For logout modal

  const navItems = [
    { name: "Home", icon: HiOutlineHome, link: "/" },
    { name: "Photo Booth", icon: HiOutlineCamera, link: "/photo-booth" },
    { name: "About Us", icon: HiOutlineInformationCircle, link: "/about-us" },
    { name: "Contact Us", icon: HiOutlineMail, link: "/contact-us" },
    { name: "Profile", icon: HiOutlineUser, link: "/profile" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(false); // Close the modal
    // Add your logout logic here
    console.log("User logged out");
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <HiCamera className="text-blue-600 w-10 h-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                SnapBooth
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex space-x-6"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={item.link}
                    className="relative group px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                  >
                    <span className="flex items-center space-x-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Log Out Button (Desktop) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors duration-300 shadow-lg hover:shadow-blue-400/20"
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <HiX className="w-6 h-6 text-gray-600" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-600" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-200 bg-white"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Link
                    to={item.link}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="pt-2"
              >
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors duration-300 w-full"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsLogoutModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <HiOutlineExclamationCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Are you sure?</h2>
                <p className="text-gray-600 mb-6">
                  You are about to log out. Are you sure you want to continue?
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
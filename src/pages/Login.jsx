import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import bg1 from "../assets/images/bg1.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const db = getFirestore(); // Initialize Firestore

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Set persistence to local storage
      await setPersistence(auth, browserLocalPersistence);

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Normalize email to lowercase and check if the email exists in Firestore
      const userRef = doc(db, "users", user.uid); // Use UID for Firestore reference
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        toast.success("Successfully logged in!");
        navigate("/homepage");
      } else {
        toast.error("No account associated with this email.");
      }
    } catch (err) {
      console.error("Error during email login:", err);
      setError(err.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Start the Google sign-in process
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user is already registered with the email
      const userRef = doc(db, "users", user.uid); // Use UID for Firestore
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        toast.success("Successfully logged in with Google!");
        navigate("/HomePage"); // Redirect after successful login
      } else {
        toast.error("No account associated with this Google email.");
      }
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
        style={{ backgroundImage: `url(${bg1})` }} // Use the imported image variable
      >
        <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Log In</h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative mt-2">
                <HiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-2">
                <HiLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            <span>Or log in with</span>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <HiMail className="w-6 h-6 mr-2 text-gray-500" />
              Log In with Google
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Login;

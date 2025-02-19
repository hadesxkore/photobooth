import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword as firebaseSignIn } from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa"; // Updated icon for Google
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg1 from "../assets/images/bg1.jpg";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState("");
  const db = getFirestore();
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumber) strength++;
    if (hasSpecialChar) strength++;
    if (password.length >= 8) strength++;

    setPasswordStrength(strength);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          createdAt: new Date(),
        });
      }

      toast.success("Signed in with Google!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebaseSignIn(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          createdAt: new Date(),
        });
      }

      toast.success("Successfully logged in!");
      navigate("/HomePage");
    } catch (err) {
      toast.error("Login failed! Please check your credentials.");
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
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>

          <form onSubmit={handleSignUp} className="space-y-6">
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                  }}
                  className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Create a password"
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

            <div className="mt-2">
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${passwordStrength === 1
                    ? "bg-red-500"
                    : passwordStrength === 2
                    ? "bg-yellow-500"
                    : passwordStrength === 3
                    ? "bg-orange-500"
                    : passwordStrength === 4
                    ? "bg-green-500"
                    : ""
                  }`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 text-right">
                {passwordStrength === 1
                  ? "Weak"
                  : passwordStrength === 2
                  ? "Fair"
                  : passwordStrength === 3
                  ? "Good"
                  : passwordStrength === 4
                  ? "Strong"
                  : ""}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative mt-2">
                <HiLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            <span>Or sign up with</span>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <FaGoogle className="w-6 h-6 mr-2 text-gray-500" />
              Sign In with Google
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default SignUp;

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzQMFj8GKe8omMSE2JpQhn5yjVhjEzSMY",
  authDomain: "photobooth-de126.firebaseapp.com",
  projectId: "photobooth-de126",
  storageBucket: "photobooth-de126.appspot.com",
  messagingSenderId: "440284968269",
  appId: "1:440284968269:web:89c51d4587e36cb29df304",
  measurementId: "G-9N63QLWD8F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Initialize Firebase Analytics
const auth = getAuth(app); // Initialize Firebase Authentication

export { app, analytics, auth }; // Export Firebase modules for use in other components
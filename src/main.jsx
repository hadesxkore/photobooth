import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Capture from "./pages/Capture";
import AboutUs from "./pages/AboutUs";


import HomePage from "./pages/HomePage";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/HomePage" element={<HomePage />} /> {/* This makes HomePage the default */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Capture" element={<Capture />} />
        <Route path="/about-us" element={<AboutUs />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>
);

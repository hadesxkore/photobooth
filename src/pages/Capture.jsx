import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { HiCamera, HiDownload, HiRefresh, HiTemplate } from "react-icons/hi";

const CapturePage = () => {
  const [step, setStep] = useState("frame-select");
  const [frameStyle, setFrameStyle] = useState(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [frameColor, setFrameColor] = useState("#ffffff"); // Default white frame
  const [facingMode, setFacingMode] = useState("user"); // Camera mode: 'user' or 'environment'
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const frameStyles = [
    { id: "horizontal", name: "Horizontal", cols: 3, rows: 2, photos: 6 },
    { id: "vertical", name: "Vertical", cols: 2, rows: 3, photos: 6 },
    { id: "square", name: "Square Grid", cols: 2, rows: 2, photos: 4 },
  ];

  const startCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraPermission(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraPermission(false);
    }
  };

  const flipCamera = async () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  useEffect(() => {
    if (step === "capturing") startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [step, facingMode]);

  const capturePhoto = () => {
    if (capturedPhotos.length >= frameStyle.photos) return;
    setCountdown(3);
    let counter = 3;
    const countdownTimer = setInterval(() => {
      counter--;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(countdownTimer);
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
        const photo = canvas.toDataURL("image/jpeg");
        setCapturedPhotos((prev) => [...prev, photo]);
        setCountdown(null);
      }
    }, 1000);
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const totalCols = frameStyle.cols;
    const totalRows = frameStyle.rows;
    const photoWidth = 400;  // Higher resolution per image
    const photoHeight = 300;
    const padding = 20; // Increased padding for better spacing
    

    canvas.width = totalCols * (photoWidth + padding) + padding;
    canvas.height = totalRows * (photoHeight + padding) + padding;

    // Draw background frame
    ctx.fillStyle = frameColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    capturedPhotos.forEach((photo, index) => {
      const row = Math.floor(index / totalCols);
      const col = index % totalCols;

      const img = new Image();
      img.src = photo;

      ctx.drawImage(
        img,
        col * (photoWidth + padding) + padding,
        row * (photoHeight + padding) + padding,
        photoWidth,
        photoHeight
      );
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = "final-photo-grid.jpg";
    link.click();
  };

  const resetCapturing = () => {
    setCapturedPhotos([]); // Clear captured photos
    setStep("capturing"); // Reset to capturing step
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <AnimatePresence mode="wait">
          {/* Step 1: Frame Selection */}
          {step === "frame-select" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-center"
            >
              {/* Title and Subtitle */}
              <div>
                <h1 className="text-3xl font-bold">Choose Your Frame Style</h1>
                <p className="text-base text-gray-600 mt-2">
                  Select how you want your photos arranged
                </p>
              </div>

              {/* Frame Style Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
                {frameStyles.map((style) => (
                  <motion.div
                    key={style.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-colors shadow-lg ${
                      frameStyle?.id === style.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setFrameStyle(style)}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      {/* Icon */}
                      <HiTemplate className="w-12 h-12 text-blue-600" />
                      {/* Name */}
                      <h3 className="text-lg font-semibold">{style.name}</h3>
                      {/* Description */}
                      <p className="text-sm text-gray-600">
                        {style.cols}x{style.rows} layout • {style.photos} photos
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Start Capturing Button */}
              {frameStyle && (
                <button
                  onClick={() => setStep("capturing")}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Capturing
                </button>
              )}
            </motion.div>
          )}

          {/* Step 2: Capturing Photos */}
          {step === "capturing" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Camera Preview Section */}
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                />
                {countdown !== null && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                    <span className="text-white text-6xl font-bold">
                      {countdown}
                    </span>
                  </div>
                )}
                {!countdown && (
                  <>
                    {/* Capture Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={capturePhoto}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Capture {capturedPhotos.length + 1}/{frameStyle.photos}
                    </motion.button>

                    {/* Flip Camera Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={flipCamera}
                      className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Flip Camera
                    </motion.button>
                  </>
                )}
              </div>

              {/* Captured Photos Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Captured Photos</h3>
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "16px",
                    borderRadius: "16px",
                  }}
                  className="shadow-lg"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: frameStyle.photos }).map((_, index) => (
                      <div
                        key={index}
                        className="aspect-[4/3] bg-white rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm"
                      >
                        {capturedPhotos[index] ? (
                          <img
                            src={capturedPhotos[index]}
                            alt={`Captured ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <HiCamera className="w-12 h-12 text-gray-300" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              {capturedPhotos.length === frameStyle.photos && (
                <button
                  onClick={() => setStep("frame-color")}
                  className="col-span-full bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Choose Frame Color
                </button>
              )}
            </motion.div>
          )}

          {/* Step 3: Frame Color Selection */}
          {step === "frame-color" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 text-center"
            >
              {/* Title */}
              <h2 className="text-lg font-semibold">Choose Frame Color</h2>

              {/* Color Options */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setFrameColor("#ffffff")}
                  className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 shadow-sm"
                ></button>
                <button
                  onClick={() => setFrameColor("#ffcccc")}
                  className="w-8 h-8 rounded-full bg-pink-200 border-2 border-gray-300 shadow-sm"
                ></button>
                <button
                  onClick={() => setFrameColor("#ccffcc")}
                  className="w-8 h-8 rounded-full bg-green-200 border-2 border-gray-300 shadow-sm"
                ></button>
                <button
                  onClick={() => setFrameColor("#ccccff")}
                  className="w-8 h-8 rounded-full bg-blue-200 border-2 border-gray-300 shadow-sm"
                ></button>
              </div>

              {/* Real-Time Preview */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-4">Real-Time Preview</h3>
                <div
                  style={{
                    backgroundColor: frameColor,
                    padding: "12px",
                    borderRadius: "16px",
                  }}
                  className="inline-block shadow-lg"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {capturedPhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-[4/3] bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                      >
                        <img
                          src={photo}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => setStep("preview")}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 4: Final Preview */}
          {step === "preview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-center"
            >
              <h2 className="text-xl font-semibold">Your Photos are Ready!</h2>
              <div
                style={{
                  backgroundColor: frameColor,
                  padding: "10px",
                  borderRadius: "12px",
                }}
                className="inline-block shadow-lg"
              >
                <div className="grid grid-cols-2 gap-2">
                  {capturedPhotos.map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-[4/3] bg-white rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={photo}
                        alt={`Final ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                {/* Download Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Download Photos
                </motion.button>

                {/* Retake Photos Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetCapturing}
                  className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg"
                >
                  Retake Photos
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CapturePage;
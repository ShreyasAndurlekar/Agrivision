import React, { useState, useEffect, useRef } from "react"; // Import useEffect
import { useNavigate } from "react-router-dom";

const Croppred = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const hasReadAloud = useRef(false); 

  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  // Function to read text aloud
  const readAloud = (text) => {
    console.log("readAloud called with text:", text);
    if ('speechSynthesis' in window) {
      console.log("Speech synthesis supported");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set the language
      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of speech
      if (!hasReadAloud.current) {
        console.log("Speaking the text");
        window.speechSynthesis.speak(utterance);
        hasReadAloud.current = true;
      } else {
        console.log("Text has already been read aloud");
      }
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  // Read aloud when the component mounts
  useEffect(() => {
    const welcomeText = "Upload a soil report image to find best crops for your field.";
    readAloud(welcomeText);
    return () => {
      console.log("Stopping speech on page change.");
      window.speechSynthesis.cancel();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const formData = new FormData();
        formData.append("file", uploadedFile);
        setPreviewImage(URL.createObjectURL(uploadedFile));

        const response = await fetch(`${API_URL}/upload`, {
          method: "POST",
          body: formData,
          mode: 'cors',
          headers: {
            'Accept': 'image/*'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        setResultImage(URL.createObjectURL(blob));
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to process the file. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="w-screen h-screen relative flex flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: "Lexend, 'Noto Sans', sans-serif" }}
    >
      {/* Sidebar for mobile */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white text-[#131811] transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-30`}
        style={{ fontFamily: "Lexend, 'Noto Sans', sans-serif" }}
      >
        <div className="p-6 relative">
          <h2 className="text-xl font-bold text-[#131811]">AgroVision AI</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-[#131811] text-xl"
          >
            &#10005;
          </button>
          <nav className="mt-8 space-y-4">
            <a
              onClick={() => {
                navigate("/");
                setSidebarOpen(false);
              }}
              className="block text-base font-medium text-[#131811] hover:underline"
            >
              Home
            </a>
            <a
              onClick={() => {
                navigate("/Contact");
                setSidebarOpen(false);
              }}
              className="block text-base font-medium text-[#131811] hover:underline"
            >
              Contact Us
            </a>
            <a href="#" className="block text-base font-medium text-[#131811] hover:underline">
              Logout
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <header className="flex items-center justify-between w-full border-b border-solid border-[#f2f4f0] px-8 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#131811]">
              <div className="size-8">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 className="text-[#131811] text-xl font-bold">AgroVision AI</h2>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="sm:hidden text-[#131811] text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            &#9776;
          </button>

          {/* Desktop menu */}
          <nav className="hidden sm:flex gap-8">
            <a
              className="text-[#131811] text-base font-medium"
              href="#"
              onClick={() => navigate("/")}
            >
              Home
            </a>
            <a
              className="text-[#131811] text-base font-medium"
              href="#"
              onClick={() => navigate("/Contact")}
            >
              Contact Us
            </a>
            <a className="text-[#131811] text-base font-medium" href="#">
              Logout
            </a>
          </nav>
        </header>

        {/* Main Content Section */}
        <div className="flex flex-1 justify-center items-center py-5 px-4 sm:px-6 md:px-12 w-full">
          <div className="flex flex-col items-center w-full max-w-screen-lg gap-6">
            {/* Title */}
            <div className="flex flex-wrap justify-center gap-3 p-4">
              <p className="text-[#141b0e] text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em] text-center">
                Crop Prediction
              </p>
            </div>

            {/* Button Section */}
            <div className="flex justify-center w-full">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4 py-3 w-full max-w-[600px]">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  accept=".pdf,image/*"
                  onChange={handleFileUpload}
                  aria-label="Upload soil report PDF or image for crop prediction"
                />
                <label
                  htmlFor="fileUpload"
                  className="flex items-center justify-center text-[#141b0e] text-sm sm:text-base font-bold h-12 px-5 py-2 rounded-xl w-full sm:w-[12rem] cursor-pointer"
                  style={{ backgroundColor: "#80e619" }}
                >
                  <span className="truncate">Upload Soil Report</span>
                </label>
              </div>
            </div>

            {/* Informational Text */}
            <p className="text-[#141b0e] text-base font-normal leading-normal text-center pt-1 px-4">
              Please upload a soil report PDF or image. It will be processed by our AI for crop prediction.
            </p>

            {loading && (
              <div className="text-center">
                <p className="text-gray-700">Processing...</p>
                <div className="spinner mt-4 mx-auto"></div>
              </div>
            )}

            {/* Prediction Result */}
            {!loading && result && (
              <div className="result-container mb-6 text-center p-6 bg-[#f8fafc] rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-[#141b0e] mb-4">
                  Top 4 Crops You Can Grow:
                </h2>
                <div className="result-list text-left text-[#4b5563] text-lg">
                  {result.map((crop, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <span className="text-xl font-medium text-[#4b5563] mr-4">
                        {index + 1}.
                      </span>
                      <p className="text-lg">{crop}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex gap-4 mt-4">
              {previewImage && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Uploaded Image:</h3>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-w-xs rounded-lg shadow-md"
                  />
                </div>
              )}

              {resultImage && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Processed Image:</h3>
                  <img
                    src={resultImage}
                    alt="Result"
                    className="max-w-xs rounded-lg shadow-md"
                  />
                  {result && (
                    <div className="mt-2">
                      <p>Results: {JSON.stringify(result)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {loading && (
              <div className="mt-4">
                <p className="text-blue-500">Processing your image...</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-[#f2f4f0] py-6 px-4 border-t border-solid border-[#e5e7eb]">
          <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-[#131811] text-xs sm:text-sm font-medium">
                &copy; 2025 AgroVision AI. All Rights Reserved.
              </p>
              <p className="text-[#131811] text-xs sm:text-sm mt-1">
                Empowering farmers with AI-driven insights for sustainable agriculture.
              </p>
            </div>
            <div className="flex gap-4 text-[#131811] text-xs sm:text-sm font-medium">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
              <a href="#" className="hover:underline">
                Support
              </a>
            </div>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="hover:text-[#80e619]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.325v21.351C0 23.403.598 24 1.325 24h11.495v-9.294H9.691V11.08h3.129V8.413c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.918c-1.505 0-1.796.715-1.796 1.763v2.311h3.59l-.467 3.626h-3.123V24h6.127c.728 0 1.325-.598 1.325-1.324V1.325C24 .598 23.403 0 22.675 0z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[#80e619]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.723 9.872 9.872 0 0 1-3.127 1.195 4.918 4.918 0 0 0-8.384 4.482 13.947 13.947 0 0 1-10.141-5.148 4.916 4.916 0 0 0 1.523 6.573A4.904 4.904 0 0 1 .96 8.796v.062a4.917 4.917 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.212.084 4.92 4.92 0 0 0 4.593 3.417A9.868 9.868 0 0 1 0 21.539a13.94 13.94 0 0 0 7.548 2.211c9.058 0 14.009-7.504 14.009-14.009 0-.213-.005-.426-.014-.637A10.025 10.025 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[#80e619]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.2.79 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.73C24 .78 23.2 0 22.23 0zM7.06 20.45H3.56V9.04h3.5v11.41zm-1.75-13.03c-1.1 0-1.98-.88-1.98-1.97 0-1.1.88-1.98 1.98-1.98s1.98.88 1.98 1.98c0 1.1-.88 1.97-1.98 1.97zm15.7 13.03h-3.5v-5.57c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.15 1.46-2.15 2.96v5.66h-3.5V9.04h3.36v1.56h.05c.47-.9 1.62-1.84 3.34-1.84 3.57 0 4.23 2.35 4.23 5.41v6.28z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Croppred;
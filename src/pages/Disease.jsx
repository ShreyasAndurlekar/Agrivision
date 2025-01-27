import React, { useState } from 'react';
import '../App.css';

const Disease = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setLoading(true);
      setTimeout(() => {
        setResult('Powdery Mildew detected on Tomato leaves.');
        setLoading(false);
      }, 2000);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const capturePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoURL = canvas.toDataURL('image/png');
        setImage(photoURL);
        setLoading(true);
        setTimeout(() => {
          setResult('Powdery Mildew detected on Tomato leaves.');
          setLoading(false);
        }, 2000);

        // Stop the video stream
        stream.getTracks().forEach((track) => track.stop());
      };

      const confirmCapture = window.confirm('Click OK to capture the photo.');
      if (confirmCapture) {
        capturePhoto();
      } else {
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
      alert('Unable to access the camera. Please ensure camera permissions are enabled.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setLoading(true);
      setTimeout(() => {
        setResult('Powdery Mildew detected on Tomato leaves.');
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div
      className="w-screen h-screen relative flex flex-col bg-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
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
        <nav className="flex gap-8">
          <a className="text-[#131811] text-base font-medium" href="#">
            Home
          </a>
          <a className="text-[#131811] text-base font-medium" href="#">
            Contact Us
          </a>
          <a className="text-[#131811] text-base font-medium" href="#">
            Logout
          </a>
        </nav>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-1 justify-center items-center w-full py-5 px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-center w-full max-w-screen-lg gap-6">
          {/* Title */}
          <h1 className="text-[#141b0e] text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-8 text-center">
            Crop Disease Detection
          </h1>

          {/* Instructions */}
          <p className="description text-gray-600 mb-6 text-center">
            Identify diseases in your crops by uploading images for analysis.
            Follow the instructions below to submit your images and receive
            results:
          </p>
          <ul className="instruction-list list-disc list-inside mb-6 text-gray-700 text-left max-w-xl mx-auto">
            <li>Ensure your image is clear and focused on the affected area of the crop.</li>
            <li>Upload images in JPEG or PNG format.</li>
            <li>Click on the "Upload Image" button below to select your file.</li>
            <li>Wait a few moments for the analysis results to be generated.</li>
          </ul>

          {/* Upload Section */}
          <div
            className="upload-container text-center mb-6 flex flex-col gap-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex gap-4">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                aria-label="Upload image for crop disease detection"
              />
              <label
                htmlFor="fileUpload"
                className="upload-button bg-green-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer"
                style={{ display: 'inline-block', width: 'auto', textAlign: 'center' }}
              >
                Upload Image
              </label>
              <button
                onClick={handleTakePhoto}
                className="take-photo-button bg-blue-500 text-white font-medium py-2 px-4 rounded-lg"
                style={{ display: 'inline-block', width: 'auto', textAlign: 'center' }}
              >
                Take Photo
              </button>
            </div>
            <p className="upload-text text-gray-500 mt-2">
              or drag and drop your file here
            </p>
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center mb-6">
              <p className="text-gray-700">Analyzing...</p>
              <div className="spinner mt-2 text-2xl">🔄</div>
            </div>
          )}

          {/* Uploaded Image Preview */}
          {image && !loading && (
            <div className="result-container mb-6">
              <h2 className="recent-results-title text-xl font-semibold text-gray-800 mb-2">
                Uploaded Image
              </h2>
              <img
                src={image}
                alt="Uploaded Crop"
                className="result-image w-full max-w-sm rounded-lg shadow"
              />
            </div>
          )}

          {/* Result Display */}
          {!loading && result && (
            <div className="result-container mb-6">
              <h2 className="recent-results-title text-xl font-semibold text-gray-800 mb-2">
                Analysis Result
              </h2>
              <div className="result-card bg-gray-100 p-4 rounded-lg shadow">
                <p className="result-text text-gray-700">{result}</p>
              </div>
            </div>
          )}
        </div>
      </div>
  {/* Footer */}
  <footer className="w-full bg-[#f2f4f0] py-10 px-8 border-t border-solid border-[#e5e7eb]">
          <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <p className="text-[#131811] text-sm sm:text-base font-medium">
                &copy; 2025 AgroVision AI. All Rights Reserved.
              </p>
              <p className="text-[#131811] text-xs sm:text-sm mt-2">
                Empowering farmers with AI-driven insights for sustainable agriculture.
              </p>
            </div>
            <div className="flex gap-6 text-[#131811] text-sm sm:text-base font-medium">
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
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="hover:text-[#80e619]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.325v21.351C0 23.403.598 24 1.325 24h11.495v-9.294H9.691V11.08h3.129V8.413c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.918c-1.505 0-1.796.715-1.796 1.763v2.311h3.59l-.467 3.626h-3.123V24h6.127c.728 0 1.325-.598 1.325-1.324V1.325C24 .598 23.403 0 22.675 0z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[#80e619]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.723 9.872 9.872 0 0 1-3.127 1.195 4.918 4.918 0 0 0-8.384 4.482 13.947 13.947 0 0 1-10.141-5.148 4.916 4.916 0 0 0 1.523 6.573A4.904 4.904 0 0 1 .96 8.796v.062a4.917 4.917 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.212.084 4.92 4.92 0 0 0 4.593 3.417A9.868 9.868 0 0 1 0 21.539a13.94 13.94 0 0 0 7.548 2.211c9.058 0 14.009-7.504 14.009-14.009 0-.213-.005-.426-.014-.637A10.025 10.025 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[#80e619]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.2.79 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.73C24 .78 23.2 0 22.23 0zM7.06 20.45H3.56V9.04h3.5v11.41zm-1.75-13.03c-1.1 0-1.98-.88-1.98-1.97 0-1.1.88-1.98 1.98-1.98s1.98.88 1.98 1.98c0 1.1-.88 1.97-1.98 1.97zm15.7 13.03h-3.5v-5.57c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.15 1.46-2.15 2.96v5.66h-3.5V9.04h3.36v1.56h.05c.47-.9 1.62-1.84 3.34-1.84 3.57 0 4.23 2.35 4.23 5.41v6.28z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
  );
};
export default Disease;





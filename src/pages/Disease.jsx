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
          <div className="upload-container text-center mb-6">
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
            >
              Upload Image
            </label>
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
    </div>
  );
};

export default Disease;




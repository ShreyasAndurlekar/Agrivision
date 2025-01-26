import React, { useState } from "react";

const Croppred = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setLoading(true);
      
      // Simulate processing time and result generation
      setTimeout(() => {
        // Example: Top 4 crops prediction (this should be replaced with actual logic based on file)
        setResult([
          "Wheat",
          "Rice",
          "Corn",
          "Soybean",
        ]);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div
      className="w-screen h-screen relative flex flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: "Lexend, 'Noto Sans', sans-serif" }}
    >
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

            {/* Loading Spinner */}
            {loading && (
              <div className="text-center mb-6">
                <p className="text-gray-700">Processing...</p>
                <div className="spinner mt-2 text-2xl">🔄</div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Croppred;







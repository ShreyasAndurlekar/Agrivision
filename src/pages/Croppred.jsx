import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Recommendations = ({ recommendations, image }) => {
  const emojis = {
    coconut: '🥥',
    mango: '🥭',
    pigeonpeas: '🌱',
    pomegranate: '🍎'
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Recommendations:</h2>
      <ul style={{ listStyleType: 'none', padding: 0, fontSize: '20px' }}>
        {Object.entries(recommendations).map(([crop, percentage]) => (
          <li key={crop} style={{ marginBottom: '10px' }}>
            {emojis[crop]} {crop}: {percentage}
          </li>
        ))}
      </ul>
      {image && <img src={`data:image/png;base64,${image}`} alt="Soil Data" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />}
    </div>
  );
};

const Croppred = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [image, setImage] = useState(null);
  const hasReadAloud = useRef(false);
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
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
      }
    }
  };

  // const extractNutrients = (ocrText) => {
  //   const nutrients = {
  //     organicCarbon: null,
  //     nitrogen: null,
  //     phosphorus: null,
  //     potassium: null,
  //     magnesium: null,
  //     calcium: null,
  //     manganese: null,
  //     iron: null,
  //     copper: null,
  //     zinc: null,
  //     boron: null,
  //   };
  
  //   // Split the OCR text into lines for easier processing
  //   const lines = ocrText.split('\n');
  //   console.log("OCR Text Lines:", lines);
  
  //   // Define the order of nutrients as they appear in the text
  //   const nutrientOrder = [
  //     'organicCarbon',
  //     'nitrogen',
  //     'phosphorus',
  //     'potassium',
  //     'magnesium',
  //     'calcium',
  //     'manganese',
  //     'iron',
  //     'copper',
  //     'zinc',
  //     'boron'
  //   ];
  
  //   let valueIndex = 0;
  
  //   for (let i = 0; i < lines.length; i++) {
  //     const line = lines[i].trim();
  //     console.log(`Processing line ${i}:`, line);
  
  //     // Check if the line is a number (i.e., a nutrient value)
  //     if (!isNaN(parseFloat(line)) && isFinite(line)) {
  //       // Assign the value to the corresponding nutrient
  //       if (valueIndex < nutrientOrder.length) {
  //         const nutrientKey = nutrientOrder[valueIndex];
  //         nutrients[nutrientKey] = parseFloat(line);
  //         console.log(`Extracted ${nutrientKey}:`, nutrients[nutrientKey]);
  //         valueIndex++;
  //       }
  //     }
  //   }
  
  //   console.log("Extracted Nutrients:", nutrients);
  //   return nutrients;
  // };
  const fetchChatbotResponse = async (ocrText) => {
    try {
      const result = await model.generateContent("Find values of Nitrogen, Phosphorous and potassium from following text: ",ocrText);
      const response = await result.response;
      console.log("Chatbot response:", response.text());
      return response.text();
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "Sorry, I couldn't process your request.";
    }
  };
  

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setFile(file);
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('apikey', 'K83719120988957');
    formData.append('language', 'eng');
    formData.append('file', file);

    // CALLING BACKEND SERVER

    axios.get('http://localhost:8000/soil-data', {
      params: {
          nitrogen: 10,
          phosphorus: 5,
          potassium: 8,
          magnesium: 3,
          calcium: 7,
          manganese: 2,
          iron: 4,
          copper: 1
      }
  })
  .then(response => {
      console.log(response.data);
      setRecommendations(response.data.recommendations);
      setImage(response.data.image);
  })
  .catch(error => {
      console.error('Error fetching soil data:', error);
  });

    // END OF BACKEND SERVER

    try {
      console.log('Sending OCR request...');
      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('OCR response received:', data);

      if (data.ParsedResults && data.ParsedResults.length > 0) {
        const ocrText = data.ParsedResults[0].ParsedText;
        console.log('OCR Text:', ocrText);

        //r
        //const extractedData = extractNutrients(ocrText);
        const extractedData=false
        if (extractedData) {
          setResult(extractedData);
        } else {
          setError('Relevant nutrient data not found.');
        }
      } else {
        setError('No text found in the image.');
      }
    } catch (error) {
      console.error('Error during OCR request:', error);
      setError('Error during OCR request.');
    } finally {
      setLoading(false);
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
            {recommendations && <Recommendations recommendations={recommendations} image={image} />}
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
import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Disease = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diseaseName, setDiseaseName] = useState('');
  const [resultImageUrl, setResultImageUrl] = useState('');
  const hasReadAloud = useRef(false);

  const readAloud = (text) => {
    console.log("readAloud called with text:", text);
    if ('speechSynthesis' in window) {
      console.log("Speech synthesis supported");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN'; // Set the language
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

  useEffect(() => {
    const welcomeText = "Upload image to detect crop diseases. Click on the Upload Image button to get started.";
    readAloud(welcomeText);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setLoading(true);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/getdiseases', formData);
        setDiseaseName(response.data.disease_name);
        setResultImageUrl(response.data.image_url);
      } catch (error) {
        console.error('Error uploading image:', error);
        setDiseaseName('Error detecting disease.');
      } finally {
        setLoading(false);
      }
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

        const formData = new FormData();
        formData.append('image', dataURLtoFile(photoURL));

        axios.post('http://localhost:5000/getdiseases', formData)
          .then(response => {
            setDiseaseName(response.data.disease_name);
            setResultImageUrl(response.data.image_url);
          })
          .catch(error => {
            console.error('Error uploading image:', error);
            setDiseaseName('Error detecting disease.');
          })
          .finally(() => {
            setLoading(false);
            stream.getTracks().forEach((track) => track.stop());
          });
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

  const dataURLtoFile = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'image.png', { type: mime });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setLoading(true);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/getdiseases', formData);
        setDiseaseName(response.data.disease_name);
        setResultImageUrl(response.data.image_url);
      } catch (error) {
        console.error('Error uploading image:', error);
        setDiseaseName('Error detecting disease.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen relative flex flex-col bg-white overflow-x-hidden min-h-screen" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      
      {/* Sidebar for mobile */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white text-[#131811] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-30`}
      >
        <div className="p-6 relative">
          <h2 className="text-xl font-bold text-[#131811]">AgroVision AI</h2>
          <button
            onClick={() => setSidebarOpen(false)} // Close the sidebar
            className="absolute top-4 right-4 text-[#131811] text-xl"
          >
            &#10005;
          </button>
          <nav className="mt-8 space-y-4">
            <a onClick={() => {
              navigate("/");
              setSidebarOpen(false);
            }} className="block text-base font-medium text-[#131811] hover:underline">
              Home
            </a>
            <a onClick={() => {
              navigate("/Contact");
              setSidebarOpen(false);
            }} className="block text-base font-medium text-[#131811] hover:underline">
              Contact Us
            </a>
            <a href="#" className="block text-base font-medium text-[#131811] hover:underline">
              Logout
            </a>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between w-full border-b border-solid border-[#f2f4f0] px-8 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-[#131811]">
            <div className="size-8">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#131811] text-xl font-bold">AgroVision AI</h2>
          </div>
        </div>
        {/* Mobile menu toggle */}
        <button className="sm:hidden text-[#131811] text-2xl" onClick={() => setSidebarOpen(!sidebarOpen)}>
          &#9776;
        </button>
        {/* Desktop menu */}
        <nav className="hidden sm:flex gap-8">
          <a className="text-[#131811] text-base font-medium" href="#" onClick={() => navigate("/")}>
            Home
          </a>
          <a className="text-[#131811] text-base font-medium" href="#" onClick={() => navigate("/Contact")}>
            Contact Us
          </a>
          <a className="text-[#131811] text-base font-medium" href="#">
            Logout
          </a>
        </nav>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-1 justify-center items-center w-full py-10 px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-center w-full max-w-screen-lg gap-8">
          {/* Title */}
          <h1 className="text-[#141b0e] text-2xl sm:text-4xl lg:text-5xl font-black leading-tight text-center">
            Crop Disease Detection
          </h1>

          {/* Instructions */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center max-w-md sm:max-w-lg">
            Identify diseases in your crops by uploading images for analysis. Follow the instructions below to submit your images and receive results:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-left max-w-xs sm:max-w-md mx-auto space-y-2">
            <li>Ensure your image is clear and focused on the affected area of the crop.</li>
            <li>Upload images in JPEG or PNG format.</li>
            <li>Click on the "Upload Image" button below to select your file.</li>
            <li>Wait a few moments for the analysis results to be generated.</li>
          </ul>

          {/* Upload Section */}
          <div
            className="text-center flex flex-col items-center gap-4 border border-dashed border-gray-300 p-4 rounded-lg"
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
                className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer hover:bg-green-600"
              >
                Upload Image
              </label>
              <button
                onClick={handleTakePhoto}
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Take Photo
              </button>
            </div>
            <p className="text-gray-500 text-sm sm:text-base">or drag and drop your file here</p>
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center">
              <p className="text-gray-700">Processing...</p>
              <div className="spinner mt-4 mx-auto"></div>
            </div>
          )}

          {/* Uploaded Image Preview
          {image && !loading && (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Uploaded Image</h2>
              <img
                src={image}
                alt="Uploaded Crop"
                className="w-full max-w-xs sm:max-w-sm rounded-lg shadow"
              />
            </div>
          )} */}

          {/* Result Display */}
          {!loading && diseaseName && (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Analysis Result</h2>
              <div className="bg-gray-100 p-4 rounded-lg shadow max-w-sm w-full">
                <p className="text-gray-700">{diseaseName}</p>
                {resultImageUrl && (
                  <img src={`http://localhost:5000${resultImageUrl}`} alt="Detection Result" style={{ maxWidth: '100%', height: 'auto' }} />
                )}
              </div>
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
  );
};
export default Disease;
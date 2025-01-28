import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import ChatbotPopup from "./ChatbotPopup";

const Welcome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const cards = [
    {
      title: "Detect crop diseases",
      description: "Identify and diagnose diseases in your crops using Agri AI's technology.",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/1335d8be-6160-4bd0-b4b4-b6a29a3f43b3.png",
      onClick: () => navigate("/Disease"),
    },
    {
      title: "Predict crop yield",
      description: "Get insights into your crop yield with our advanced prediction models.",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/d1cb9829-f26b-41f2-88d0-e072ccf1d9f0.png",
      onClick: () => navigate("/Croppred"),
    },
    {
      title: "Forecast weather",
      description: "Plan ahead with our accurate weather forecasts for your fields.",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/a83fd6db-3b68-4fb7-b378-1501506d2455.png",
      onClick: () => navigate("/Weather"),
    },
  ];
  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      document.querySelector('.cards-container').scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      document.querySelector('.cards-container').scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  

  return (
    
    <div
      className="w-screen h-screen relative flex flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white text-[#131811] transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-30`}
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
            <a href="#" className="block text-base font-medium text-[#131811] hover:underline">
              Home
            </a>
            <a href="#" className="block text-base font-medium text-[#131811] hover:underline">
              Contact Us
            </a>
            <a href="#" className="block text-base font-medium text-[#131811] hover:underline">
              Logout
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <header className="flex items-center justify-between w-full border-b border-solid border-[#f2f4f0] px-8 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#131811]">
              <div className="size-8">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <a className="text-[#131811] text-base font-medium" href="#">
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

        {/* Main Content */}
        <div className="flex flex-1 justify-center py-5 w-full">
          <div className="flex flex-col flex-1 w-full max-w-[900px] px-4">
            <Banner />
            <div className="relative flex items-center w-full">
              {/* Navigation Arrows */}
              <button
                className={`absolute left-0 z-10 p-2 rounded-full transform -translate-y-1/2 top-1/3 ${
                  currentIndex === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#73974e] text-white hover:bg-[#5d7d3c]"
                }`}
                onClick={prevCard}
                disabled={currentIndex === 0}
              >
                &#8592;
              </button>
              <div className="cards-container flex items-center w-full overflow-x-auto scroll-snap-type-x-mandatory">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`card flex-shrink-0 w-full sm:w-1/2 md:w-1/3 transition-transform transform origin-center ${
                      index === currentIndex ? "scale-105" : "scale-100"
                    }`}
                    onClick={card.onClick}
                  >
                    <div className="flex flex-col items-center bg-white shadow-md rounded-lg cursor-pointer">
                      <div className="w-full h-48 overflow-hidden rounded-t-lg"> {/* Add overflow-hidden here */}
                        <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover rounded-image" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-[#131811]">{card.title}</h3>
                        <p className="text-sm text-gray-600">{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className={`absolute right-0 z-10 p-2 rounded-full transform -translate-y-1/2 top-1/3 ${
                  currentIndex === cards.length - 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#73974e] text-white hover:bg-[#5d7d3c]"
                }`}
                onClick={nextCard}
                disabled={currentIndex === cards.length - 1}
              >
                &#8594;
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 gap-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-[#73974e]" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
        <ChatbotPopup />
        {/* Footer */}
        <Footer />
      </div>
    </div>
    
  );
};

const Banner = () => (
  <div className="w-full">
    <div className="w-full p-4">
      <div
        className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/c62c0803-34ba-4761-ba9f-a57dc1b33123.png")',
        }}
      >
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-white text-2xl font-black leading-tight tracking-wide sm:text-4xl whitespace-normal">
            The Future of Crop Management is Here
          </h1>
          <h2 className="text-white text-xs font-normal sm:text-sm">
            AgroVision AI offers a suite of AI-powered tools to help you monitor and manage your crops. From disease
            detection to weather forecasts, our platform has everything you need to optimize your farm's performance.
          </h2>
        </div>
      </div>
    </div>
  </div>
);

// const Footer = () => (
//   <footer className="py-4 bg-[#73974e] text-white text-center text-sm">
//     © 2025 AgroVision AI. All rights reserved.
//   </footer>
// );

export default Welcome;
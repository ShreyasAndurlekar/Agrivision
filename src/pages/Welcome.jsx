import React, { useState } from "react";
import "../App.css";

const Welcome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="w-screen h-screen relative flex flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      {/* Sidebar for mobile */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white text-[#131811] transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-30`}
      >
        <div className="p-6 relative">
          <h2 className="text-xl font-bold text-[#131811]">AgroVision AI</h2>
          <button
            onClick={() => setSidebarOpen(false)} // Close the sidebar
            className="absolute top-4 right-4 text-[#131811] text-xl"
          >
            &#10005; {/* Cross icon */}
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

      {/* Main content */}
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
            <a className="text-[#131811] text-base font-medium" href="#">
              Contact Us
            </a>
            <a className="text-[#131811] text-base font-medium" href="#">
              Logout
            </a>
          </nav>
        </header>

        <div className="flex flex-1 justify-center py-5 w-full">
          <div className="flex flex-col flex-1 w-full max-w-[900px] px-4">
            <Banner />
            <div className="flex overflow-x-auto w-full gap-6 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Card
                title="Detect crop diseases"
                description="Identify and diagnose diseases in your crops using Agri AI's technology."
                imageUrl="https://cdn.usegalileo.ai/sdxl10/1335d8be-6160-4bd0-b4b4-b6a29a3f43b3.png"
              />
              <Card
                title="Predict crop yield"
                description="Get insights into your crop yield with our advanced prediction models."
                imageUrl="https://cdn.usegalileo.ai/sdxl10/d1cb9829-f26b-41f2-88d0-e072ccf1d9f0.png"
              />
              <Card
                title="Forecast weather"
                description="Plan ahead with our accurate weather forecasts for your fields."
                imageUrl="https://cdn.usegalileo.ai/sdxl10/a83fd6db-3b68-4fb7-b378-1501506d2455.png"
              />
            </div>
          </div>
        </div>

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

const Card = ({ title, description, imageUrl }) => (
  <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md min-w-[200px] w-full overflow-hidden">
    <div
      className="w-full h-[180px] bg-cover bg-center rounded-t-lg"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
    <div className="p-4">
      <h3 className="text-[#141b0e] text-base font-medium mb-2 whitespace-normal">{title}</h3>
      <p className="text-[#73974e] text-sm text-ellipsis">{description}</p>
    </div>
  </div>
);

const Footer = () => (
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
);

export default Welcome;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import farmBg from '../images/farm1.jpeg'; // Ensure this path is correct

const Weather = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const hasReadAloud = useRef(false); // Track if speech has been triggered

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Fetch 5-day / 3-hour forecast
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          )
            .then((response) => response.json())
            .then((data) => {
              const dailyForecasts = processForecastData(data.list);
              setForecast(dailyForecasts);
            })
            .catch((err) => {
              setError('Failed to fetch weather data.');
            });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, [API_KEY]);

  useEffect(() => {
    // Only read aloud if forecast data is available and hasn't been read yet
    if (forecast.length > 0 && !hasReadAloud.current) {
      readForecastAloud(forecast);
      hasReadAloud.current = true; // Mark as read
    }
    return () => {
      console.log("Stopping speech on page change.");
      window.speechSynthesis.cancel();
    };
  }, [forecast]); // Run only when forecast changes

  const processForecastData = (forecastList) => {
    const dailyForecasts = [];
    const seenDays = new Set();

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!seenDays.has(date) && dailyForecasts.length < 7) {
        seenDays.add(date);
        dailyForecasts.push({
          date: date,
          temperature: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        });
      }
    });

    return dailyForecasts;
  };

  const readForecastAloud = (forecast) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      let forecastText = "Here is the weather forecast for the next few days. ";

      forecast.forEach((day, index) => {
        forecastText += `On ${day.date}, the temperature will be ${day.temperature} degrees Celsius with ${day.description}. `;
      });

      utterance.text = forecastText;
      utterance.lang = 'en-US';
      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of speech

      speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported in this browser.');
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

        {/* Main Content */}
        <div className="flex flex-1 justify-center py-5 w-full">
          <div className="flex flex-col flex-1 w-full max-w-[900px] px-4">
            <h1 className="text-2xl font-bold text-[#131811] mb-6">Weather Forecast</h1>
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                {/* Central Image */}
                <div
                  style={{ backgroundImage: `url(${farmBg})` }}
                  className="bg-cover bg-center rounded-lg shadow-lg p-8 mb-8 relative min-h-[400px]"
                >
                  <div className="absolute bottom-8 left-8 z-10 text-white">
                    <h1 className="text-3xl font-bold mb-2">Forecast Weather</h1>
                    <p className="mb-4">Get real-time weather updates</p>
                    <button
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      onClick={() => navigator.geolocation.getCurrentPosition()}
                    >
                      Use Location
                    </button>
                  </div>
                </div>

                {/* Weather Forecast Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {forecast.map((day, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6">
                      <h2 className="text-xl font-bold text-[#131811] mb-2">{day.date}</h2>
                      <p className="text-sm text-gray-600 mb-2">Temperature: {day.temperature}°C</p>
                      <p className="text-sm text-gray-600 mb-2">Description: {day.description}</p>
                      <img
                        src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                        alt="Weather icon"
                        className="w-12 h-12"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Weather;
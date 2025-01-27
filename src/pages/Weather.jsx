import React, { useState, useEffect, useRef } from 'react';

const Weather = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState(null);
  const suggestionBoxRef = useRef(null);

  const locations = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Pune'
  ];

  useEffect(() => {
    if (query) {
      setSuggestions(
        locations.filter((loc) => loc.toLowerCase().startsWith(query.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const searchLocation = query || location;
    if (searchLocation) {
      fetchForecast(searchLocation);
    } else {
      alert("Please select a location.");
    }
  };

  const fetchForecast = async (loc) => {
    try {
      const apiUrl = `https://api.example.com/forecast`; // Replace with actual API endpoint
      const apiKey = "YOUR_API_KEY"; // Replace with your API key
      const response = await fetch(`${apiUrl}?key=${apiKey}&q=${loc}&days=7`); // Adjust parameters as needed
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setForecast(data.forecast.forecastday); // Adjust based on API response structure
      setLocation(data.location.name); // Adjust based on API response structure
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch data. Please try again later.");
    }
  };
  
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${latitude},${longitude}&days=7`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch weather data.');
          }
          const data = await response.json();
          setLocation(data.location.name);
          setForecast(data.forecast.forecastday);
        } catch (error) {
          console.error('Error fetching weather data:', error.message);
          alert('Unable to fetch weather data. Please try again later.');
        }
      },
      (error) => {
        switch (error.code) {
          case 1:
            alert('Location access denied. Please enable location permissions.');
            break;
          case 2:
            alert('Location information is unavailable. Please try again.');
            break;
          case 3:
            alert('Location request timed out. Please try again.');
            break;
          default:
            alert('An unknown error occurred. Please try again.');
            break;
        }
        console.error('Geolocation error:', error.message);
      },
      {
        enableHighAccuracy: true, // Use high-accuracy mode if available
        timeout: 10000, // Timeout after 10 seconds
        maximumAge: 0, // Prevent cached positions
      }
    );
  };  

  return (
    <div
      className="w-screen h-screen relative flex flex-col bg-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="relative flex size-full min-h-screen flex-col bg-[#fcfaf8] group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
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
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="@container">
                <div className="@[480px]:p-4">
                  <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/f1718de7-6659-42ec-a9b7-a6da92c7d0a9.png")' }}>
                    <div className="flex flex-col gap-2 text-left">
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Weather Forecast
                      </h1>
                      <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                        Find the perfect conditions for your crops
                      </h2>
                    </div>
                    <label className="flex w-full max-w-[480px] relative" ref={suggestionBoxRef}>
                      <div className="flex items-center border border-[#e7d9cf] rounded-xl overflow-hidden w-full bg-[#fcfaf8]">
                        <div className="text-[#9a6c4c] px-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            fill="currentColor"
                            viewBox="0 0 256 256"
                          >
                            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={query}
                          onChange={(e) => {
                            setQuery(e.target.value);
                          }}
                          placeholder="Enter location"
                          className="w-full px-4 py-2 text-gray-700 bg-transparent focus:outline-none"
                        />
                        <button
                          className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                          onClick={handleSearch}
                        >
                          Search
                        </button>
                      </div>
                      {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg z-20 mt-2 max-h-40 overflow-y-auto border border-gray-200">
                          {suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                setQuery(suggestion);
                                setLocation(suggestion);
                                setSuggestions([]);
                              }}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </label>
                    <button 
                      className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                      onClick={handleUseCurrentLocation}
                    >
                      Use Current Location
                    </button>
                  </div>
                </div>
              </div>
              {forecast && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold">7-Day Forecast for {location}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mt-4">
                    {forecast.map((day, index) => (
                      <div key={index} className="p-4 bg-[#fcfaf8] border border-gray-300 rounded-lg text-center">
                        <h4 className="font-bold">{day.date}</h4>
                        <p>Max: {day.day.maxtemp_c}°C</p>
                        <p>Min: {day.day.mintemp_c}°C</p>
                        <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-16 h-16 mx-auto" />
                        <p>{day.day.condition.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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

export default Weather;




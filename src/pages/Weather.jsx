import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState(null);

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

  const handleSearch = () => {
    if (location) {
      fetchForecast(location);
    }
  };

  const fetchForecast = async (loc) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${loc}&days=7`);
      const data = await response.json();
      setForecast(data.forecast.forecastday);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${latitude},${longitude}&days=7`);
          const data = await response.json();
          setLocation(data.location.name);
          setForecast(data.forecast.forecastday);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      },
      (error) => {
        console.error('Error fetching current location:', error);
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
                    <label className="flex w-full max-w-[480px] relative">
  <div className="flex items-center border border-[#e7d9cf] rounded-xl overflow-hidden w-full bg-[#fcfaf8]">
    {/* Search Icon */}
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

    {/* Search Input */}
<input
  type="text"
  value={query} // Controlled component: updates with query state
  onChange={(e) => {
    setQuery(e.target.value); // Update query with typed input
    fetchSuggestions(e.target.value); // Fetch suggestions dynamically
  }}
  placeholder="Enter location"
  className="w-full px-4 py-2 text-gray-700 rounded-l-lg focus:outline-none"
/>


    {/* Search Button */}
    <button
      className="bg-[#ec6d13] text-white px-4 py-2 text-sm font-bold border-l border-[#e7d9cf] hover:bg-[#d05c0f]"
      onClick={handleSearch}
    >
      Search
    </button>
  </div>

  {/* Suggestions Dropdown */}
{suggestions.length > 0 && (
  <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg z-20 mt-2 max-h-40 overflow-y-auto border border-gray-200">
    {suggestions.map((suggestion, index) => (
      <li
        key={index}
        className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
        onClick={() => {
          setLocation(suggestion);
          setQuery('');
          setSuggestions([]);
          fetchForecast(suggestion);
        }}
      >
        {suggestion}
      </li>
    ))}
  </ul>
)}

</label>

                    <button 
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
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
    </div>
  );
};

export default Weather;




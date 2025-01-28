import React, { useState, useEffect } from 'react'; 
import farmBg from '../images/farm1.jpeg';  // Ensure this path is correct
import {Footer} from './Footer';  
import { NavBar } from './Navbar';
import { useNavigate } from "react-router-dom";

const Weather = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

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
  }, []);

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

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <NavBar />
          <div className="max-w-4xl mx-auto p-6">
            <div 
              style={{ backgroundImage: `url(${farmBg})` }}
              className="bg-cover bg-center rounded-lg shadow-lg p-8 mb-8 relative min-h-[400px]"
            >
              <div className="absolute bottom-8 left-8 z-10 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  Forecast Weather
                </h1>
                <p className="mb-4">
                  Get real-time weather updates
                </p>
                <button 
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  onClick={() => navigator.geolocation.getCurrentPosition()}
                >
                  Use Location
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold">{day.date}</h3>
                  <p>Temperature: {day.temperature}°C</p>
                  <p>Description: {day.description}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                    alt="Weather icon"
                  />
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Weather;
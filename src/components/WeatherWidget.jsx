import React, { useEffect, useState } from 'react';
import './WeatherWidget.css';
import axios from 'axios';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const DEFAULT_CITY = 'London';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        if (!API_KEY) {
          throw new Error('Weather API key is not configured');
        }

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherEmoji = (main) => {
    switch (main) {
      case 'Clear': return '☀️';
      case 'Clouds': return '☁️';
      case 'Rain': return '🌧️';
      case 'Drizzle': return '🌦️';
      case 'Thunderstorm': return '⛈️';
      case 'Snow': return '❄️';
      case 'Mist':
      case 'Fog':
      case 'Haze': return '🌫️';
      case 'Smoke': return '💨';
      case 'Dust':
      case 'Sand': return '🌪️';
      case 'Tornado': return '🌪️';
      default: return '🌈';
    }
  };

  if (loading) {
    return <div className="weather-widget">Loading...</div>;
  }

  if (!weather || weather.cod !== 200) {
    return <div className="weather-widget">Unable to fetch weather data.</div>;
  }

  const temp = Math.round(weather.main.temp);
  const wind = weather.wind.speed;
  const pressure = weather.main.pressure;
  const humidity = weather.main.humidity;
  const icon = weather.weather[0].icon;
  const description = weather.weather[0].main;
  const emoji = getWeatherEmoji(description);
  const cityName = weather.name;

  return (
    <>
    <div className="weather-container">
      <h2 className="weather-title" style={{marginBottom: '18px', fontWeight: 700, fontSize: '2rem',textAlign: 'center'}}>Weather</h2>
      <div className="weather-widget">
        <div className="weather-city" style={{marginTop: '0.5rem', fontWeight: 500, color: '#fff', fontSize: '1.1rem'}}>
          {locationError ? `Showing weather for ${cityName}` : cityName}
        </div>
        <div className="weather-header">
          <span className="weather-temp">{temp}°C <span className="weather-emoji">{emoji}</span></span>
        </div>
        <div className="weather-details">
          <div>
            <span className="label">Wind: </span>
            <span className="value">{wind} km/h</span>
          </div>
          <div>
            <span className="label">Pressure: </span>
            <span className="value">{pressure} hPa</span>
          </div>
          <div>
            <span className="label">Humidity: </span>
            <span className="value">{humidity}%</span>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default WeatherWidget; 

import React, { useEffect, useState } from 'react';
import './WeatherWidget.css';
import axios from 'axios';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocationError(true);
            setError('Unable to get your location. Please enable location services.');
          }
        );
      } else {
        setLocationError(true);
        setError('Geolocation is not supported by your browser.');
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!userLocation && !locationError) return;

      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        if (!API_KEY) {
          throw new Error('Weather API key is not configured');
        }

        let url;
        if (userLocation) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lon}&appid=${API_KEY}&units=metric`;
        } else {
          url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`;
        }

        const response = await axios.get(url);
        if (response.data.cod !== 200) {
          throw new Error(response.data.message || 'Failed to fetch weather data');
        }
        
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err.message || 'Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [userLocation, locationError]);

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
    return (
      <div className="weather-widget">
        <div className="weather-container">
          <h2 className="weather-title">Loading weather data...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget">
        <div className="weather-container">
          <h2 className="weather-title">Error</h2>
          <div className="weather-error">{error}</div>
        </div>
      </div>
    );
  }

  if (!weather || weather.cod !== 200) {
    return (
      <div className="weather-widget">
        <div className="weather-container">
          <h2 className="weather-title">Unable to fetch weather data</h2>
          <div className="weather-error">Please try again later</div>
        </div>
      </div>
    );
  }

  const temp = Math.round(weather.main.temp);
  const wind = weather.wind.speed;
  const pressure = weather.main.pressure;
  const humidity = weather.main.humidity;
  const description = weather.weather[0].main;
  const emoji = getWeatherEmoji(description);
  const cityName = weather.name;

  return (
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
  );
};

export default WeatherWidget; 

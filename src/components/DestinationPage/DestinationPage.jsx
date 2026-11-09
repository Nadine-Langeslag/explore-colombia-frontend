import "./destinationPage.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getPlaceCoordinates, getWeather } from "../../utils/api.js";

import destinations from "../../data/destinations.js";
import Hero from "../Hero/Hero.jsx";
import Places from "../Places/Places.jsx";
import Preloader from "../Preloader/Preloader.jsx";

const getWeatherDescription = (code) => {
  const weatherConditions = {
    0: "Clear sky ☀️",
    1: "Mainly clear 🌤️",
    2: "Partly cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    48: "Depositing rime fog 🌫️",
    51: "Light drizzle 🌦️",
    53: "Moderate drizzle 🌦️",
    55: "Dense drizzle 🌧️",
    61: "Slight rain 🌧️",
    63: "Moderate rain 🌧️",
    65: "Heavy rain 🌧️",
    71: "Slight snow 🌨️",
    73: "Moderate snow 🌨️",
    75: "Heavy snow ❄️",
    80: "Slight rain showers 🌦️",
    81: "Moderate rain showers 🌧️",
    82: "Violent rain showers ⛈️",
    95: "Thunderstorm ⛈️",
  };

  return weatherConditions[code] || "Weather conditions unavailable";
};

const DestinationPage = () => {
  const { destinationId } = useParams();

  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const destination = destinations.find((item) => item.id === destinationId);

  if (!destination) {
    return <main>Destination not found.</main>;
  }

  useEffect(() => {
    const fetchDestinationCoordinates = async () => {
      try {
        const location = await getPlaceCoordinates(
          destination.name,
          destination.name
        );

        setDestinationCoordinates({
          lat: location.lat,
          lon: location.lon,
        });

        const weatherData = await getWeather(location.lat, location.lon);
        setWeather(weatherData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinationCoordinates();
  }, [destinationId]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className="destination-page">
      <Hero
        title={destination.name}
        subtitle={destination.description}
        image={destination.image}
      />

      <div className="destination-page__info">
        <section className="destination-page__overview">
          <p>{destination.overview}</p>
        </section>

        {weather && (
          <section className="destination-page__weather">
            <div className="weather-card">
              <h2 className="weather-card__title">Current Weather</h2>

              <p className="weather-card__condition">
                {getWeatherDescription(weather.weather_code)}
              </p>

              <p className="weather-card__temperature">
                {weather.temperature_2m}°C
              </p>

              <div className="weather-card__details">
                <p>Feels like: {weather.apparent_temperature}°C</p>
                <p>Humidity: {weather.relative_humidity_2m}%</p>
                <p>Wind: {weather.wind_speed_10m} km/h</p>
              </div>
            </div>
          </section>
        )}
      </div>

      <Places
        destinationId={destination.id}
        destinationName={destination.name}
      />

      {destinationCoordinates && (
        <iframe
          src={`https://www.google.com/maps?q=${destinationCoordinates.lat},${destinationCoordinates.lon}&output=embed`}
          title={`Map showing ${destination.name}`}
          loading="lazy"
          className="destination-page__map"
        />
      )}
    </main>
  );
};

export default DestinationPage;

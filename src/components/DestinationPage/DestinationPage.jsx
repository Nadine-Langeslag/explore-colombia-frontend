import "./destinationPage.css";

import { Link, useParams } from "react-router-dom";
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
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [weatherError, setWeatherError] = useState(false);

  const destination = destinations.find((item) => item.id === destinationId);

  useEffect(() => {
    let isActive = true;

    if (!destination) {
      setIsLoading(false);
      return () => {
        isActive = false;
      };
    }

    setIsLoading(true);
    setError(false);
    setWeatherError(false);
    setWeather(null);
    setDestinationCoordinates(null);

    const fetchDestinationCoordinates = async () => {
      try {
        const location = await getPlaceCoordinates(
          destination.name,
          destination.name
        );

        if (!isActive) return;

        setDestinationCoordinates({
          lat: location.lat,
          lon: location.lon,
        });

        try {
          const weatherData = await getWeather(location.lat, location.lon);

          if (isActive) {
            setWeather(weatherData);
            setWeatherError(false);
          }
        } catch (error) {
          if (isActive) {
            console.error("Unable to load weather:", error);
            setWeatherError(true);
          }
        }
      } catch (error) {
        if (isActive) {
          console.error(error);
          setError(true);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchDestinationCoordinates();

    return () => {
      isActive = false;
    };
  }, [destinationId, retryCount]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!destination) {
    return (
      <main className="destination-page">
        <section className="destination-page__not-found">
          <h1 className="destination-page__not-found-title">
            Oops! Lost your way?
          </h1>

          <p className="destination-page__not-found-message">
            This destination doesn't exist.
          </p>

          <p className="destination-page__not-found-description">
            The destination you're looking for may have moved or the link may be
            incorrect.
          </p>

          <Link to="/" className="destination-page__not-found-link">
            ← Back to destinations
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="destination-page">
      <Hero
        title={destination.name}
        subtitle={destination.description}
        image={destination.image}
      />

      {error && (
        <div className="destination-page__error">
          <p role="alert">
            We couldn't load the map for this destination. Please try again.
          </p>

          <button
            type="button"
            className="destination-page__retry-button"
            onClick={() => setRetryCount((prevCount) => prevCount + 1)}
          >
            Try again
          </button>
        </div>
      )}

      <div className="destination-page__info">
        <section className="destination-page__overview">
          <p>{destination.overview}</p>
        </section>

        {(weather || weatherError) && (
          <section className="destination-page__weather">
            {weatherError && (
              <p className="destination-page__weather-error" role="alert">
                Weather information is currently unavailable. Please try again
                later.
              </p>
            )}
            {weather && (
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
            )}
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

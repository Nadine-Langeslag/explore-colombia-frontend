const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const getPlaceCoordinates = async (placeName, city) => {
  const params = new URLSearchParams({
    text: `${placeName}, ${city}, Colombia`,
    format: "json",
    limit: 1,
    apiKey: GEOAPIFY_API_KEY,
  });

  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?${params}`
  );

  if (!response.ok) {
    throw new Error("Unable to retrieve location data.");
  }

  const data = await response.json();

  return data.results[0];
};

export const searchNearbyPlaces = async (
  categories,
  lat,
  lon,
  radius = 5000
) => {
  const url = `https://api.geoapify.com/v2/places?apiKey=${GEOAPIFY_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categories,
      filter: {
        type: "circle",
        lon,
        lat,
        radius,
      },
      limit: 20,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve nearby places.");
  }

  const data = await response.json();

  return data.features;
};
export const getWeather = async (lat, lon) => {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
    timezone: "auto",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`
  );

  if (!response.ok) {
    throw new Error("Unable to retrieve weather data.");
  }

  const data = await response.json();

  return data.current;
};

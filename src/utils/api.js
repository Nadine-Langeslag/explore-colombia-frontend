const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

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

  if (!data.results.length) {
    throw new Error(`Location not found: ${placeName}`);
  }

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
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getExperiences = async (itemId, itemType) => {
  const { data } = await request(`/experiences/${itemType}/${itemId}`, {
    headers: getAuthHeaders(),
  });

  return data;
};

export const createExperience = async (itemId, itemType, text) => {
  const { data } = await request(`/experiences/${itemType}/${itemId}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ text }),
  });

  return data;
};

export const editExperience = async (experienceId, text) => {
  const { data } = await request(`/experiences/${experienceId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ text }),
  });

  return data;
};

export const deleteExperience = async (experienceId) => {
  return request(`/experiences/${experienceId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};

export const getSavedItems = async () => {
  const { data } = await request("/saved-destinations", {
    headers: getAuthHeaders(),
  });

  return data;
};

export const saveItem = async (itemId, itemType) => {
  const { data } = await request("/saved-destinations", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ itemId, itemType }),
  });

  return data;
};

export const removeSavedItem = async (savedItemId) => {
  return request(`/saved-destinations/${savedItemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};

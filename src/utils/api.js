const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const handleApiError = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Weather service unavailable. Please check your API key in the .env file.');
    }
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || 'Failed to fetch weather data');
  }
  return response.json();
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );
    return handleApiError(response);
  } catch (error) {
    throw error;
  }
};

export const getWeatherByCity = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    );
    return handleApiError(response);
  } catch (error) {
    throw error;
  }
};
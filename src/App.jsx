import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import LoadingSpinner from './components/LoadingSpinner'
import WeeklyForcast from './components/WeeklyForecast'
import ErrorMessage from './components/ErrorMessage'
import { getBackgroundImage } from './utils/backgroundImages'
import { getWeatherByCity, getWeatherByCoords } from './utils/api'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [geoError, setGeoError] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState(null)

  // Get user's location when app loads
  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const data = await getWeatherByCoords(latitude, longitude);
            setWeatherData(data);
            setGeoError(null);
          } catch (err) {
            setGeoError('Weather data not available. Please search for a city instead.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setGeoError('Location access denied. Please search for a city instead.');
          setLoading(false);
        }
      );
    } else {
      setGeoError('Geolocation is not supported by your browser. Please search for a city instead.');
    }
  }, []); // Run once when component mounts

  useEffect(() => {
    if (weatherData?.weather?.[0]?.main) {
      const newBackground = getBackgroundImage(weatherData.weather[0].main);
      setBackgroundImage(newBackground);
    } else {
      setBackgroundImage(getBackgroundImage());
    }
  }, [weatherData]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleRetryGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setGeoError(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const data = await getWeatherByCoords(latitude, longitude);
            setWeatherData(data);
            setGeoError(null);
          } catch (err) {
            setGeoError('Weather data not available. Please search for a city instead.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setGeoError('Location access denied. Please search for a city instead.');
          setLoading(false);
        }
      );
    }
  };

  return (
    <>
      {/* Fixed position background */}
      <div
        className="bg-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className="bg-overlay" />

      {/* Main content */}
      <div className="relative min-h-screen font-['Poppins'] z-10">
        <div className="px-4 sm:px-6 py-8">
          <div className="w-full max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6 sm:mb-8 
                        bg-gradient-to-r from-[#00c6ff] to-[#0072ff] 
                        text-transparent bg-clip-text drop-shadow-lg"
            >
              TempNow
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <SearchBar onSearch={fetchWeather} />
            </motion.div>
            
            {geoError && (
              <ErrorMessage
              type="warning"
              message={geoError}
              onRetry={!geoError?.includes('not supported') ? handleRetryGeolocation : undefined}
              />
            )}
            
            <div className="flex items-center justify-center mt-6 sm:mt-8 w-full">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl 
                              p-8 sm:p-10 w-full max-w-md mx-auto text-center"
                  >
                    <LoadingSpinner />
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4 text-white/80 text-sm sm:text-base"
                    >
                      {error ? "Searching for your city..." :
                       geoError ? "Please enter a city name above" :
                       "Detecting your location..."}
                    </motion.p>
                  </motion.div>
                )}
                {error && (
                  <ErrorMessage
                    key="error"
                    type="error"
                    message={error}
                    onDismiss={() => setError(null)}
                  />
                )}
                {weatherData && <WeatherCard key="weather" data={weatherData} />}
                {weatherData && (
                  <WeeklyForcast
                    key="forecast"
                    forecast={weatherData.forecast}
                    isLoading={loading}
                    error={error}
                  />
                )}
              </AnimatePresence>
            </div>

            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 text-center text-sm text-white/40 hover:text-white/60 transition-colors duration-300"
            >
              <a
                href="https://openweathermap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                Powered by OpenWeatherMap
                <svg 
                  className="w-3 h-3 mb-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </motion.footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
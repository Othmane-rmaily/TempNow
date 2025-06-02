import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { getBackgroundImage } from './utils/backgroundImages'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState(null)

  useEffect(() => {
    if (weatherData?.weather?.[0]?.main) {
      const newBackground = getBackgroundImage(weatherData.weather[0].main)
      setBackgroundImage(newBackground)
    } else {
      setBackgroundImage(getBackgroundImage())
    }
  }, [weatherData])

  const fetchWeather = async (city) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3b1030315e641561f60535c426d48795&units=metric`)
      if (!response.ok) throw new Error('City not found')
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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
            
            <div className="flex items-center justify-center mt-6 sm:mt-8 w-full">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="animate-pulse bg-white/10 backdrop-blur-md rounded-2xl 
                              p-4 sm:p-8 w-full max-w-md mx-auto"
                  >
                    <div className="h-8 bg-white/20 rounded-lg mb-4"></div>
                    <div className="h-20 w-20 sm:h-24 sm:w-24 bg-white/20 rounded-full mx-auto mb-4"></div>
                    <div className="h-16 sm:h-20 bg-white/20 rounded-lg mb-6"></div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="h-20 sm:h-24 bg-white/20 rounded-lg"></div>
                      <div className="h-20 sm:h-24 bg-white/20 rounded-lg"></div>
                    </div>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-red-500/10 backdrop-blur-md text-red-200 
                              px-4 sm:px-6 py-4 rounded-xl border border-red-500/20
                              w-full max-w-md mx-auto"
                  >
                    <p className="flex items-center gap-2 text-sm sm:text-base">
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </p>
                  </motion.div>
                )}
                {weatherData && <WeatherCard key="weather" data={weatherData} />}
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
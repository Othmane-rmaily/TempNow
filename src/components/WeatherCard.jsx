import { motion, AnimatePresence } from 'framer-motion';
import { WiDaySunnyOvercast, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { getWeatherIcon } from '../utils/weatherIcons';

function WeatherCard({ data }) {
  const IconComponent = getWeatherIcon(data.weather[0].icon);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative isolate animate-fade-in
                 bg-gradient-to-br from-white/10 via-white/5 to-transparent 
                 backdrop-blur-xl shadow-2xl rounded-3xl 
                 p-4 sm:p-8 w-full max-w-[calc(100vw-2rem)] md:max-w-2xl lg:max-w-4xl mx-auto
                 border border-white/20 font-['Poppins']
                 hover:scale-[1.02] sm:hover:scale-[1.01] hover:from-white/15 
                 hover:via-white/10 hover:to-transparent
                 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
                 transform transition-all duration-500 ease-out"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#00c6ff]/30 to-[#0072ff]/30 
                  blur-2xl group-hover:opacity-40 transition-opacity duration-500"
      />
      
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8">
        {/* Left section with city and icon */}
        <div className="flex flex-col items-center lg:items-start flex-1">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl text-center lg:text-left bg-gradient-to-r 
                     from-white to-blue-200 bg-clip-text text-transparent 
                     font-semibold mb-4 tracking-tight"
          >
            {data.name}
          </motion.h2>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="relative w-32 h-32 lg:w-48 lg:h-48 my-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00c6ff]/10 to-[#0072ff]/10 
                         rounded-full blur-3xl transform group-hover:scale-110 transition-transform duration-500"/>
            <IconComponent className="w-full h-full text-blue-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]
                                   transform group-hover:scale-110 transition-transform duration-500"/>
          </motion.div>
        </div>

        {/* Right section with temperature and details */}
        <div className="flex flex-col justify-between flex-1 w-full lg:w-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 
                      rounded-2xl p-4 sm:p-6 backdrop-blur-md mb-6 
                      border border-white/10 group-hover:border-white/20
                      transition-all duration-500"
          >
            <motion.div
              animate={{ x: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold bg-gradient-to-br 
                        from-white to-blue-200 bg-clip-text text-transparent 
                        text-center lg:text-left mb-2 tracking-tight"
            >
              {Math.round(data.main.temp)}°
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-base sm:text-lg lg:text-xl text-center lg:text-left 
                        text-blue-50/90 capitalize font-medium"
            >
              {data.weather[0].description}
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
            {/* Humidity card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md 
                        rounded-xl p-3 sm:p-4 border border-white/10 
                        hover:from-white/15 hover:to-white/5
                        hover:border-white/20 hover:scale-105
                        transition-all duration-300 group-hover:shadow-lg"
            >
              <p className="text-blue-50/90 flex items-center gap-2 mb-1 sm:mb-2 
                           text-xs sm:text-sm font-medium uppercase tracking-wide">
                <WiHumidity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                Humidity
              </p>
              <p className="text-2xl sm:text-3xl bg-gradient-to-r from-white to-blue-200 
                           bg-clip-text text-transparent font-semibold tracking-tight">
                {data.main.humidity}%
              </p>
            </motion.div>

            {/* Wind speed card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md 
                        rounded-xl p-3 sm:p-4 border border-white/10 
                        hover:from-white/15 hover:to-white/5
                        hover:border-white/20 hover:scale-105
                        transition-all duration-300 group-hover:shadow-lg"
            >
              <p className="text-blue-50/90 flex items-center gap-2 mb-1 sm:mb-2 
                           text-xs sm:text-sm font-medium uppercase tracking-wide">
                <WiStrongWind className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                Wind
              </p>
              <p className="text-2xl sm:text-3xl bg-gradient-to-r from-white to-blue-200 
                           bg-clip-text text-transparent font-semibold tracking-tight">
                {data.wind.speed} m/s
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherCard

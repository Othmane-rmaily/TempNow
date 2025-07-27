import { motion } from 'framer-motion';

const HourlyForecast = ({ forecast, isLoading, error }) => {
  if (error) return null;
  if (isLoading) {
    return (
      <div className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4">
        <div className="h-[100px] animate-pulse bg-white/20 rounded"></div>
      </div>
    );
  }

  if (!forecast?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4"
    >
      <h2 className="text-white/90 font-semibold mb-4">Next 12 Hours</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {forecast.map((hour, index) => (
          <div
            key={hour.dt}
            className="flex flex-col items-center min-w-[100px] p-3 bg-white/5 rounded-lg"
          >            <span className="text-white/80 text-sm">
              {new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: 'numeric',
                hour12: true,
              })}
            </span>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
              className="w-12 h-12"
            />
            <span className="text-white font-medium">
              {Math.round(hour.main.temp)}°C
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HourlyForecast;

import { motion } from 'framer-motion';

const WeeklyForecast = ({ forecast, isLoading, error }) => {
  if (error) return null;
  if (isLoading) {
    return (
      <div className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4">
        <div className="h-[200px] animate-pulse bg-white/20 rounded"></div>
      </div>
    );
  }

  if (!forecast?.list?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4"
    >
      <h2 className="text-white/90 font-semibold mb-4">7-Day Forecast</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {forecast.list.map((day) => (
          <div
            key={day.dt}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
          >
            <div className="flex flex-col">
              <span className="text-white/80">
                {new Date(day.dt * 1000).toLocaleDateString([], {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span className="text-white/60 text-sm">{day.weather[0].description}</span>
            </div>
            <div className="flex items-center">
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-12 h-12"
              />
              <div className="flex flex-col ml-2 items-end">
                <span className="text-white font-medium">
                  {Math.round(day.temp.max)}°C
                </span>
                <span className="text-white/60 text-sm">
                  {Math.round(day.temp.min)}°C
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeeklyForecast;

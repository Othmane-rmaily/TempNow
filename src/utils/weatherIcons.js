import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiDayShowers,
  WiNightAltShowers,
  WiDayRain,
  WiNightAltRain,
  WiDayThunderstorm,
  WiNightAltThunderstorm,
  WiDaySnow,
  WiNightAltSnow,
  WiDayFog,
  WiNightFog,
} from 'react-icons/wi';

// Map OpenWeather icon codes to react-icons components
const iconMap = {
  '01d': WiDaySunny,        // clear sky (day)
  '01n': WiNightClear,      // clear sky (night)
  '02d': WiDayCloudy,       // few clouds (day)
  '02n': WiNightAltCloudy,  // few clouds (night)
  '03d': WiCloudy,          // scattered clouds (day)
  '03n': WiCloudy,          // scattered clouds (night)
  '04d': WiCloudy,          // broken clouds (day)
  '04n': WiCloudy,          // broken clouds (night)
  '09d': WiDayShowers,      // shower rain (day)
  '09n': WiNightAltShowers, // shower rain (night)
  '10d': WiDayRain,         // rain (day)
  '10n': WiNightAltRain,    // rain (night)
  '11d': WiDayThunderstorm, // thunderstorm (day)
  '11n': WiNightAltThunderstorm, // thunderstorm (night)
  '13d': WiDaySnow,         // snow (day)
  '13n': WiNightAltSnow,    // snow (night)
  '50d': WiDayFog,          // mist (day)
  '50n': WiNightFog,        // mist (night)
};

export const getWeatherIcon = (iconCode) => {
  return iconMap[iconCode] || WiCloudy; // Default to cloudy if code not found
};

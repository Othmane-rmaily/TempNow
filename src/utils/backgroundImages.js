import clearSky from '../assets/Clear Sky .png'
import fewClouds from '../assets/Few Clouds.png'
import scatteredClouds from '../assets/Scattered Clouds.png'
import rainy from '../assets/Rainy.png'
import thunderstorm from '../assets/Thunderstorm.png'
import snowy from '../assets/Snowy.png'
import mistFog from '../assets/MistFog.png'
import windy from '../assets/Windy.png'
import defaultBg from '../assets/background.png'

export const getBackgroundImage = (weatherCondition) => {
  if (!weatherCondition) return defaultBg;

  const condition = weatherCondition.toLowerCase();

  if (condition.includes('clear')) return clearSky;
  if (condition.includes('clouds') || condition.includes('cloudy')) return scatteredClouds;
  if (condition.includes('few clouds')) return fewClouds;
  if (condition.includes('rain') || condition.includes('drizzle')) return rainy;
  if (condition.includes('thunderstorm')) return thunderstorm;
  if (condition.includes('snow')) return snowy;
  if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) return mistFog;
  if (condition.includes('wind')) return windy;

  return defaultBg;
};

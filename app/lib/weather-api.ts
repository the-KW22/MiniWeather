import { 
  CurrentWeather, 
  Forecast, 
  OpenWeatherResponse,
  OpenWeatherForecastResponse 
} from "@/app/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }

  const data: OpenWeatherResponse = await response.json();

  return {
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    visibility: data.visibility,
    wind_speed: data.wind.speed,
    wind_deg: data.wind.deg,
    clouds: data.clouds.all,
    dt: data.dt,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    weather: data.weather,
    city: data.name,
    country: data.sys.country,
  };
}

export async function getForecast(
  lat: number,
  lon: number
): Promise<Forecast> {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Forecast API error: ${response.statusText}`);
  }

  const data: OpenWeatherForecastResponse = await response.json();

  return {
    list: data.list.map((item) => ({
      dt: item.dt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
      pressure: item.main.pressure,
      humidity: item.main.humidity,
      weather: item.weather,
      clouds: item.clouds.all,
      wind_speed: item.wind.speed,
      wind_deg: item.wind.deg,
      pop: item.pop,
    })),
    city: {
      name: data.city.name,
      country: data.city.country,
      sunrise: data.city.sunrise,
      sunset: data.city.sunset,
    },
  };
}
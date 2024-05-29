// services/weatherService.ts
import axios from "axios";

interface a {
  description: string;
}
interface WeatherData {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
      temp_max: string;
      temp_min: string;
      feels_like: string;
      humidity: string;
    };
    weather: a[];
    pop: string;
    wind: {
      speed: string;
    };
  }>;
  city: {
    name: string;
  };
}

export const fetchWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`, // 노출 제거
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: process.env.EXPO_PUBLIC_API_KEY,
          units: "metric",
          lang: "ko",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

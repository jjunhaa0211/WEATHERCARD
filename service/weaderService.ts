// services/weatherService.ts
import axios from "axios";
import { API_KEY } from "./API_KEY";

interface WeatherData {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
    }>;
    pop: number;
    wind: {
      speed: number;
    };
  }>;
  city: {
    name: string;
  };
}

export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
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
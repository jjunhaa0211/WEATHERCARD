import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { lineStyle } from "./style/line";
import { weatherStyle } from "./style/weatherStyle";
import { DateDisplay } from "./components/DateDisplay";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { WeatherDetails } from "./components/WeatherDetails";
import * as Location from "expo-location";
import {
  getDayOfWeek,
  getFormattedDate,
  getFormattedTime,
} from "./Util/fomatDate";
import { fetchWeatherData } from "./service/weaderService";
import SplashScreen from "react-native-splash-screen";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface Day {
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
}

export default function App() {
  const [city, setCity] = useState<string>("Loading...");
  const [days, setDays] = useState<Day[]>([]);
  const [ok, setOk] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const getLocationAndWeather = async () => {
    const data = await Location.requestForegroundPermissionsAsync();
    if (!data.granted) {
      setOk(false);
      return;
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const [{ city }]: any = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    setCity(city);

    try {
      const json = await fetchWeatherData(latitude, longitude);
      setCity(json.city.name);
      setDays(json.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  return (
    <View style={weatherStyle.container}>
      <StatusBar style="dark" />
      <ScrollView
        horizontal={true}
        style={weatherStyle.scrollView}
        pagingEnabled
      >
        {days.length === 0 ? (
          <View
            style={{ ...weatherStyle.innerContainer, alignItems: "center" }}
          >
            <ActivityIndicator color="black" size="large" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={weatherStyle.innerContainer}>
              <View style={{ height: 80 }} />
              <DateDisplay
                day={getDayOfWeek(day.dt_txt)}
                date={getFormattedDate(day.dt_txt)}
                time={getFormattedTime(day.dt_txt)}
              />
              <View style={lineStyle.line1}></View>
              <WeatherDisplay
                temperature={Math.round(day.main.temp)}
                weather={day.weather[0].description}
              />
              <View style={lineStyle.line1}></View>
              <WeatherDetails
                high={day.main.temp_max}
                low={day.main.temp_min}
                feel={day.main.feels_like}
                precipitation={day.pop}
                wind={day.wind.speed}
                humidity={day.main.humidity}
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

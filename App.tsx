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
import { lineStyle } from "./style/line"; // 묶을 수 있는 것을 묶어라
import { weatherStyle } from "./style/weatherStyle";
import { DateDisplay, WeatherDisplay, WeatherDetails } from "./components";
import * as Location from "expo-location";
import { fetchWeatherData } from "./service/weaderService";
import {
  getDayOfWeek,
  getFormattedDate,
  getFormattedTime,
} from "./Util/fomatDate";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface Day {
  dt_txt: string;
  main: {
    temp: number;
    temp_max: string;
    temp_min: string;
    feels_like: string;
    humidity: string;
  };
  weather: {
    description: string;
  }[];
  pop: string;
  wind: {
    speed: string;
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
          days.map(({ dt_txt, main, wind, weather, pop }, index) => (
            <View key={index} style={weatherStyle.innerContainer}>
              <View style={{ height: 80 }} />
              <DateDisplay
                day={getDayOfWeek(dt_txt)}
                date={getFormattedDate(dt_txt)}
                time={getFormattedTime(dt_txt)}
              />
              <View style={lineStyle.line1}></View>
              <WeatherDisplay
                temperature={Math.round(main.temp)}
                weather={weather[0].description}
              />
              <View style={lineStyle.line1}></View>
              <WeatherDetails
                high={main.temp_max}
                low={main.temp_min}
                feel={main.feels_like}
                precipitation={pop}
                wind={wind.speed}
                humidity={main.humidity}
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

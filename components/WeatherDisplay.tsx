import React from "react";
import { Text, View } from "react-native";
import { weatherStyle } from "../style/weatherStyle";

interface WeatherDisplayProps {
  temperature: number;
  weather: string;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  temperature,
  weather,
}) => {
  return (
    <View style={weatherStyle.weatherDisplayContainer}>
      <Text style={weatherStyle.temperatureText}>{temperature}°</Text>
      <Text style={weatherStyle.weatherText}>{weather}</Text>
    </View>
  );
};

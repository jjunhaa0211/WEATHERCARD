import React from "react";
import { Text, View } from "react-native";
import { weatherStyle } from "../style/weatherStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface WeatherDetailsProps {
  high: string;
  low: string;
  precipitation: string;
  wind: string;
  feel: string;
  humidity: string;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  high,
  low,
  precipitation,
  wind,
  feel,
  humidity,
}) => {
  return (
    <View style={weatherStyle.weatherDetailsContainer}>
      <View>
        <Icon name="thermometer-high" size={14} color="#000" />
        <Text style={weatherStyle.weatherDetailBoldText}>{high}°</Text>
        <Icon name="thermometer-low" size={14} color="#000" />
        <Text style={weatherStyle.weatherDetailText}>{low}°</Text>
        <Icon name="thermometer-lines" size={14} color="#000" />
        <Text style={weatherStyle.weatherDetailText}>{feel}°</Text>
      </View>
      <View>
        <Icon name="weather-rainy" size={14} color="#000" />
        <Text style={weatherStyle.weatherDetailBoldText}>
          {precipitation} Precipitation
        </Text>
        <Icon name="weather-windy" size={14} color="#000" />
        <Text style={weatherStyle.weatherDetailText}>{wind}km/h</Text>
        <Icon name="water-percent" size={14} color="#000" />
        <Text style={weatherStyle.weatherDetailText}>{humidity}%</Text>
      </View>
    </View>
  );
};

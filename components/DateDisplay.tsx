import React from "react";
import { Text, View } from "react-native";
import { weatherStyle } from "../style/weatherStyle";

interface DateDisplayProps {
  day: string;
  date: string;
  time: string;
}

export const DateDisplay = ({ day, date, time }: DateDisplayProps) => {
  return (
    <View style={weatherStyle.dateContainer}>
      <Text style={weatherStyle.dayText}>{day}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={weatherStyle.dateText}>{date}</Text>
        <Text style={[weatherStyle.dateText, { marginLeft: 10 }]}>{time}</Text>
      </View>
    </View>
  );
};

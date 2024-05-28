import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "./color";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const weatherStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
    paddingLeft: 20,
    paddingRight: 20,
    width: SCREEN_WIDTH,
  },
  innerContainer: {
    width: SCREEN_WIDTH - 40,
  },
  scrollView: {
    flex: 1,
  },
  dateContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
  },
  dayText: {
    color: "black",
    fontWeight: "700",
    fontSize: 28,
  },
  dateText: {
    fontFamily: "light",
    fontSize: 23,
  },
  weatherDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherDetailText: {
    margin: 2,
    fontSize: 18,
  },
  weatherDetailBoldText: {
    margin: 2,
    fontWeight: "bold",
    fontSize: 18,
  },
  weatherDisplayContainer: {
    flex: 3,
    justifyContent: "center",
    gap: 0,
    marginLeft: 10,
  },
  temperatureText: {
    color: "black",
    fontWeight: "900",
    fontSize: 150,
    marginTop: -10,
  },
  weatherText: {
    fontFamily: "light",
    fontSize: 23,
    marginTop: -20,
  },
});

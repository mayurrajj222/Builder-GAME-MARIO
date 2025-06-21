import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { GameScreen } from "./react-native/screens/GameScreen";

const { width, height } = Dimensions.get("window");

export default function App() {
  useEffect(() => {
    // Lock orientation to landscape
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <GameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e40af",
    width: width,
    height: height,
  },
});

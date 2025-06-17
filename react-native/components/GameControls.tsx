import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

interface GameControlsProps {
  onMove: (direction: "left" | "right" | "stop") => void;
  onJump: () => void;
  onRun: (isRunning: boolean) => void;
  onPause: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

export function GameControls({
  onMove,
  onJump,
  onRun,
  onPause,
}: GameControlsProps) {
  return (
    <View style={styles.container}>
      {/* Left Side - Movement */}
      <View style={styles.leftControls}>
        {/* D-Pad */}
        <View style={styles.dpad}>
          <TouchableOpacity
            style={[styles.button, styles.leftButton]}
            onPressIn={() => onMove("left")}
            onPressOut={() => onMove("stop")}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.rightButton]}
            onPressIn={() => onMove("right")}
            onPressOut={() => onMove("stop")}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Side - Actions */}
      <View style={styles.rightControls}>
        {/* Jump Button */}
        <TouchableOpacity
          style={[styles.button, styles.jumpButton]}
          onPress={onJump}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>🦘</Text>
        </TouchableOpacity>

        {/* Run Button */}
        <TouchableOpacity
          style={[styles.button, styles.runButton]}
          onPressIn={() => onRun(true)}
          onPressOut={() => onRun(false)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>🏃</Text>
        </TouchableOpacity>
      </View>

      {/* Pause Button */}
      <TouchableOpacity
        style={styles.pauseButton}
        onPress={onPause}
        activeOpacity={0.7}
      >
        <Text style={styles.pauseText}>⏸️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  leftControls: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightControls: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  dpad: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  leftButton: {
    backgroundColor: "rgba(59, 130, 246, 0.9)",
  },
  rightButton: {
    backgroundColor: "rgba(59, 130, 246, 0.9)",
  },
  jumpButton: {
    backgroundColor: "rgba(34, 197, 94, 0.9)",
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  runButton: {
    backgroundColor: "rgba(239, 68, 68, 0.9)",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pauseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(107, 114, 128, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  pauseText: {
    fontSize: 20,
  },
});

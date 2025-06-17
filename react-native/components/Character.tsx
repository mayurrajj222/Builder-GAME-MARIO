import React from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import { Player } from "../types/game";
import { PLAYER_CONFIG } from "../lib/gameConstants";

interface CharacterProps {
  player: Player;
  camera: { x: number; y: number };
}

export function Character({ player, camera }: CharacterProps) {
  const config = PLAYER_CONFIG[player.character];
  const screenX = player.position.x - camera.x;
  const screenY = player.position.y - camera.y;

  const animatedStyle = {
    left: screenX,
    top: screenY,
    width: player.size.width,
    height: player.size.height,
    transform: [
      { scaleX: player.direction === "left" ? -1 : 1 },
      { scale: player.powerUp === "mushroom" ? 1.2 : 1 },
    ],
  };

  return (
    <Animated.View style={[styles.character, animatedStyle]}>
      {/* Character Sprite */}
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/player-d7e8a5?format=webp&width=800",
        }}
        style={[
          styles.sprite,
          {
            tintColor: config.color,
          },
        ]}
        resizeMode="contain"
      />

      {/* Character Indicator */}
      <Text style={styles.indicator}>
        {player.character === "dudu" ? "🔥" : "💙"}
      </Text>

      {/* Health Bar */}
      <View style={styles.healthContainer}>
        {Array.from({ length: player.health }).map((_, i) => (
          <View key={i} style={styles.healthDot} />
        ))}
      </View>

      {/* Power-up Effects */}
      {player.powerUp === "star" && <Animated.View style={styles.starEffect} />}

      {/* Character Name */}
      <Text style={styles.name}>{config.name}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  character: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  sprite: {
    width: "100%",
    height: "100%",
  },
  indicator: {
    position: "absolute",
    fontSize: 16,
    opacity: 0.11,
  },
  healthContainer: {
    position: "absolute",
    top: -12,
    left: 0,
    flexDirection: "row",
    gap: 2,
  },
  healthDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ef4444",
  },
  name: {
    position: "absolute",
    bottom: -20,
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  starEffect: {
    position: "absolute",
    width: "120%",
    height: "120%",
    borderRadius: 20,
    backgroundColor: "#fbbf24",
    opacity: 0.3,
  },
});

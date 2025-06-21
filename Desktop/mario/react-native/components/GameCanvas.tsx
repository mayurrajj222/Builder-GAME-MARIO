import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { Character } from "./Character";
import { Enemy } from "./Enemy";
import { Collectible } from "./Collectible";
import { Platform } from "./Platform";
import { GameUI } from "./GameUI";
import { GameState } from "../types/game";

interface GameCanvasProps {
  gameState: GameState;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function GameCanvas({ gameState }: GameCanvasProps) {
  const { player, enemies, collectibles, platforms, camera, level } = gameState;

  const getBackgroundImage = () => {
    switch (level) {
      case 1:
        return {
          uri: "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/bg-ce4320?format=webp&width=800",
        };
      default:
        return {
          uri: "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/bg-ce4320?format=webp&width=800",
        };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Background */}
      <ImageBackground
        source={getBackgroundImage()}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Game World */}
        <View style={styles.gameWorld}>
          {/* Platforms */}
          {platforms.map((platform) => (
            <Platform key={platform.id} platform={platform} camera={camera} />
          ))}

          {/* Collectibles */}
          {collectibles.map((collectible) => (
            <Collectible
              key={collectible.id}
              collectible={collectible}
              camera={camera}
            />
          ))}

          {/* Enemies */}
          {enemies.map((enemy) => (
            <Enemy key={enemy.id} enemy={enemy} camera={camera} />
          ))}

          {/* Player */}
          <Character player={player} camera={camera} />
        </View>

        {/* Game UI Overlay */}
        <GameUI gameState={gameState} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3a8a",
  },
  background: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  gameWorld: {
    flex: 1,
    position: "relative",
  },
});

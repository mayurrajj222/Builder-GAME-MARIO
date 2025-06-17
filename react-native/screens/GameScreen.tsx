import React, { useEffect, useRef } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { GameCanvas } from "../components/GameCanvas";
import { GameControls } from "../components/GameControls";
import { CharacterSelect } from "../components/CharacterSelect";
import { GameOverScreen } from "../components/GameOverScreen";
import { PauseScreen } from "../components/PauseScreen";
import { useGame } from "../hooks/useGame";

export default function GameScreen() {
  const {
    gameState,
    selectedCharacter,
    startGame,
    pauseGame,
    resetGame,
    selectCharacter,
    nextLevel,
  } = useGame();

  const gameLoopRef = useRef<number>();

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (gameState.gameStatus === "playing") {
          pauseGame();
          return true; // Prevent default back action
        }
        return false; // Allow default back action
      },
    );

    return () => backHandler.remove();
  }, [gameState.gameStatus, pauseGame]);

  const handleMove = (direction: "left" | "right" | "stop") => {
    // Update controls based on direction
    // This would integrate with your game controls system
  };

  const handleJump = () => {
    // Trigger jump action
  };

  const handleRun = (isRunning: boolean) => {
    // Toggle run mode
  };

  const handlePause = () => {
    if (gameState.gameStatus === "playing") {
      pauseGame();
    } else if (gameState.gameStatus === "paused") {
      startGame();
    }
  };

  const handleRestart = () => {
    resetGame();
  };

  const handleBackToMenu = () => {
    resetGame();
  };

  return (
    <View style={styles.container}>
      {gameState.gameStatus === "menu" && (
        <CharacterSelect
          selectedCharacter={selectedCharacter}
          onSelectCharacter={selectCharacter}
          onStartGame={startGame}
        />
      )}

      {(gameState.gameStatus === "playing" ||
        gameState.gameStatus === "paused") && (
        <>
          <GameCanvas gameState={gameState} />
          <GameControls
            onMove={handleMove}
            onJump={handleJump}
            onRun={handleRun}
            onPause={handlePause}
          />

          {gameState.gameStatus === "paused" && (
            <PauseScreen
              gameState={gameState}
              onResume={() => startGame()}
              onRestart={handleRestart}
              onBackToMenu={handleBackToMenu}
            />
          )}
        </>
      )}

      {(gameState.gameStatus === "gameOver" ||
        gameState.gameStatus === "levelComplete") && (
        <GameOverScreen
          gameState={gameState}
          onRestart={handleRestart}
          onBackToMenu={handleBackToMenu}
          onNextLevel={nextLevel}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3a8a",
  },
});

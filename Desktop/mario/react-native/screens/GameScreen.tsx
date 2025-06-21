import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { GameCanvas } from "../components/GameCanvas";
import { GameControls } from "../components/GameControls";
import { useGame } from "../../src/hooks/useGame";

const { width, height } = Dimensions.get("window");

export function GameScreen() {
  const {
    gameState,
    selectedCharacter,
    startGame,
    pauseGame,
    resetGame,
    selectCharacter,
    nextLevel,
  } = useGame();

  const [controls, setControls] = useState({
    left: false,
    right: false,
    jump: false,
    run: false,
  });

  // Handle mobile controls
  const handleMove = (direction: "left" | "right" | "stop") => {
    setControls((prev) => ({
      ...prev,
      left: direction === "left",
      right: direction === "right",
    }));
  };

  const handleJump = () => {
    setControls((prev) => ({ ...prev, jump: true }));
    setTimeout(() => {
      setControls((prev) => ({ ...prev, jump: false }));
    }, 100);
  };

  const handleRun = (isRunning: boolean) => {
    setControls((prev) => ({ ...prev, run: isRunning }));
  };

  const handlePause = () => {
    if (gameState.gameStatus === "playing") {
      pauseGame();
    } else if (gameState.gameStatus === "paused") {
      startGame();
    }
  };

  // Character selection screen
  if (gameState.gameStatus === "menu") {
    return (
      <View style={styles.menuContainer}>
        <StatusBar hidden />
        <Text style={styles.title}>Super Dudu & Bubu</Text>
        <Text style={styles.subtitle}>Choose Your Character</Text>

        <View style={styles.characterContainer}>
          <TouchableOpacity
            style={[
              styles.characterButton,
              selectedCharacter === "bubu" && styles.selectedCharacter,
            ]}
            onPress={() => selectCharacter("bubu")}
          >
            <Text style={styles.characterEmoji}>🐼</Text>
            <Text style={styles.characterName}>Bubu</Text>
            <Text style={styles.characterDescription}>Agile Panda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.characterButton,
              selectedCharacter === "dudu" && styles.selectedCharacter,
            ]}
            onPress={() => selectCharacter("dudu")}
          >
            <Text style={styles.characterEmoji}>🐻</Text>
            <Text style={styles.characterName}>Dudu</Text>
            <Text style={styles.characterDescription}>Strong Bear</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>🎮 START GAME</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Game screen
  return (
    <View style={styles.gameContainer}>
      <StatusBar hidden />

      {/* Game Canvas */}
      <View style={styles.canvasContainer}>
        <GameCanvas gameState={gameState} />
      </View>

      {/* Game Controls */}
      <GameControls
        onMove={handleMove}
        onJump={handleJump}
        onRun={handleRun}
        onPause={handlePause}
        controls={controls}
      />

      {/* Game Over Screen */}
      {(gameState.gameStatus === "gameOver" ||
        gameState.gameStatus === "levelComplete") && (
        <View style={styles.gameOverContainer}>
          <View style={styles.gameOverCard}>
            <Text style={styles.gameOverTitle}>
              {gameState.gameStatus === "levelComplete"
                ? "🎉 LEVEL COMPLETE!"
                : "💀 GAME OVER"}
            </Text>

            <Text style={styles.scoreText}>
              Score: {gameState.score.toLocaleString()}
            </Text>

            <Text style={styles.levelText}>Level: {gameState.level}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={resetGame}>
                <Text style={styles.actionButtonText}>🔄 PLAY AGAIN</Text>
              </TouchableOpacity>

              {gameState.gameStatus === "levelComplete" &&
                gameState.level < 15 && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.nextButton]}
                    onPress={nextLevel}
                  >
                    <Text style={styles.actionButtonText}>➡️ NEXT LEVEL</Text>
                  </TouchableOpacity>
                )}

              <TouchableOpacity
                style={[styles.actionButton, styles.menuButton]}
                onPress={() => resetGame()}
              >
                <Text style={styles.actionButtonText}>🏠 MENU</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Pause Screen */}
      {gameState.gameStatus === "paused" && (
        <View style={styles.pauseContainer}>
          <View style={styles.pauseCard}>
            <Text style={styles.pauseTitle}>⏸️ PAUSED</Text>

            <TouchableOpacity style={styles.actionButton} onPress={startGame}>
              <Text style={styles.actionButtonText}>▶️ RESUME</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.menuButton]}
              onPress={resetGame}
            >
              <Text style={styles.actionButtonText}>🏠 MENU</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  characterContainer: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 40,
  },
  characterButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "transparent",
    minWidth: 150,
  },
  selectedCharacter: {
    borderColor: "#ffd700",
    backgroundColor: "rgba(255,215,0,0.2)",
  },
  characterEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  characterDescription: {
    fontSize: 16,
    color: "#ddd",
  },
  startButton: {
    backgroundColor: "#4ade80",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderWidth: 4,
    borderColor: "#22c55e",
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  gameContainer: {
    flex: 1,
    backgroundColor: "#1e40af",
  },
  canvasContainer: {
    flex: 1,
  },
  gameOverContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverCard: {
    backgroundColor: "rgba(30,64,175,0.95)",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
    maxWidth: width * 0.8,
  },
  gameOverTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    color: "#ffd700",
    marginBottom: 10,
  },
  levelText: {
    fontSize: 20,
    color: "#60a5fa",
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 15,
    width: "100%",
  },
  actionButton: {
    backgroundColor: "#22c55e",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 3,
    borderColor: "#16a34a",
  },
  nextButton: {
    backgroundColor: "#a855f7",
    borderColor: "#9333ea",
  },
  menuButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.3)",
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  pauseContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  pauseCard: {
    backgroundColor: "rgba(30,64,175,0.95)",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
    gap: 20,
  },
  pauseTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
});

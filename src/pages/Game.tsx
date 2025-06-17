import React, { useEffect, useState } from "react";
import { useGame } from "@/hooks/useGame";
import { CharacterSelect } from "@/components/Game/CharacterSelect";
import { GameCanvas } from "@/components/Game/GameCanvas";
import { GameOverScreen } from "@/components/Game/GameOverScreen";
import { PauseScreen } from "@/components/Game/PauseScreen";
import { MobileControls } from "@/components/Game/MobileControls";

export default function Game() {
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
    // Reset jump after a short delay
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

  const handleResumeGame = () => {
    startGame();
  };

  const handleBackToMenu = () => {
    resetGame();
  };

  // Lock screen orientation to landscape on mobile
  useEffect(() => {
    const lockOrientation = () => {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {
          // Fallback for browsers that don't support orientation lock
        });
      }
    };

    lockOrientation();

    // Prevent zoom on mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
      {gameState.gameStatus === "menu" && (
        <CharacterSelect
          selectedCharacter={selectedCharacter}
          onSelectCharacter={selectCharacter}
          onStartGame={startGame}
        />
      )}

      {(gameState.gameStatus === "playing" ||
        gameState.gameStatus === "paused") && (
        <div className="relative h-screen flex flex-col">
          {/* Game Canvas - Takes most of the screen */}
          <div className="flex-1 flex items-center justify-center p-2">
            <GameCanvas gameState={gameState} />
          </div>

          {/* Mobile Controls */}
          <MobileControls
            onMove={handleMove}
            onJump={handleJump}
            onRun={handleRun}
            onPause={handlePause}
          />

          {gameState.gameStatus === "paused" && (
            <PauseScreen
              gameState={gameState}
              onResume={handleResumeGame}
              onRestart={resetGame}
              onBackToMenu={handleBackToMenu}
            />
          )}
        </div>
      )}

      {(gameState.gameStatus === "gameOver" ||
        gameState.gameStatus === "levelComplete") && (
        <GameOverScreen
          gameState={gameState}
          onRestart={resetGame}
          onBackToMenu={handleBackToMenu}
          onNextLevel={nextLevel}
        />
      )}
    </div>
  );
}

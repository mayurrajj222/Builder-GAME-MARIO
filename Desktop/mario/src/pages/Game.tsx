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
    controls,
    selectedCharacter,
    startGame,
    pauseGame,
    resetGame,
    selectCharacter,
    handleMove,
    handleJump,
    handleRun,
    nextLevel,
  } = useGame();

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

  // Lock screen orientation to landscape on mobile and optimize for horizontal play
  useEffect(() => {
    // Prevent zoom on mobile and optimize for touch
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent context menu on long press
    const handleContextMenu = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("contextmenu", handleContextMenu, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden landscape:h-screen">
      {gameState.gameStatus === "menu" && (
        <CharacterSelect
          selectedCharacter={selectedCharacter}
          onSelectCharacter={selectCharacter}
          onStartGame={startGame}
        />
      )}

      {(gameState.gameStatus === "playing" ||
        gameState.gameStatus === "paused") && (
        <div className="relative h-screen flex landscape:flex-row flex-col">
          {/* Game Canvas - True fullscreen */}
          <div className="flex-1 w-full h-full">
            <GameCanvas gameState={gameState} />
          </div>

          {/* Mobile Controls - Positioned for landscape */}
          <MobileControls
            onMove={handleMove}
            onJump={handleJump}
            onRun={handleRun}
            onPause={handlePause}
            controls={controls}
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

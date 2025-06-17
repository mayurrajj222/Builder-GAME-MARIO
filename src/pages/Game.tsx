import React from "react";
import { useGame } from "@/hooks/useGame";
import { CharacterSelect } from "@/components/Game/CharacterSelect";
import { GameCanvas } from "@/components/Game/GameCanvas";
import { GameOverScreen } from "@/components/Game/GameOverScreen";
import { PauseScreen } from "@/components/Game/PauseScreen";

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

  const handleResumeGame = () => {
    startGame();
  };

  const handleBackToMenu = () => {
    resetGame();
  };

  const handleNextLevel = () => {
    nextLevel();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {gameState.gameStatus === "menu" && (
        <CharacterSelect
          selectedCharacter={selectedCharacter}
          onSelectCharacter={selectCharacter}
          onStartGame={startGame}
        />
      )}

      {(gameState.gameStatus === "playing" ||
        gameState.gameStatus === "paused") && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <GameCanvas gameState={gameState} />

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
        />
      )}
    </div>
  );
}

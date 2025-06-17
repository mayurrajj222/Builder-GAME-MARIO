import React from "react";
import { Button } from "@/components/ui/button";
import { GameState } from "@/types/game";
import { PLAYER_CONFIG } from "@/lib/gameConstants";
import { cn } from "@/lib/utils";

interface GameOverScreenProps {
  gameState: GameState;
  onRestart: () => void;
  onBackToMenu: () => void;
  onNextLevel: () => void;
}

export function GameOverScreen({
  gameState,
  onRestart,
  onBackToMenu,
  onNextLevel,
}: GameOverScreenProps) {
  const { player, score, level } = gameState;
  const config = PLAYER_CONFIG[player.character];
  const isVictory = gameState.gameStatus === "levelComplete";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      {/* Fullscreen landscape optimized game over screen */}
      <div className="w-full h-full flex items-center justify-center p-4 landscape:p-8">
        <div className="bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-md border-4 border-white/30 rounded-2xl shadow-2xl max-w-4xl w-full landscape:max-h-[90vh] overflow-y-auto">
          {/* Header Section */}
          <div className="text-center p-6 landscape:p-8">
            {/* Character Icon */}
            <div
              className={cn(
                "w-16 h-16 landscape:w-20 landscape:h-20 mx-auto rounded-full flex items-center justify-center text-2xl landscape:text-4xl font-bold text-white shadow-lg border-4 border-white/20 mb-4",
                isVictory ? "animate-bounce" : "animate-pulse",
              )}
              style={{
                backgroundColor: config.color,
                borderColor: config.darkColor,
              }}
            >
              {player.character === "bubu" ? "🐼" : "🐻"}
            </div>

            {/* Title */}
            <h1
              className={cn(
                "text-2xl landscape:text-4xl font-game text-white drop-shadow-lg mb-3",
                isVictory ? "text-yellow-300" : "text-red-300",
              )}
            >
              {isVictory ? "🎉 LEVEL COMPLETE! 🎉" : "💀 GAME OVER 💀"}
            </h1>

            <p className="text-lg landscape:text-xl text-white/80 mb-6">
              {isVictory
                ? `${config.name} successfully completed Level ${level}!`
                : `${config.name} fought bravely but couldn't complete the quest.`}
            </p>
          </div>

          {/* Stats and Actions - Horizontal layout for landscape */}
          <div className="px-6 landscape:px-8 pb-6 landscape:pb-8">
            <div className="landscape:flex landscape:gap-8 space-y-6 landscape:space-y-0">
              {/* Stats Section */}
              <div className="landscape:flex-1">
                <div className="bg-black/30 rounded-lg p-4 landscape:p-6 mb-6">
                  <h3 className="text-xl landscape:text-2xl font-game text-white text-center mb-4">
                    🏆 Final Stats 🏆
                  </h3>

                  <div className="grid grid-cols-2 landscape:grid-cols-4 gap-4 text-white">
                    <div className="text-center">
                      <div className="text-2xl landscape:text-3xl font-bold text-yellow-400">
                        {score.toLocaleString()}
                      </div>
                      <div className="text-xs landscape:text-sm text-white/70">
                        Score
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl landscape:text-3xl font-bold text-blue-400">
                        {level}
                      </div>
                      <div className="text-xs landscape:text-sm text-white/70">
                        Level
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl landscape:text-3xl font-bold text-green-400">
                        {gameState.lives}
                      </div>
                      <div className="text-xs landscape:text-sm text-white/70">
                        Lives
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl landscape:text-3xl font-bold text-purple-400">
                        {Math.floor(gameState.timeRemaining)}s
                      </div>
                      <div className="text-xs landscape:text-sm text-white/70">
                        Time
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements - Compact for landscape */}
                <div className="bg-black/20 rounded-lg p-4 hidden landscape:block">
                  <h4 className="text-lg font-game text-white mb-3 text-center">
                    ⭐ Achievements ⭐
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div
                      className={cn(
                        "flex items-center justify-between p-2 rounded",
                        score >= 1000
                          ? "bg-green-500/20 text-green-300"
                          : "bg-gray-500/20 text-gray-400",
                      )}
                    >
                      <span>Score Master</span>
                      <span>{score >= 1000 ? "✅" : "❌"}</span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center justify-between p-2 rounded",
                        level >= 2
                          ? "bg-green-500/20 text-green-300"
                          : "bg-gray-500/20 text-gray-400",
                      )}
                    >
                      <span>Level Explorer</span>
                      <span>{level >= 2 ? "✅" : "❌"}</span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center justify-between p-2 rounded",
                        player.health ===
                          PLAYER_CONFIG[player.character].maxHealth
                          ? "bg-green-500/20 text-green-300"
                          : "bg-gray-500/20 text-gray-400",
                      )}
                    >
                      <span>Full Health</span>
                      <span>
                        {player.health ===
                        PLAYER_CONFIG[player.character].maxHealth
                          ? "✅"
                          : "❌"}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center justify-between p-2 rounded",
                        isVictory
                          ? "bg-green-500/20 text-green-300"
                          : "bg-gray-500/20 text-gray-400",
                      )}
                    >
                      <span>Victory!</span>
                      <span>{isVictory ? "✅" : "❌"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="landscape:w-80 flex flex-col justify-center">
                <div className="space-y-4">
                  <Button
                    size="lg"
                    onClick={onRestart}
                    className={cn(
                      "w-full text-lg landscape:text-xl py-4 landscape:py-6 font-game font-bold shadow-xl border-4",
                      "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
                      "border-green-400 text-white transition-all duration-300 transform hover:scale-105",
                    )}
                  >
                    🔄 PLAY AGAIN
                  </Button>

                  {isVictory && level < 15 && (
                    <Button
                      size="lg"
                      onClick={onNextLevel}
                      className={cn(
                        "w-full text-lg landscape:text-xl py-4 landscape:py-6 font-game font-bold shadow-xl border-4",
                        "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
                        "border-purple-400 text-white transition-all duration-300 transform hover:scale-105",
                      )}
                    >
                      ➡️ NEXT LEVEL
                    </Button>
                  )}

                  <Button
                    size="lg"
                    onClick={onBackToMenu}
                    className={cn(
                      "w-full text-lg landscape:text-xl py-4 landscape:py-6 font-game font-bold shadow-xl border-4",
                      "bg-white/10 hover:bg-white/20 border-white/30 text-white",
                      "transition-all duration-300 transform hover:scale-105",
                    )}
                  >
                    🏠 MAIN MENU
                  </Button>
                </div>

                {/* Encouragement Message */}
                <div className="text-center text-white/70 text-sm landscape:text-base mt-6">
                  {isVictory ? (
                    <p>🌟 Incredible job! You've mastered this level! 🌟</p>
                  ) : (
                    <p>💪 Don't give up! Every hero faces challenges! 💪</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

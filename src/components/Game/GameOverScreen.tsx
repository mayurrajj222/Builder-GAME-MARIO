import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white/10 backdrop-blur-md border-4 border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          {/* Character Icon */}
          <div
            className={cn(
              "w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-white/20",
              isVictory ? "animate-bounce" : "animate-pulse",
            )}
            style={{
              backgroundColor: config.color,
              borderColor: config.darkColor,
            }}
          >
            {player.character === "dudu" ? "🔥" : "💙"}
          </div>

          {/* Title */}
          <CardTitle
            className={cn(
              "text-4xl font-game text-white drop-shadow-lg",
              isVictory ? "text-yellow-300" : "text-red-300",
            )}
          >
            {isVictory ? "🎉 LEVEL COMPLETE! 🎉" : "💀 GAME OVER 💀"}
          </CardTitle>

          <CardDescription className="text-xl text-white/80">
            {isVictory
              ? `${config.name} successfully completed Level ${level}!`
              : `${config.name} fought bravely but couldn't complete the quest.`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Final Stats */}
          <div className="bg-black/30 rounded-lg p-6 space-y-4">
            <h3 className="text-2xl font-game text-white text-center mb-4">
              🏆 Final Stats 🏆
            </h3>

            <div className="grid grid-cols-2 gap-4 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {score.toLocaleString()}
                </div>
                <div className="text-sm text-white/70">Total Score</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{level}</div>
                <div className="text-sm text-white/70">Level Reached</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {gameState.lives}
                </div>
                <div className="text-sm text-white/70">Lives Remaining</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {Math.floor(gameState.timeRemaining)}s
                </div>
                <div className="text-sm text-white/70">Time Left</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-black/20 rounded-lg p-4">
            <h4 className="text-lg font-game text-white mb-3 text-center">
              ⭐ Achievements ⭐
            </h4>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div
                className={cn(
                  "flex items-center justify-between p-2 rounded",
                  score >= 1000
                    ? "bg-green-500/20 text-green-300"
                    : "bg-gray-500/20 text-gray-400",
                )}
              >
                <span>Score Master (1000+ points)</span>
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
                <span>Level Explorer (Reach Level 2)</span>
                <span>{level >= 2 ? "✅" : "❌"}</span>
              </div>

              <div
                className={cn(
                  "flex items-center justify-between p-2 rounded",
                  player.health === PLAYER_CONFIG[player.character].maxHealth
                    ? "bg-green-500/20 text-green-300"
                    : "bg-gray-500/20 text-gray-400",
                )}
              >
                <span>Unscathed Hero (Full Health)</span>
                <span>
                  {player.health === PLAYER_CONFIG[player.character].maxHealth
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
                <span>Victory Royale</span>
                <span>{isVictory ? "✅" : "❌"}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={onRestart}
              className={cn(
                "flex-1 text-lg py-6 font-game font-bold shadow-xl border-4",
                "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
                "border-green-400 text-white transition-all duration-300 transform hover:scale-105",
              )}
            >
              🔄 PLAY AGAIN
            </Button>

            {isVictory && level < 2 && (
              <Button
                size="lg"
                onClick={onRestart}
                className={cn(
                  "flex-1 text-lg py-6 font-game font-bold shadow-xl border-4",
                  "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
                  "border-purple-400 text-white transition-all duration-300 transform hover:scale-105",
                )}
              >
                ➡️ NEXT LEVEL
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              onClick={onBackToMenu}
              className={cn(
                "flex-1 text-lg py-6 font-game font-bold shadow-xl border-4",
                "bg-white/10 hover:bg-white/20 border-white/30 text-white",
                "transition-all duration-300 transform hover:scale-105",
              )}
            >
              🏠 MAIN MENU
            </Button>
          </div>

          {/* Encouragement Message */}
          <div className="text-center text-white/70 text-sm">
            {isVictory ? (
              <p>🌟 Incredible job! You've mastered this level! 🌟</p>
            ) : (
              <p>💪 Don't give up! Every great hero faces challenges! 💪</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

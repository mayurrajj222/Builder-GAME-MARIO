import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameState } from "@/types/game";
import { PLAYER_CONFIG } from "@/lib/gameConstants";
import { cn } from "@/lib/utils";

interface PauseScreenProps {
  gameState: GameState;
  onResume: () => void;
  onRestart: () => void;
  onBackToMenu: () => void;
}

export function PauseScreen({
  gameState,
  onResume,
  onRestart,
  onBackToMenu,
}: PauseScreenProps) {
  const { player, score, level, timeRemaining } = gameState;
  const config = PLAYER_CONFIG[player.character];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="max-w-md w-full mx-4 bg-white/10 backdrop-blur-md border-4 border-white/20 shadow-2xl animate-pulse">
        <CardHeader className="text-center space-y-4">
          {/* Character Icon */}
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white/20"
            style={{
              backgroundColor: config.color,
              borderColor: config.darkColor,
            }}
          >
            {player.character === "dudu" ? "🔥" : "💙"}
          </div>

          <CardTitle className="text-3xl font-game text-white drop-shadow-lg">
            ⏸️ GAME PAUSED ⏸️
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Stats */}
          <div className="bg-black/30 rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-game text-white text-center mb-3">
              📊 Current Progress
            </h3>

            <div className="grid grid-cols-2 gap-3 text-white text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-400">
                  {score.toLocaleString()}
                </div>
                <div className="text-xs text-white/70">Score</div>
              </div>

              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">
                  Level {level}
                </div>
                <div className="text-xs text-white/70">Current Level</div>
              </div>

              <div className="text-center">
                <div className="text-xl font-bold text-green-400">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-xs text-white/70">Time Left</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center gap-1">
                  {Array.from({ length: player.health }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-red-400 rounded-full" />
                  ))}
                </div>
                <div className="text-xs text-white/70">Health</div>
              </div>
            </div>
          </div>

          {/* Controls Reminder */}
          <div className="bg-black/20 rounded-lg p-4">
            <h4 className="text-sm font-game text-white mb-2 text-center">
              🎮 Controls
            </h4>
            <div className="text-xs text-white/80 space-y-1">
              <div className="flex justify-between">
                <span>Move:</span>
                <span>← → or A D</span>
              </div>
              <div className="flex justify-between">
                <span>Jump:</span>
                <span>↑ W SPACE</span>
              </div>
              <div className="flex justify-between">
                <span>Run:</span>
                <span>Hold SHIFT</span>
              </div>
              <div className="flex justify-between">
                <span>Pause:</span>
                <span>ESC</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              size="lg"
              onClick={onResume}
              className={cn(
                "w-full text-lg py-4 font-game font-bold shadow-xl border-4",
                "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
                "border-green-400 text-white transition-all duration-300 transform hover:scale-105",
                "animate-pulse",
              )}
            >
              ▶️ RESUME GAME
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={onRestart}
              className={cn(
                "w-full text-lg py-4 font-game font-bold shadow-xl border-4",
                "bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-400 text-yellow-300",
                "transition-all duration-300 transform hover:scale-105",
              )}
            >
              🔄 RESTART LEVEL
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={onBackToMenu}
              className={cn(
                "w-full text-lg py-4 font-game font-bold shadow-xl border-4",
                "bg-white/10 hover:bg-white/20 border-white/30 text-white",
                "transition-all duration-300 transform hover:scale-105",
              )}
            >
              🏠 MAIN MENU
            </Button>
          </div>

          {/* Pause Tip */}
          <div className="text-center text-white/60 text-xs">
            💡 Tip: Take a moment to plan your next moves!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import React from "react";
import { GameState } from "@/types/game";
import { cn } from "@/lib/utils";
import { PLAYER_CONFIG } from "@/lib/gameConstants";

interface GameUIProps {
  gameState: GameState;
}

export function GameUI({ gameState }: GameUIProps) {
  const { player, score, lives, level, timeRemaining } = gameState;
  const playerConfig = PLAYER_CONFIG[player.character];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/60 to-transparent p-4">
      <div className="flex justify-between items-center text-white font-game">
        {/* Left side - Character and lives */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white/20"
              style={{
                backgroundColor: playerConfig.color,
                borderColor: playerConfig.darkColor,
              }}
            >
              {player.character === "dudu" ? "🔥" : "💙"}
            </div>
            <span className="text-lg font-bold">{playerConfig.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm">Lives:</span>
            {Array.from({ length: lives }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-red-500 rounded-full" />
            ))}
          </div>

          {/* Health */}
          <div className="flex items-center gap-1">
            <span className="text-sm">Health:</span>
            {Array.from({ length: player.health }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-green-500 rounded-full" />
            ))}
          </div>
        </div>

        {/* Center - Score */}
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
            {score.toLocaleString()}
          </div>
          <div className="text-xs text-yellow-200">SCORE</div>
        </div>

        {/* Right side - Level and time */}
        <div className="text-right">
          <div className="text-lg font-bold">Level {level}</div>
          <div
            className={cn(
              "text-sm",
              timeRemaining < 30
                ? "text-red-400 animate-pulse"
                : "text-blue-200",
            )}
          >
            Time: {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      {/* Power-up indicator */}
      {player.powerUp && (
        <div className="absolute top-16 left-4 bg-purple-600/80 rounded-lg px-3 py-1 text-white text-sm font-bold animate-pulse">
          Power-up: {player.powerUp.toUpperCase()}
          {player.powerUp === "star" && " ⭐"}
          {player.powerUp === "mushroom" && " 🍄"}
          {player.powerUp === "fireflower" && " 🌺"}
        </div>
      )}

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs">
        <div>Use ← → or A D to move</div>
        <div>↑ or W or SPACE to jump</div>
        <div>Hold SHIFT to run</div>
        <div>ESC to pause</div>
      </div>
    </div>
  );
}

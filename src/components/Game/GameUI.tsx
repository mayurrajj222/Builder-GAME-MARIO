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
    <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/60 to-transparent landscape:p-3 portrait:p-2">
      <div className="flex justify-between items-center text-white font-game landscape:text-sm portrait:text-xs">
        {/* Left side - Character and status */}
        <div className="flex items-center landscape:gap-3 portrait:gap-2">
          <div
            className="landscape:w-8 landscape:h-8 portrait:w-6 portrait:h-6 rounded-lg flex items-center justify-center landscape:text-sm portrait:text-xs font-bold shadow-lg border border-white/20"
            style={{
              backgroundColor: playerConfig.color,
              borderColor: playerConfig.darkColor,
            }}
          >
            {player.character === "bubu" ? "🐼" : "🐻"}
          </div>

          <div className="flex landscape:flex-row landscape:gap-4 portrait:flex-col portrait:gap-0">
            <div className="flex items-center gap-1">
              <span>❤️</span>
              {Array.from({ length: player.health }).map((_, i) => (
                <div
                  key={i}
                  className="landscape:w-3 landscape:h-3 portrait:w-2 portrait:h-2 bg-red-500 rounded-full"
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span>👤</span>
              {Array.from({ length: lives }).map((_, i) => (
                <div
                  key={i}
                  className="landscape:w-3 landscape:h-3 portrait:w-2 portrait:h-2 bg-blue-500 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center - Score */}
        <div className="text-center">
          <div className="landscape:text-2xl portrait:text-lg font-bold text-yellow-400 drop-shadow-lg">
            {score.toLocaleString()}
          </div>
        </div>

        {/* Right side - Level and time */}
        <div className="text-right">
          <div className="landscape:text-lg portrait:text-sm font-bold">
            L{level}
          </div>
          <div
            className={cn(
              "landscape:text-sm portrait:text-xs",
              timeRemaining < 30
                ? "text-red-400 animate-pulse"
                : "text-blue-200",
            )}
          >
            {formatTime(timeRemaining)}
          </div>
          {/* Progress indicator */}
          <div className="mt-1 bg-gray-600 rounded-full h-2 w-16 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-green-400 h-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (player.position.x / (level <= 2 ? 2800 : level <= 5 ? 2500 : level <= 10 ? 2700 : 2900)) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Power-up indicator */}
      {player.powerUp && (
        <div className="absolute landscape:top-20 landscape:left-6 portrait:top-16 portrait:left-4 bg-purple-600/80 rounded-lg px-3 py-1 text-white landscape:text-base portrait:text-sm font-bold animate-pulse">
          Power-up: {player.powerUp.toUpperCase()}
          {player.powerUp === "star" && " ⭐"}
          {player.powerUp === "mushroom" && " 🍄"}
          {player.powerUp === "fireflower" && " 🌺"}
        </div>
      )}

      {/* Level completion hint */}
      {(() => {
        const levelEndX =
          level <= 2 ? 2800 : level <= 5 ? 2500 : level <= 10 ? 2700 : 2900;
        const distanceToEnd = levelEndX - player.position.x;
        const showHint = distanceToEnd < 400 && distanceToEnd > 0;

        return showHint ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500/90 text-black px-4 py-2 rounded-lg font-bold text-lg animate-pulse">
            🏁 Goal Ahead! Keep going! 🏁
          </div>
        ) : null;
      })()}

      {/* Controls hint - Only show on desktop/large screens */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs hidden lg:block">
        <div>Use ← → or A D to move</div>
        <div>↑ or W or SPACE to jump</div>
        <div>Hold SHIFT to run</div>
        <div>ESC to pause</div>
      </div>
    </div>
  );
}

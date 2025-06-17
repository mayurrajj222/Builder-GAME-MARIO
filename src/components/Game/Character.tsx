import React from "react";
import { Player } from "@/types/game";
import { PLAYER_CONFIG } from "@/lib/gameConstants";
import { cn } from "@/lib/utils";

interface CharacterProps {
  player: Player;
  camera: { x: number; y: number };
}

export function Character({ player, camera }: CharacterProps) {
  const config = PLAYER_CONFIG[player.character];
  const screenX = player.position.x - camera.x;
  const screenY = player.position.y - camera.y;

  const characterStyle = {
    left: `${screenX}px`,
    top: `${screenY}px`,
    width: `${player.size.width}px`,
    height: `${player.size.height}px`,
  };

  return (
    <div
      className={cn(
        "absolute transition-transform duration-75",
        "flex items-center justify-center rounded-lg font-bold text-white text-xs",
        "shadow-lg border-2 border-white/20",
        player.isJumping && "animate-jump",
        player.isMoving && "animate-walk",
        player.powerUp === "star" && "animate-pulse",
        player.direction === "left" && "scale-x-[-1]",
      )}
      style={{
        ...characterStyle,
        backgroundColor: config.color,
        borderColor: config.darkColor,
        transform: `scaleX(${player.direction === "left" ? -1 : 1}) ${
          player.powerUp === "mushroom" ? "scale(1.2)" : ""
        }`,
      }}
    >
      {player.character === "dudu" ? "🔥" : "💙"}

      {/* Power-up effects */}
      {player.powerUp === "star" && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-50 animate-spin" />
      )}

      {player.powerUp === "fireflower" && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
      )}

      {/* Health indicator */}
      <div className="absolute -top-3 left-0 flex gap-1">
        {Array.from({ length: player.health }).map((_, i) => (
          <div key={i} className="w-1 h-1 bg-red-500 rounded-full" />
        ))}
      </div>

      {/* Character name */}
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-game text-white drop-shadow-md">
        {config.name}
      </div>
    </div>
  );
}

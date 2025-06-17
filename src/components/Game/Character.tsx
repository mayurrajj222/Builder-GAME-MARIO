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
        "shadow-lg player-sprite remove-white-bg",
        player.isJumping && "animate-jump",
        player.isMoving && "animate-walk",
        player.powerUp === "star" && "animate-pulse",
        player.direction === "left" && "scale-x-[-1]",
      )}
      style={{
        ...characterStyle,
        transform: `scaleX(${player.direction === "left" ? -1 : 1}) ${
          player.powerUp === "mushroom" ? "scale(1.2)" : ""
        }`,
        backgroundImage: `url(https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/player-d7e8a5?format=webp&width=800)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        mixBlendMode: "multiply",
        filter:
          player.character === "dudu"
            ? "hue-rotate(0deg) saturate(1.2)"
            : "hue-rotate(200deg) saturate(1.2)",
      }}
    >
      {/* Character indicator overlay */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center text-lg font-bold",
          "mix-blend-mode-overlay opacity-[0.11]",
        )}
      >
        {player.character === "dudu" ? "🔥" : "💙"}
      </div>

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

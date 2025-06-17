import React from "react";
import { Collectible as CollectibleType } from "@/types/game";
import { cn } from "@/lib/utils";

interface CollectibleProps {
  collectible: CollectibleType;
  camera: { x: number; y: number };
}

export function Collectible({ collectible, camera }: CollectibleProps) {
  const screenX = collectible.position.x - camera.x;
  const screenY = collectible.position.y - camera.y;

  const collectibleStyle = {
    left: `${screenX}px`,
    top: `${screenY}px`,
    width: `${collectible.size.width}px`,
    height: `${collectible.size.height}px`,
  };

  const getCollectibleContent = () => {
    switch (collectible.type) {
      case "coin":
        return "🪙";
      case "powerup":
        switch (collectible.powerUpType) {
          case "mushroom":
            return "🍄";
          case "fireflower":
            return "🌺";
          case "star":
            return "⭐";
          default:
            return "💊";
        }
      default:
        return "💎";
    }
  };

  const getBackgroundColor = () => {
    switch (collectible.type) {
      case "coin":
        return "bg-gradient-to-br from-yellow-400 to-yellow-600";
      case "powerup":
        switch (collectible.powerUpType) {
          case "mushroom":
            return "bg-gradient-to-br from-red-400 to-red-600";
          case "fireflower":
            return "bg-gradient-to-br from-orange-400 to-red-500";
          case "star":
            return "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500";
          default:
            return "bg-gradient-to-br from-blue-400 to-blue-600";
        }
      default:
        return "bg-gradient-to-br from-purple-400 to-purple-600";
    }
  };

  return (
    <div
      className={cn(
        "absolute transition-all duration-200",
        "flex items-center justify-center rounded-full",
        "shadow-lg border-2 border-white/30",
        "animate-float",
        collectible.type === "coin" && "animate-spin",
        collectible.powerUpType === "star" && "animate-pulse",
        getBackgroundColor(),
      )}
      style={collectibleStyle}
    >
      <span className="text-xs drop-shadow-sm">{getCollectibleContent()}</span>

      {/* Glow effect for special items */}
      {collectible.powerUpType === "star" && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 opacity-30 animate-ping" />
      )}

      {collectible.type === "coin" && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-20 animate-pulse" />
      )}

      {/* Value indicator */}
      {collectible.value > 100 && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white drop-shadow-md">
          {collectible.value}
        </div>
      )}
    </div>
  );
}

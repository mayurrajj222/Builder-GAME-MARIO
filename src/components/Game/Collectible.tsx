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
        return null; // Using background image instead
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

  const getBackgroundStyle = () => {
    switch (collectible.type) {
      case "coin":
        return {
          backgroundImage: `url(https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/coin-a69003?format=webp&width=800)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "transparent",
          mixBlendMode: "multiply" as const,
        };
      case "powerup":
        switch (collectible.powerUpType) {
          case "mushroom":
            return { backgroundColor: "#ef4444" };
          case "fireflower":
            return { backgroundColor: "#f97316" };
          case "star":
            return { backgroundColor: "#fbbf24" };
          default:
            return { backgroundColor: "#3b82f6" };
        }
      default:
        return { backgroundColor: "#a855f7" };
    }
  };

  return (
    <div
      className={cn(
        "absolute transition-all duration-200",
        "flex items-center justify-center",
        collectible.type === "coin"
          ? "rounded-full coin-sprite remove-white-bg"
          : "rounded-full",
        "shadow-lg border-2 border-white/30",
        "animate-float",
        collectible.type === "coin" && "animate-spin",
        collectible.powerUpType === "star" && "animate-pulse",
        collectible.type !== "coin" &&
          "bg-gradient-to-br from-current to-current",
      )}
      style={{
        ...collectibleStyle,
        ...getBackgroundStyle(),
      }}
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

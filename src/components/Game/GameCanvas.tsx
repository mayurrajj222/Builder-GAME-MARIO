import React from "react";
import { GameState } from "@/types/game";
import { Character } from "./Character";
import { Enemy } from "./Enemy";
import { Collectible } from "./Collectible";
import { Platform } from "./Platform";
import { GameUI } from "./GameUI";
import { GAME_CONFIG } from "@/lib/gameConstants";
import { cn } from "@/lib/utils";

interface GameCanvasProps {
  gameState: GameState;
}

export function GameCanvas({ gameState }: GameCanvasProps) {
  const { player, enemies, collectibles, platforms, camera, level } = gameState;

  // Fullscreen canvas dimensions
  const canvasWidth = GAME_CONFIG.LANDSCAPE_MODE
    ? window.innerWidth
    : GAME_CONFIG.CANVAS_WIDTH;
  const canvasHeight = GAME_CONFIG.LANDSCAPE_MODE
    ? window.innerHeight
    : Math.min(window.innerHeight - 120, GAME_CONFIG.CANVAS_HEIGHT);

  const getBackgroundStyle = () => {
    // Same beautiful background for all levels
    return {
      backgroundImage: `linear-gradient(180deg, rgba(135, 206, 235, 0.8) 0%, rgba(176, 224, 230, 0.6) 40%, rgba(152, 251, 152, 0.4) 100%), url(https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/bg-ce4320?format=webp&width=800)`,
      backgroundSize: "cover, cover",
      backgroundRepeat: "no-repeat, repeat-x",
      backgroundPosition: "center, bottom",
      backgroundAttachment: "fixed", // Keep background stable during scrolling
    };
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "select-none touch-none", // Prevent text selection and touch scrolling
        "landscape:w-full landscape:h-full", // Take full screen in landscape
      )}
      style={{
        width: "100vw",
        height: "100vh",
        ...getBackgroundStyle(),
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Clouds for outdoor levels */}
        {level === 1 && (
          <>
            <div
              className="absolute w-16 h-8 bg-white/80 rounded-full"
              style={{
                left: `${200 - camera.x * 0.3}px`,
                top: "50px",
              }}
            />
            <div
              className="absolute w-20 h-10 bg-white/70 rounded-full"
              style={{
                left: `${600 - camera.x * 0.2}px`,
                top: "80px",
              }}
            />
            <div
              className="absolute w-12 h-6 bg-white/90 rounded-full"
              style={{
                left: `${1200 - camera.x * 0.4}px`,
                top: "40px",
              }}
            />
          </>
        )}

        {/* Stalactites for underground levels */}
        {level === 2 && (
          <>
            <div
              className="absolute w-4 h-12 bg-gray-600 rounded-b-full"
              style={{
                left: `${300 - camera.x}px`,
                top: "0px",
              }}
            />
            <div
              className="absolute w-6 h-16 bg-gray-700 rounded-b-full"
              style={{
                left: `${800 - camera.x}px`,
                top: "0px",
              }}
            />
            <div
              className="absolute w-3 h-8 bg-gray-500 rounded-b-full"
              style={{
                left: `${1400 - camera.x}px`,
                top: "0px",
              }}
            />
          </>
        )}
      </div>

      {/* Game entities */}
      <div className="absolute inset-0">
        {/* Platforms */}
        {platforms.map((platform) => (
          <Platform key={platform.id} platform={platform} camera={camera} />
        ))}

        {/* Collectibles */}
        {collectibles.map((collectible) => (
          <Collectible
            key={collectible.id}
            collectible={collectible}
            camera={camera}
          />
        ))}

        {/* Enemies */}
        {enemies.map((enemy) => (
          <Enemy key={enemy.id} enemy={enemy} camera={camera} />
        ))}

        {/* Player */}
        <Character player={player} camera={camera} />
      </div>

      {/* Game UI */}
      <GameUI gameState={gameState} />

      {/* Ensure no debug overlays appear */}
    </div>
  );
}

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

  const getBackgroundStyle = () => {
    switch (level) {
      case 1:
        return {
          backgroundImage: `linear-gradient(180deg, rgba(135, 206, 235, 0.8) 0%, rgba(176, 224, 230, 0.6) 40%, rgba(152, 251, 152, 0.4) 100%), url(https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/bg-ce4320?format=webp&width=800)`,
          backgroundSize: "cover, cover",
          backgroundRepeat: "no-repeat, repeat-x",
          backgroundPosition: "center, bottom",
        };
      case 2:
        return {
          background:
            "linear-gradient(180deg, #2F4F4F 0%, #4A4A4A 50%, #1C1C1C 100%)",
        };
      default:
        return {
          backgroundImage: `linear-gradient(180deg, rgba(135, 206, 235, 0.8) 0%, rgba(176, 224, 230, 0.6) 40%, rgba(152, 251, 152, 0.4) 100%), url(https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/bg-ce4320?format=webp&width=800)`,
          backgroundSize: "cover, cover",
          backgroundRepeat: "no-repeat, repeat-x",
          backgroundPosition: "center, bottom",
        };
    }
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg shadow-2xl border-4 border-gray-800",
        "select-none",
      )}
      style={{
        height: `${GAME_CONFIG.CANVAS_HEIGHT}px`,
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

      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs p-2 rounded font-mono">
          <div>
            Player: ({Math.round(player.position.x)},{" "}
            {Math.round(player.position.y)})
          </div>
          <div>
            Camera: ({Math.round(camera.x)}, {Math.round(camera.y)})
          </div>
          <div>
            Velocity: ({Math.round(player.velocity.x * 10) / 10},{" "}
            {Math.round(player.velocity.y * 10) / 10})
          </div>
          <div>Grounded: {player.isGrounded ? "Yes" : "No"}</div>
          <div>Enemies: {enemies.length}</div>
          <div>Collectibles: {collectibles.length}</div>
        </div>
      )}
    </div>
  );
}

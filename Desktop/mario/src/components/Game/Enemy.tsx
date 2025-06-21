import React from "react";
import { Enemy as EnemyType } from "@/types/game";
import { ENEMY_TYPES } from "@/lib/gameConstants";
import { cn } from "@/lib/utils";

interface EnemyProps {
  enemy: EnemyType;
  camera: { x: number; y: number };
}

export function Enemy({ enemy, camera }: EnemyProps) {
  const config = ENEMY_TYPES[enemy.type];
  const screenX = enemy.position.x - camera.x;
  const screenY = enemy.position.y - camera.y;

  const enemyStyle = {
    left: `${screenX}px`,
    top: `${screenY}px`,
    width: `${enemy.size.width}px`,
    height: `${enemy.size.height}px`,
  };

  const getEnemyDesign = () => {
    switch (enemy.type) {
      case "goomba":
        return {
          backgroundColor: "transparent",
          background:
            "linear-gradient(180deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)",
          border: "2px solid #654321",
          borderRadius: "50% 50% 40% 40%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
        };
      case "koopa":
        return {
          backgroundColor: "transparent",
          background:
            "linear-gradient(135deg, #228B22 0%, #32CD32 30%, #7CFC00 50%, #32CD32 70%, #228B22 100%)",
          border: "2px solid #006400",
          borderRadius: "60% 60% 20% 20%",
          boxShadow: "0 3px 8px rgba(0,0,0,0.4)",
        };
      default:
        return {
          backgroundColor: config.color,
          border: "2px solid #654321",
          borderRadius: "8px",
        };
    }
  };

  const enemyDesign = getEnemyDesign();

  return (
    <div
      className={cn(
        "absolute transition-transform duration-100",
        "flex items-center justify-center overflow-hidden",
        "shadow-lg",
        enemy.direction === "left" && "scale-x-[-1]",
        "animate-walk",
      )}
      style={{
        ...enemyStyle,
        ...enemyDesign,
        transform: `scaleX(${enemy.direction === "left" ? -1 : 1})`,
      }}
    >
      {/* Goomba Design */}
      {enemy.type === "goomba" && (
        <div className="relative w-full h-full">
          {/* Body */}
          <div className="absolute inset-1 bg-gradient-to-b from-brown-400 to-brown-600 rounded-full" />
          {/* Eyes */}
          <div className="absolute top-2 left-1/4 w-2 h-2 bg-white rounded-full">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-red-600 rounded-full" />
          </div>
          <div className="absolute top-2 right-1/4 w-2 h-2 bg-white rounded-full">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-red-600 rounded-full" />
          </div>
          {/* Angry brow */}
          <div className="absolute top-1 left-1/4 right-1/4 h-1 bg-brown-800 transform -skew-x-12" />
          {/* Fangs */}
          <div className="absolute bottom-2 left-1/3 w-1 h-2 bg-white transform rotate-12" />
          <div className="absolute bottom-2 right-1/3 w-1 h-2 bg-white transform -rotate-12" />
        </div>
      )}

      {/* Koopa Design */}
      {enemy.type === "koopa" && (
        <div className="relative w-full h-full">
          {/* Shell */}
          <div className="absolute inset-1 bg-gradient-to-br from-green-300 via-green-500 to-green-700 rounded-lg" />
          {/* Shell Pattern */}
          <div className="absolute inset-2 border-2 border-green-800 rounded-lg">
            <div className="absolute top-1 left-1 right-1 h-1 bg-green-200 rounded opacity-60" />
            <div className="absolute bottom-1 left-1 right-1 h-1 bg-green-800 rounded opacity-60" />
          </div>
          {/* Head peek */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-yellow-300 rounded-t-full border border-yellow-600">
            {/* Eyes */}
            <div className="absolute top-0.5 left-1 w-1 h-1 bg-black rounded-full" />
            <div className="absolute top-0.5 right-1 w-1 h-1 bg-black rounded-full" />
          </div>
          {/* Shell segments */}
          <div className="absolute top-1/3 left-2 right-2 h-0.5 bg-green-800 rounded" />
          <div className="absolute bottom-1/3 left-2 right-2 h-0.5 bg-green-800 rounded" />
        </div>
      )}

      {/* Health indicator for multi-hit enemies */}
      {enemy.health > 1 && (
        <div className="absolute -top-3 left-0 flex gap-1">
          {Array.from({ length: enemy.health }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-red-500 rounded-full border border-red-700 shadow-sm"
            />
          ))}
        </div>
      )}

      {/* Movement trail effect */}
      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full opacity-40" />

      {/* Angry aura for higher level enemies */}
      {enemy.health > 1 && (
        <div className="absolute -inset-1 bg-red-500 rounded-full opacity-10 animate-pulse" />
      )}
    </div>
  );
}

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

  return (
    <div
      className={cn(
        "absolute transition-transform duration-100",
        "flex items-center justify-center rounded font-bold text-white text-xs",
        "shadow-md border border-white/20",
        enemy.direction === "left" && "scale-x-[-1]",
        "animate-walk",
      )}
      style={{
        ...enemyStyle,
        backgroundColor: config.color,
        transform: `scaleX(${enemy.direction === "left" ? -1 : 1})`,
      }}
    >
      {enemy.type === "goomba" ? "👹" : "🐢"}

      {/* Health indicator for multi-hit enemies */}
      {enemy.health > 1 && (
        <div className="absolute -top-2 left-0 flex gap-0.5">
          {Array.from({ length: enemy.health }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-red-400 rounded-full" />
          ))}
        </div>
      )}

      {/* Movement indicator */}
      <div
        className={cn(
          "absolute -bottom-1 w-full h-0.5 bg-white/30 rounded",
          enemy.direction === "left" ? "animate-pulse" : "animate-pulse",
        )}
      />
    </div>
  );
}

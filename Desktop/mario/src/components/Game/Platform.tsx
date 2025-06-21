import React from "react";
import { Platform as PlatformType } from "@/types/game";
import { cn } from "@/lib/utils";

interface PlatformProps {
  platform: PlatformType;
  camera: { x: number; y: number };
}

export function Platform({ platform, camera }: PlatformProps) {
  const screenX = platform.position.x - camera.x;
  const screenY = platform.position.y - camera.y;

  const platformStyle = {
    left: `${screenX}px`,
    top: `${screenY}px`,
    width: `${platform.size.width}px`,
    height: `${platform.size.height}px`,
  };

  const getPlatformStyle = () => {
    switch (platform.type) {
      case "ground":
        return {
          backgroundImage: `url(https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/ground-7a1485?format=webp&width=800)`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
          border: "3px solid #5A2A0A",
          borderRadius: "8px 8px 0 0",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        };
      case "block":
        return {
          backgroundImage: platform.isBreakable
            ? "linear-gradient(45deg, #FFD700 0%, #FFA500 25%, #FF8C00 50%, #FFD700 75%, #FFA500 100%)"
            : "linear-gradient(45deg, #8B4513 0%, #CD853F 25%, #DEB887 50%, #CD853F 75%, #8B4513 100%)",
          border: platform.isBreakable
            ? "3px solid #FF6347"
            : "3px solid #654321",
          borderRadius: "8px",
          boxShadow: platform.isBreakable
            ? "0 0 15px rgba(255, 215, 0, 0.7), inset 0 2px 4px rgba(255,255,255,0.3)"
            : "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
        };
      case "moving":
        return {
          background:
            "linear-gradient(135deg, #E6E6FA 0%, #DDA0DD 50%, #BA55D3 100%)",
          border: "3px solid #9370DB",
          borderRadius: "12px",
          boxShadow:
            "0 0 20px rgba(186, 85, 211, 0.6), 0 4px 8px rgba(0,0,0,0.3)",
        };
      case "pipe":
        return {
          background:
            "linear-gradient(90deg, #228B22 0%, #32CD32 30%, #7CFC00 50%, #32CD32 70%, #228B22 100%)",
          border: "3px solid #006400",
          borderRadius: "12px 12px 4px 4px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        };
      default:
        return {
          background: "#8B5A2B",
          border: "2px solid #5A2A0A",
        };
    }
  };

  const style = getPlatformStyle();

  return (
    <div
      className={cn(
        "absolute overflow-hidden",
        platform.type === "moving" && "animate-pulse",
        platform.isBreakable &&
          "hover:brightness-110 transition-all duration-200",
        platform.type === "ground" && "ground-sprite",
      )}
      style={{
        ...platformStyle,
        ...style,
      }}
    >
      {/* Ground grass decoration */}
      {platform.type === "ground" && (
        <>
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-400" />
          <div className="absolute top-2 left-0 right-0 h-1 bg-green-600 opacity-50" />
        </>
      )}

      {/* Treasure chest for breakable blocks */}
      {platform.type === "block" && platform.isBreakable && (
        <>
          <div className="absolute inset-2 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded border border-yellow-800" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-yellow-800 font-bold text-lg drop-shadow-md">
              💎
            </div>
          </div>
          <div className="absolute top-1 left-1 right-1 h-1 bg-yellow-200 rounded opacity-80" />
        </>
      )}

      {/* Crystal platform for moving platforms */}
      {platform.type === "moving" && (
        <>
          <div className="absolute inset-1 bg-gradient-to-b from-white to-purple-200 rounded-lg opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-purple-600 text-lg">✨</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-b-lg" />
        </>
      )}

      {/* Pipe details with better design */}
      {platform.type === "pipe" && (
        <>
          <div className="absolute top-0 left-2 right-2 h-4 bg-gradient-to-b from-green-300 to-green-500 rounded-t-lg border-2 border-green-700" />
          <div className="absolute top-4 left-3 right-3 bottom-2 bg-gradient-to-b from-green-400 via-green-500 to-green-600 rounded" />
          <div className="absolute top-6 left-4 right-4 h-2 bg-green-300 rounded opacity-70" />
          <div className="absolute bottom-4 left-4 right-4 h-2 bg-green-700 rounded opacity-70" />
          {/* Pipe entrance glow */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-pulse" />
        </>
      )}

      {/* Regular block details */}
      {platform.type === "block" && !platform.isBreakable && (
        <>
          <div className="absolute inset-2 bg-gradient-to-br from-tan via-brown-400 to-brown-600 rounded border border-brown-800" />
          <div className="absolute top-2 left-2 right-2 h-1 bg-brown-200 rounded opacity-60" />
          <div className="absolute bottom-2 left-2 right-2 h-1 bg-brown-800 rounded opacity-60" />
        </>
      )}

      {/* Enhanced shadow effects */}
      <div className="absolute -bottom-2 left-2 right-2 h-2 bg-black/20 rounded-full blur-md" />
    </div>
  );
}

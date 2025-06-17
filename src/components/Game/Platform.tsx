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
          border: "2px solid #5A2A0A",
          mixBlendMode: "multiply" as const,
        };
      case "block":
        return {
          backgroundImage: platform.isBreakable
            ? `url(https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/barrier-56015f?format=webp&width=800)`
            : "linear-gradient(45deg, #CD853F 0%, #D2691E 50%, #A0522D 100%)",
          backgroundSize: platform.isBreakable ? "cover" : "auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border: platform.isBreakable
            ? "2px solid #FF6347"
            : "2px solid #8B4513",
          mixBlendMode: platform.isBreakable
            ? ("multiply" as const)
            : ("normal" as const),
        };
      case "pipe":
        return {
          background:
            "linear-gradient(90deg, #228B22 0%, #32CD32 50%, #228B22 100%)",
          border: "2px solid #006400",
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
        "absolute shadow-md",
        platform.type === "block" && platform.size.height <= 25 && "rounded-sm",
        platform.type === "pipe" && "rounded-t-lg",
        platform.type === "ground" &&
          "border-t-4 ground-sprite remove-white-bg",
        platform.type === "block" &&
          platform.isBreakable &&
          "barrier-sprite remove-white-bg",
        platform.isBreakable &&
          "hover:brightness-110 transition-all duration-100",
      )}
      style={{
        ...platformStyle,
        ...style,
      }}
    >
      {/* Ground texture */}
      {platform.type === "ground" && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
          }}
        />
      )}

      {/* Block question mark for breakable blocks */}
      {platform.type === "block" && platform.isBreakable && (
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg drop-shadow-md animate-pulse">
          ?
        </div>
      )}

      {/* Pipe details */}
      {platform.type === "pipe" && (
        <>
          <div className="absolute top-0 left-1 right-1 h-2 bg-green-600 rounded-t-md" />
          <div className="absolute top-2 left-2 right-2 bottom-0 bg-gradient-to-b from-green-500 to-green-700" />
          <div className="absolute top-4 left-3 right-3 h-1 bg-green-400 opacity-50" />
        </>
      )}

      {/* Shadow effect for floating platforms */}
      {platform.type === "block" && platform.size.height <= 25 && (
        <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/20 rounded-full blur-sm" />
      )}
    </div>
  );
}

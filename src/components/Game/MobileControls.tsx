import React from "react";
import { cn } from "@/lib/utils";

interface MobileControlsProps {
  onMove: (direction: "left" | "right" | "stop") => void;
  onJump: () => void;
  onRun: (isRunning: boolean) => void;
  onPause: () => void;
}

export function MobileControls({
  onMove,
  onJump,
  onRun,
  onPause,
}: MobileControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 via-black/20 to-transparent">
      <div className="flex justify-between items-end">
        {/* Left Controls - Movement */}
        <div className="flex gap-3">
          {/* D-Pad */}
          <div className="flex gap-2">
            <button
              className={cn(
                "w-16 h-16 rounded-full bg-blue-500/90 border-3 border-blue-400",
                "flex items-center justify-center text-white text-2xl font-bold",
                "shadow-lg active:bg-blue-600 active:scale-95 transition-all duration-100",
                "touch-manipulation select-none",
              )}
              onTouchStart={() => onMove("left")}
              onTouchEnd={() => onMove("stop")}
              onMouseDown={() => onMove("left")}
              onMouseUp={() => onMove("stop")}
              onMouseLeave={() => onMove("stop")}
            >
              ←
            </button>

            <button
              className={cn(
                "w-16 h-16 rounded-full bg-blue-500/90 border-3 border-blue-400",
                "flex items-center justify-center text-white text-2xl font-bold",
                "shadow-lg active:bg-blue-600 active:scale-95 transition-all duration-100",
                "touch-manipulation select-none",
              )}
              onTouchStart={() => onMove("right")}
              onTouchEnd={() => onMove("stop")}
              onMouseDown={() => onMove("right")}
              onMouseUp={() => onMove("stop")}
              onMouseLeave={() => onMove("stop")}
            >
              →
            </button>
          </div>
        </div>

        {/* Right Controls - Actions */}
        <div className="flex gap-3">
          {/* Run Button */}
          <button
            className={cn(
              "w-14 h-14 rounded-full bg-yellow-500/90 border-3 border-yellow-400",
              "flex items-center justify-center text-white text-lg font-bold",
              "shadow-lg active:bg-yellow-600 active:scale-95 transition-all duration-100",
              "touch-manipulation select-none",
            )}
            onTouchStart={() => onRun(true)}
            onTouchEnd={() => onRun(false)}
            onMouseDown={() => onRun(true)}
            onMouseUp={() => onRun(false)}
            onMouseLeave={() => onRun(false)}
          >
            🏃
          </button>

          {/* Jump Button */}
          <button
            className={cn(
              "w-20 h-20 rounded-full bg-green-500/90 border-4 border-green-400",
              "flex items-center justify-center text-white text-3xl font-bold",
              "shadow-xl active:bg-green-600 active:scale-95 transition-all duration-100",
              "touch-manipulation select-none animate-pulse",
            )}
            onTouchStart={onJump}
            onMouseDown={onJump}
          >
            🦘
          </button>
        </div>
      </div>

      {/* Pause Button */}
      <button
        className={cn(
          "absolute top-4 right-4 w-12 h-12 rounded-full bg-gray-600/90 border-2 border-gray-500",
          "flex items-center justify-center text-white text-xl",
          "shadow-lg active:bg-gray-700 active:scale-95 transition-all duration-100",
          "touch-manipulation select-none",
        )}
        onTouchStart={onPause}
        onMouseDown={onPause}
      >
        ⏸️
      </button>

      {/* Control Labels */}
      <div className="flex justify-between items-center mt-2 px-2">
        <div className="text-white/60 text-xs text-center">
          <div>MOVE</div>
        </div>
        <div className="text-white/60 text-xs text-center">
          <div>RUN</div>
          <div>JUMP</div>
        </div>
      </div>
    </div>
  );
}

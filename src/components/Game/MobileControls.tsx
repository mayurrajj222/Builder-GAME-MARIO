import React from "react";
import { cn } from "@/lib/utils";

interface MobileControlsProps {
  onMove: (direction: "left" | "right" | "stop") => void;
  onJump: () => void;
  onRun: (isRunning: boolean) => void;
  onPause: () => void;
  controls: {
    left: boolean;
    right: boolean;
    jump: boolean;
    run: boolean;
  };
}

export function MobileControls({
  onMove,
  onJump,
  onRun,
  onPause,
  controls,
}: MobileControlsProps) {
  return (
    <>
      {/* Portrait Mode Controls - Bottom positioned */}
      <div className="portrait:block landscape:hidden absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 via-black/30 to-transparent">
        <div className="flex justify-between items-end">
          {/* Left Controls - Movement */}
          <div className="flex gap-2">
            {/* D-Pad */}
            <div className="flex gap-1">
              <button
                className={cn(
                  "w-14 h-14 rounded-full bg-blue-500/90 border-2 border-blue-400",
                  "flex items-center justify-center text-white text-xl font-bold",
                  "shadow-lg active:bg-blue-600 active:scale-95 transition-all duration-100",
                  "touch-manipulation select-none",
                  controls.left && "bg-blue-600 scale-95",
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
                  "w-14 h-14 rounded-full bg-blue-500/90 border-2 border-blue-400",
                  "flex items-center justify-center text-white text-xl font-bold",
                  "shadow-lg active:bg-blue-600 active:scale-95 transition-all duration-100",
                  "touch-manipulation select-none",
                  controls.right && "bg-blue-600 scale-95",
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
          <div className="flex gap-2">
            {/* Run Button */}
            <button
              className={cn(
                "w-12 h-12 rounded-full bg-yellow-500/90 border-2 border-yellow-400",
                "flex items-center justify-center text-white text-sm font-bold",
                "shadow-lg active:bg-yellow-600 active:scale-95 transition-all duration-100",
                "touch-manipulation select-none",
                controls.run && "bg-yellow-600 scale-95",
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
                "w-16 h-16 rounded-full bg-green-500/90 border-3 border-green-400",
                "flex items-center justify-center text-white text-2xl font-bold",
                "shadow-xl active:bg-green-600 active:scale-95 transition-all duration-100",
                "touch-manipulation select-none",
                controls.jump && "bg-green-600 scale-95",
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
            "absolute top-3 right-3 w-10 h-10 rounded-full bg-gray-600/90 border-2 border-gray-500",
            "flex items-center justify-center text-white text-lg",
            "shadow-lg active:bg-gray-700 active:scale-95 transition-all duration-100",
            "touch-manipulation select-none",
          )}
          onTouchStart={onPause}
          onMouseDown={onPause}
        >
          ⏸️
        </button>
      </div>

      {/* Landscape Mode Controls - Side positioned for optimal thumb reach */}
      <div className="landscape:flex portrait:hidden fixed inset-y-0 left-0 right-0 pointer-events-none z-40">
        {/* Left Side Controls */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-3 pointer-events-auto">
          <div className="flex gap-2">
            <button
              className={cn(
                "w-16 h-16 rounded-full bg-blue-500/90 border-3 border-blue-400",
                "flex items-center justify-center text-white text-2xl font-bold",
                "shadow-xl active:bg-blue-600 active:scale-95 transition-all duration-100",
                "touch-manipulation select-none",
                controls.left && "bg-blue-600 scale-95",
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
                "shadow-xl active:bg-blue-600 active:scale-95 transition-all duration-100",
                "touch-manipulation select-none",
                controls.right && "bg-blue-600 scale-95",
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

          <div className="text-white/60 text-xs text-center font-bold">
            MOVE
          </div>
        </div>

        {/* Right Side Controls - Separated to prevent overlap */}
        <div className="absolute bottom-4 right-16 flex flex-col gap-2 pointer-events-auto">
          <button
            className={cn(
              "w-16 h-16 rounded-full bg-yellow-500/90 border-3 border-yellow-400",
              "flex items-center justify-center text-white text-lg font-bold",
              "shadow-xl active:bg-yellow-600 active:scale-95 transition-all duration-100",
              "touch-manipulation select-none",
              controls.run && "bg-yellow-600 scale-95",
            )}
            onTouchStart={() => onRun(true)}
            onTouchEnd={() => onRun(false)}
            onMouseDown={() => onRun(true)}
            onMouseUp={() => onRun(false)}
            onMouseLeave={() => onRun(false)}
          >
            🏃
          </button>
          <div className="text-white/60 text-xs text-center font-bold">RUN</div>
        </div>

        {/* Jump Button - Separate positioning */}
        <div className="absolute bottom-4 right-4 pointer-events-auto">
          <button
            className={cn(
              "w-20 h-20 rounded-full bg-green-500/90 border-4 border-green-400",
              "flex items-center justify-center text-white text-3xl font-bold",
              "shadow-2xl active:bg-green-600 active:scale-95 transition-all duration-100",
              "touch-manipulation select-none animate-pulse",
              controls.jump && "bg-green-600 scale-95",
            )}
            onTouchStart={onJump}
            onMouseDown={onJump}
          >
            🦘
          </button>
          <div className="text-white/60 text-xs text-center font-bold mt-1">
            JUMP
          </div>
        </div>

        {/* Pause Button - Top left to avoid overlap */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <button
            className={cn(
              "w-12 h-12 rounded-full bg-gray-600/90 border-2 border-gray-500",
              "flex items-center justify-center text-white text-xl",
              "shadow-lg active:bg-gray-700 active:scale-95 transition-all duration-100",
              "touch-manipulation select-none",
            )}
            onTouchStart={onPause}
            onMouseDown={onPause}
          >
            ⏸️
          </button>
        </div>
      </div>
    </>
  );
}

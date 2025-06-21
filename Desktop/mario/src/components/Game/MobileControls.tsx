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
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Left Side Controls - Movement */}
      <div className="absolute bottom-6 left-6 flex gap-3 pointer-events-auto">
        <button
          className={cn(
            "w-16 h-16 rounded-full bg-blue-500/90 border-4 border-blue-400",
            "flex items-center justify-center text-white text-2xl font-bold",
            "shadow-xl active:bg-blue-600 active:scale-95 transition-all duration-100",
            "touch-manipulation select-none",
            controls.left && "bg-blue-600 scale-95",
          )}
          onTouchStart={(e) => {
            e.preventDefault();
            onMove("left");
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onMove("stop");
          }}
          onMouseDown={() => onMove("left")}
          onMouseUp={() => onMove("stop")}
          onMouseLeave={() => onMove("stop")}
        >
          ←
        </button>

        <button
          className={cn(
            "w-16 h-16 rounded-full bg-blue-500/90 border-4 border-blue-400",
            "flex items-center justify-center text-white text-2xl font-bold",
            "shadow-xl active:bg-blue-600 active:scale-95 transition-all duration-100",
            "touch-manipulation select-none",
            controls.right && "bg-blue-600 scale-95",
          )}
          onTouchStart={(e) => {
            e.preventDefault();
            onMove("right");
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onMove("stop");
          }}
          onMouseDown={() => onMove("right")}
          onMouseUp={() => onMove("stop")}
          onMouseLeave={() => onMove("stop")}
        >
          →
        </button>
      </div>

      {/* Label for movement */}
      <div className="absolute bottom-2 left-8 text-white/70 text-sm font-bold pointer-events-none">
        MOVE
      </div>

      {/* Right Side Controls - Actions */}
      <div className="absolute bottom-6 right-20 pointer-events-auto">
        <button
          className={cn(
            "w-14 h-14 rounded-full bg-yellow-500/90 border-3 border-yellow-400",
            "flex items-center justify-center text-white text-lg font-bold",
            "shadow-xl active:bg-yellow-600 active:scale-95 transition-all duration-100",
            "touch-manipulation select-none",
            controls.run && "bg-yellow-600 scale-95",
          )}
          onTouchStart={(e) => {
            e.preventDefault();
            onRun(true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onRun(false);
          }}
          onMouseDown={() => onRun(true)}
          onMouseUp={() => onRun(false)}
          onMouseLeave={() => onRun(false)}
        >
          🏃
        </button>
        <div className="text-white/70 text-xs font-bold text-center mt-1">
          RUN
        </div>
      </div>

      {/* Jump Button - Most important, biggest */}
      <div className="absolute bottom-6 right-6 pointer-events-auto">
        <button
          className={cn(
            "w-20 h-20 rounded-full bg-green-500/90 border-4 border-green-400",
            "flex items-center justify-center text-white text-3xl font-bold",
            "shadow-2xl active:bg-green-600 active:scale-95 transition-all duration-100",
            "touch-manipulation select-none animate-pulse",
            controls.jump && "bg-green-600 scale-95",
          )}
          onTouchStart={(e) => {
            e.preventDefault();
            onJump();
          }}
          onMouseDown={onJump}
        >
          🦘
        </button>
        <div className="text-white/70 text-xs font-bold text-center mt-1">
          JUMP
        </div>
      </div>

      {/* Pause Button - Top center */}
      <div className="absolute top-6 right-6 pointer-events-auto">
        <button
          className={cn(
            "w-12 h-12 rounded-full bg-gray-600/90 border-2 border-gray-500",
            "flex items-center justify-center text-white text-xl",
            "shadow-lg active:bg-gray-700 active:scale-95 transition-all duration-100",
            "touch-manipulation select-none",
          )}
          onTouchStart={(e) => {
            e.preventDefault();
            onPause();
          }}
          onMouseDown={onPause}
        >
          ⏸️
        </button>
      </div>

      {/* Visual overlay to show touch areas (debug) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 via-black/10 to-transparent pointer-events-none" />
    </div>
  );
}

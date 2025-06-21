import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Index = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-2 overflow-hidden">
      <div className="w-full max-w-sm text-center flex flex-col justify-between h-full py-4">
        {/* Compact Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-game font-bold text-white drop-shadow-lg">
            Super Dudu & Bubu
          </h1>
          <p className="text-sm text-white/80 font-game">
            🐼 Epic Platform Adventure 🐻
          </p>
        </div>

        {/* Character Icons */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-game-bubu rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
            🐼
          </div>
          <span className="text-white/60 text-sm">VS</span>
          <div className="w-12 h-12 bg-game-dudu rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
            🐻
          </div>
        </div>

        {/* Compact Features */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-2 text-center">
            <div className="text-lg mb-1">🎮</div>
            <div className="text-xs text-white font-semibold">
              Epic Gameplay
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-2 text-center">
            <div className="text-lg mb-1">👥</div>
            <div className="text-xs text-white font-semibold">Two Heroes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-2 text-center">
            <div className="text-lg mb-1">🌟</div>
            <div className="text-xs text-white font-semibold">Power-ups</div>
          </div>
        </div>

        {/* Game Features Grid */}
        <div className="bg-black/30 rounded-lg p-3 border-2 border-white/20">
          <h3 className="text-sm font-game text-white mb-2">
            🎯 Game Features
          </h3>
          <div className="grid grid-cols-2 gap-2 text-white/80">
            <div className="flex items-center gap-1 text-xs">
              <span>🏃‍♂️</span>
              <span>Run & Jump</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span>👹</span>
              <span>Beat Enemies</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span>🪙</span>
              <span>Collect Coins</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span>🏆</span>
              <span>15 Levels</span>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className="space-y-2">
          <Link to="/game" className="block">
            <Button
              size="lg"
              className={cn(
                "text-lg px-8 py-4 font-game font-bold shadow-xl border-4 w-full",
                "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
                "border-green-400 text-white transition-all duration-300 transform active:scale-95",
                "animate-pulse touch-manipulation",
              )}
            >
              🚀 PLAY NOW 🚀
            </Button>
          </Link>
          <p className="text-xs text-white/60">Use touch controls to play!</p>
        </div>

        {/* Quick Controls Info */}
        <div className="bg-black/20 rounded-lg p-2 border border-white/10">
          <div className="text-xs text-white/70 space-y-1">
            <div className="flex justify-between">
              <span>🎮 Touch Controls</span>
              <span>📱 Mobile Ready</span>
            </div>
            <div className="flex justify-between">
              <span>🏃 Run & Jump</span>
              <span>🎯 15 Epic Levels</span>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="text-white/30 text-xs">Made with ❤️ for Mobile</div>
      </div>
    </div>
  );
};

export default Index;

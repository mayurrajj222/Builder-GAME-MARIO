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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-8xl font-game font-bold text-white drop-shadow-2xl animate-bounce">
            Super Dudu & Bubu
          </h1>
          <p className="text-2xl text-white/80 drop-shadow-lg font-game">
            🔥 Epic Platform Adventure Game 💙
          </p>
          <div className="flex items-center justify-center gap-4 text-4xl animate-float">
            <div className="w-16 h-16 bg-game-dudu rounded-full flex items-center justify-center border-4 border-white/20 shadow-xl">
              🔥
            </div>
            <span className="text-white/60">VS</span>
            <div className="w-16 h-16 bg-game-bubu rounded-full flex items-center justify-center border-4 border-white/20 shadow-xl">
              💙
            </div>
          </div>
        </div>

        {/* Game Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-4 border-white/20 shadow-2xl">
            <CardHeader>
              <div className="text-4xl mb-2">🎮</div>
              <CardTitle className="text-white font-game">
                Epic Gameplay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Jump, run, and collect coins in this classic platform adventure
                with modern twists!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-4 border-white/20 shadow-2xl">
            <CardHeader>
              <div className="text-4xl mb-2">👥</div>
              <CardTitle className="text-white font-game">Two Heroes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Choose between Dudu (Fire) and Bubu (Ice) - each with unique
                abilities and playstyles!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-4 border-white/20 shadow-2xl">
            <CardHeader>
              <div className="text-4xl mb-2">🌟</div>
              <CardTitle className="text-white font-game">Power-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Collect mushrooms, fire flowers, and stars to gain special
                powers and abilities!
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Game Preview */}
        <div className="bg-black/30 rounded-xl p-6 border-4 border-white/20">
          <h3 className="text-2xl font-game text-white mb-4">
            🎯 Game Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/80">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🏃‍♂️</span>
              <span className="text-sm">Run & Jump</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">👹</span>
              <span className="text-sm">Defeat Enemies</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🪙</span>
              <span className="text-sm">Collect Coins</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="text-sm">Complete Levels</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-6">
          <Link to="/game">
            <Button
              size="lg"
              className={cn(
                "text-3xl px-16 py-8 font-game font-bold shadow-2xl border-4",
                "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
                "border-green-400 text-white transition-all duration-300 transform hover:scale-110",
                "animate-pulse",
              )}
            >
              🚀 PLAY NOW 🚀
            </Button>
          </Link>

          <div className="flex items-center justify-center gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <span>⌨️</span>
              <span>Keyboard Controls</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎵</span>
              <span>Epic Soundtrack</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💾</span>
              <span>Auto Save</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <Card className="bg-black/40 backdrop-blur-md border-4 border-white/10 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white font-game text-xl">
              🎮 How to Play
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white/80 text-left space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-white mb-2">Movement:</h4>
                <ul className="space-y-1 text-sm">
                  <li>← → or A D: Move left/right</li>
                  <li>↑ W SPACE: Jump</li>
                  <li>Hold SHIFT: Run faster</li>
                  <li>ESC: Pause game</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Objectives:</h4>
                <ul className="space-y-1 text-sm">
                  <li>🪙 Collect coins for points</li>
                  <li>👹 Jump on enemies to defeat them</li>
                  <li>🍄 Grab power-ups for abilities</li>
                  <li>🏁 Reach the end of each level</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-white/40 text-sm">
          Made with ❤️ using React, TypeScript & TailwindCSS
        </div>
      </div>
    </div>
  );
};

export default Index;

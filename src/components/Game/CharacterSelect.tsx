import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PLAYER_CONFIG } from "@/lib/gameConstants";
import { cn } from "@/lib/utils";

interface CharacterSelectProps {
  selectedCharacter: "bubu" | "dudu";
  onSelectCharacter: (character: "bubu" | "dudu") => void;
  onStartGame: () => void;
}

export function CharacterSelect({
  selectedCharacter,
  onSelectCharacter,
  onStartGame,
}: CharacterSelectProps) {
  const characters: Array<"bubu" | "dudu"> = ["bubu", "dudu"];

  return (
    <div className="h-screen bg-game-gradient flex items-center justify-center p-2 overflow-hidden">
      <div className="w-full max-w-md flex flex-col justify-between h-full py-4">
        {/* Compact Title */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-game font-bold text-white drop-shadow-lg mb-1">
            Choose Your Hero
          </h1>
          <p className="text-xs text-white/80 drop-shadow">
            Select your character!
          </p>
        </div>

        {/* Character Selection */}
        <div className="grid grid-cols-2 gap-3 flex-1 max-h-64">
          {characters.map((character) => {
            const config = PLAYER_CONFIG[character];
            const isSelected = selectedCharacter === character;

            return (
              <Card
                key={character}
                className={cn(
                  "cursor-pointer transition-all duration-200 transform active:scale-95",
                  "border-2 shadow-lg h-full",
                  isSelected
                    ? "border-yellow-400 shadow-yellow-400/50 scale-105"
                    : "border-white/20",
                  "bg-white/10 backdrop-blur-sm",
                )}
                onClick={() => onSelectCharacter(character)}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${config.color}20, ${config.darkColor}40)`
                    : "rgba(255, 255, 255, 0.1)",
                }}
              >
                <CardHeader className="text-center p-3">
                  <div
                    className={cn(
                      "w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg border-2 border-white/20 mb-2",
                      "transition-transform duration-300",
                      isSelected && "animate-bounce",
                    )}
                    style={{
                      backgroundColor: config.color,
                      borderColor: config.darkColor,
                    }}
                  >
                    {character === "bubu" ? "🐼" : "🐻"}
                  </div>

                  <CardTitle className="text-lg font-game text-white drop-shadow-lg">
                    {config.name}
                  </CardTitle>

                  <CardDescription className="text-white/70 text-xs">
                    {character === "bubu" ? "Panda Magic!" : "Bear Power!"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 p-3 pt-0">
                  {/* Compact Stats */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-white text-xs">
                      <span>Speed:</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-2 h-2 rounded-full",
                              i < (character === "bubu" ? 4 : 5)
                                ? "bg-green-400"
                                : "bg-gray-400",
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between text-white text-xs">
                      <span>Jump:</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-2 h-2 rounded-full",
                              i < (character === "bubu" ? 5 : 4)
                                ? "bg-blue-400"
                                : "bg-gray-400",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compact Abilities */}
                  <div className="bg-black/20 rounded p-2">
                    <div className="text-white/80 text-xs">
                      {character === "bubu"
                        ? "🎯 Magic jumps & precision"
                        : "⚡ Speed boost & strength"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Start Game Button */}
        <div className="text-center space-y-2">
          <Button
            size="lg"
            onClick={onStartGame}
            className={cn(
              "text-lg px-8 py-4 font-game font-bold shadow-xl border-4 w-full",
              "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
              "border-green-400 text-white transition-all duration-300 transform active:scale-95",
              "animate-pulse touch-manipulation",
            )}
          >
            🚀 START ADVENTURE 🚀
          </Button>

          <p className="text-xs text-white/60">Use touch controls to play!</p>
        </div>

        {/* Compact Game Preview */}
        <div className="text-center">
          <div className="bg-black/30 rounded-lg px-3 py-2">
            <div className="flex justify-between items-center text-xs text-white/80">
              <span>🦘 Jump</span>
              <span>🪙 Coins</span>
              <span>🍄 Power-ups</span>
              <span>🏆 Win</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

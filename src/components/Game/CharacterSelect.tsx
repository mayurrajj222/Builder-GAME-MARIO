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
    <div className="min-h-screen bg-game-gradient flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-4xl w-full overflow-y-auto max-h-screen">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-game font-bold text-white drop-shadow-lg mb-2">
            Super Dudu & Bubu
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/80 drop-shadow px-2">
            Choose your hero and embark on an epic adventure!
          </p>
        </div>

        {/* Character Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-8">
          {characters.map((character) => {
            const config = PLAYER_CONFIG[character];
            const isSelected = selectedCharacter === character;

            return (
              <Card
                key={character}
                className={cn(
                  "cursor-pointer transition-all duration-300 transform hover:scale-105",
                  "border-4 shadow-2xl",
                  isSelected
                    ? "border-yellow-400 shadow-yellow-400/50 scale-105"
                    : "border-white/20 hover:border-white/40",
                  "bg-white/10 backdrop-blur-sm",
                )}
                onClick={() => onSelectCharacter(character)}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${config.color}20, ${config.darkColor}40)`
                    : "rgba(255, 255, 255, 0.1)",
                }}
              >
                <CardHeader className="text-center">
                  <div
                    className={cn(
                      "w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-white/20 mb-4",
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

                  <CardTitle className="text-3xl font-game text-white drop-shadow-lg">
                    {config.name}
                  </CardTitle>

                  <CardDescription className="text-white/70 text-lg">
                    {character === "bubu"
                      ? "The cute panda with magical abilities!"
                      : "The brave bear with powerful strength!"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span>Speed:</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-3 h-3 rounded-full",
                              i < (character === "bubu" ? 4 : 5)
                                ? "bg-green-400"
                                : "bg-gray-400",
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between text-white">
                      <span>Jump:</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-3 h-3 rounded-full",
                              i < (character === "bubu" ? 5 : 4)
                                ? "bg-blue-400"
                                : "bg-gray-400",
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between text-white">
                      <span>Health:</span>
                      <div className="flex gap-1">
                        {Array.from({ length: config.maxHealth }).map(
                          (_, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 bg-red-400 rounded-full"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Special Abilities */}
                  <div className="bg-black/20 rounded-lg p-3">
                    <h4 className="text-white font-bold mb-2">
                      Special Abilities:
                    </h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      {character === "bubu" ? (
                        <>
                          <li>• Panda Magic - Higher jumps</li>
                          <li>• Cute Charm - Stun enemies</li>
                          <li>• Bamboo Power - Better precision</li>
                        </>
                      ) : (
                        <>
                          <li>• Bear Strength - Extra speed boost</li>
                          <li>• Honey Rush - Lava immunity</li>
                          <li>• Roar Power - Explosive power-ups</li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Start Game Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={onStartGame}
            className={cn(
              "text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 font-game font-bold shadow-2xl border-4",
              "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
              "border-green-400 text-white transition-all duration-300 transform active:scale-95",
              "animate-pulse touch-manipulation w-full sm:w-auto",
            )}
          >
            🚀 START ADVENTURE 🚀
          </Button>

          <p className="mt-2 sm:mt-4 text-white/60 text-xs sm:text-sm px-2">
            Use the on-screen controls to play!
          </p>
        </div>

        {/* Game Preview */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-black/30 rounded-full px-6 py-3">
            <span className="text-white/80">Jump on enemies</span>
            <span className="text-yellow-400">🪙</span>
            <span className="text-white/80">Collect coins</span>
            <span className="text-red-400">🍄</span>
            <span className="text-white/80">Get power-ups</span>
            <span className="text-purple-400">⭐</span>
            <span className="text-white/80">Reach the end!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

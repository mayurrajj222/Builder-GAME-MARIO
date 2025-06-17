import { useState, useEffect, useCallback, useRef } from "react";
import {
  GameState,
  Player,
  GameControls,
  Enemy,
  Collectible,
  Platform,
} from "@/types/game";
import { GAME_CONFIG, PLAYER_CONFIG, SCORES } from "@/lib/gameConstants";
import {
  applyGravity,
  applyFriction,
  updatePosition,
  checkCollision,
  resolveCollision,
  keepInBounds,
  isOnGround,
} from "@/lib/gamePhysics";
import { LEVELS } from "@/data/levels";

export function useGame() {
  const gameLoopRef = useRef<number>();
  const [selectedCharacter, setSelectedCharacter] = useState<"dudu" | "bubu">(
    "dudu",
  );
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialGameState(),
  );
  const [controls, setControls] = useState<GameControls>({
    left: false,
    right: false,
    jump: false,
    run: false,
  });

  function createInitialGameState(): GameState {
    const level = LEVELS[0];
    const playerConfig = PLAYER_CONFIG[selectedCharacter];

    return {
      player: {
        id: "player",
        character: selectedCharacter,
        position: { ...level.playerStart },
        velocity: { x: 0, y: 0 },
        size: { width: 32, height: 32 },
        isGrounded: false,
        health: playerConfig.maxHealth,
        powerUp: null,
        direction: "right",
        isJumping: false,
        isMoving: false,
      },
      enemies: level.enemies.map((enemy, index) => ({
        ...enemy,
        id: `enemy-${index}`,
      })),
      collectibles: level.collectibles.map((collectible, index) => ({
        ...collectible,
        id: `collectible-${index}`,
      })),
      platforms: level.platforms.map((platform, index) => ({
        ...platform,
        id: `platform-${index}`,
      })),
      score: 0,
      lives: 3,
      level: 1,
      gameStatus: "menu",
      timeRemaining: level.timeLimit,
      camera: { x: 0, y: 0 },
    };
  }

  const startGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, gameStatus: "playing" }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, gameStatus: "paused" }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, [selectedCharacter]);

  const selectCharacter = useCallback((character: "dudu" | "bubu") => {
    setSelectedCharacter(character);
    const level = LEVELS[0];
    const playerConfig = PLAYER_CONFIG[character];

    setGameState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        character,
        health: playerConfig.maxHealth,
        position: { ...level.playerStart },
        velocity: { x: 0, y: 0 },
      },
    }));
  }, []);

  const updatePlayer = useCallback(
    (player: Player, platforms: Platform[]) => {
      const playerConfig = PLAYER_CONFIG[player.character];
      const speed = controls.run ? playerConfig.runSpeed : playerConfig.speed;

      // Handle horizontal movement
      if (controls.left) {
        player.velocity.x = -speed;
        player.direction = "left";
        player.isMoving = true;
      } else if (controls.right) {
        player.velocity.x = speed;
        player.direction = "right";
        player.isMoving = true;
      } else {
        player.isMoving = false;
      }

      // Handle jumping
      if (controls.jump && player.isGrounded) {
        player.velocity.y = playerConfig.jumpForce;
        player.isJumping = true;
        player.isGrounded = false;
      }

      // Apply physics
      applyGravity(player);
      applyFriction(player);

      // Check ground collision
      player.isGrounded = isOnGround(player, platforms);

      // Update position
      updatePosition(player);

      // Handle platform collisions
      platforms.forEach((platform) => {
        if (checkCollision(player, platform)) {
          resolveCollision(player, platform);
        }
      });

      // Keep player in bounds
      keepInBounds(player, {
        width: GAME_CONFIG.CANVAS_WIDTH,
        height: GAME_CONFIG.CANVAS_HEIGHT,
      });

      return player;
    },
    [controls],
  );

  const updateEnemies = useCallback(
    (enemies: Enemy[], platforms: Platform[]) => {
      return enemies.map((enemy) => {
        // Simple AI - move in direction until hitting obstacle
        enemy.velocity.x =
          enemy.direction === "left" ? -enemy.speed : enemy.speed;

        // Apply physics
        applyGravity(enemy);
        updatePosition(enemy);

        // Check ground collision
        enemy.isGrounded = isOnGround(enemy, platforms);

        // Handle platform collisions
        platforms.forEach((platform) => {
          if (checkCollision(enemy, platform)) {
            resolveCollision(enemy, platform);
          }
        });

        // Turn around at platform edges or walls
        const futurePosition = {
          x: enemy.position.x + (enemy.direction === "left" ? -10 : 10),
          y: enemy.position.y + enemy.size.height,
        };

        const onPlatform = platforms.some(
          (platform) =>
            futurePosition.x >= platform.position.x &&
            futurePosition.x <= platform.position.x + platform.size.width &&
            futurePosition.y >= platform.position.y &&
            futurePosition.y <= platform.position.y + 10,
        );

        if (!onPlatform) {
          enemy.direction = enemy.direction === "left" ? "right" : "left";
        }

        return enemy;
      });
    },
    [],
  );

  const checkCollectibles = useCallback(
    (player: Player, collectibles: Collectible[]) => {
      const collected: string[] = [];
      let scoreIncrease = 0;

      collectibles.forEach((collectible) => {
        if (checkCollision(player, collectible)) {
          collected.push(collectible.id);
          scoreIncrease += collectible.value;

          if (collectible.type === "powerup" && collectible.powerUpType) {
            player.powerUp = collectible.powerUpType;
            // Apply power-up effects immediately
            if (collectible.powerUpType === "mushroom") {
              player.health = Math.min(player.health + 1, 5);
            }
          }
        }
      });

      return { collected, scoreIncrease };
    },
    [],
  );

  const checkEnemyCollisions = useCallback(
    (player: Player, enemies: Enemy[]) => {
      const defeated: string[] = [];
      let scoreIncrease = 0;
      let playerHit = false;

      enemies.forEach((enemy) => {
        if (checkCollision(player, enemy)) {
          // Check if player is jumping on enemy (top collision)
          if (player.velocity.y > 0 && player.position.y < enemy.position.y) {
            defeated.push(enemy.id);
            scoreIncrease += SCORES.ENEMY_DEFEAT;
            player.velocity.y = -8; // Bounce effect
          } else {
            // Player takes damage
            if (player.powerUp !== "star") {
              // Star makes player invincible
              playerHit = true;
            }
          }
        }
      });

      return { defeated, scoreIncrease, playerHit };
    },
    [],
  );

  const updateCamera = useCallback(
    (player: Player, camera: { x: number; y: number }) => {
      const targetX = player.position.x - GAME_CONFIG.CANVAS_WIDTH / 2;
      const targetY = Math.max(
        0,
        player.position.y - GAME_CONFIG.CANVAS_HEIGHT * 0.7,
      );

      camera.x += (targetX - camera.x) * GAME_CONFIG.CAMERA_SMOOTH;
      camera.y += (targetY - camera.y) * GAME_CONFIG.CAMERA_SMOOTH;

      // Keep camera in bounds
      camera.x = Math.max(0, camera.x);
      camera.y = Math.max(0, Math.min(camera.y, 200));

      return camera;
    },
    [],
  );

  const gameLoop = useCallback(() => {
    setGameState((prev) => {
      if (prev.gameStatus !== "playing") return prev;

      const newState = { ...prev };

      // Update player
      newState.player = updatePlayer({ ...prev.player }, prev.platforms);

      // Update enemies
      newState.enemies = updateEnemies([...prev.enemies], prev.platforms);

      // Check collectibles
      const collectibleResult = checkCollectibles(
        newState.player,
        prev.collectibles,
      );
      newState.collectibles = prev.collectibles.filter(
        (c) => !collectibleResult.collected.includes(c.id),
      );
      newState.score += collectibleResult.scoreIncrease;

      // Check enemy collisions
      const enemyResult = checkEnemyCollisions(
        newState.player,
        newState.enemies,
      );
      newState.enemies = newState.enemies.filter(
        (e) => !enemyResult.defeated.includes(e.id),
      );
      newState.score += enemyResult.scoreIncrease;

      if (enemyResult.playerHit) {
        newState.player.health -= 1;
        if (newState.player.health <= 0) {
          newState.lives -= 1;
          if (newState.lives <= 0) {
            newState.gameStatus = "gameOver";
          } else {
            // Reset player position
            const level = LEVELS[newState.level - 1];
            newState.player.position = { ...level.playerStart };
            newState.player.velocity = { x: 0, y: 0 };
            newState.player.health =
              PLAYER_CONFIG[newState.player.character].maxHealth;
          }
        }
      }

      // Update camera
      newState.camera = updateCamera(newState.player, { ...prev.camera });

      // Check level completion (reached far right of level)
      if (newState.player.position.x > 2400) {
        newState.gameStatus = "levelComplete";
        newState.score += SCORES.LEVEL_COMPLETE;
        newState.score += newState.timeRemaining * SCORES.TIME_BONUS;
      }

      // Update timer
      newState.timeRemaining = Math.max(0, prev.timeRemaining - 1 / 60);
      if (newState.timeRemaining <= 0) {
        newState.gameStatus = "gameOver";
      }

      // Check if player fell off screen
      if (newState.player.position.y > GAME_CONFIG.CANVAS_HEIGHT + 100) {
        newState.lives -= 1;
        if (newState.lives <= 0) {
          newState.gameStatus = "gameOver";
        } else {
          const level = LEVELS[newState.level - 1];
          newState.player.position = { ...level.playerStart };
          newState.player.velocity = { x: 0, y: 0 };
          newState.player.health =
            PLAYER_CONFIG[newState.player.character].maxHealth;
        }
      }

      return newState;
    });
  }, [
    updatePlayer,
    updateEnemies,
    checkCollectibles,
    checkEnemyCollisions,
    updateCamera,
  ]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowLeft":
        case "KeyA":
          setControls((prev) => ({ ...prev, left: true }));
          break;
        case "ArrowRight":
        case "KeyD":
          setControls((prev) => ({ ...prev, right: true }));
          break;
        case "ArrowUp":
        case "KeyW":
        case "Space":
          event.preventDefault();
          setControls((prev) => ({ ...prev, jump: true }));
          break;
        case "ShiftLeft":
        case "ShiftRight":
          setControls((prev) => ({ ...prev, run: true }));
          break;
        case "Escape":
          setGameState((prev) => ({
            ...prev,
            gameStatus: prev.gameStatus === "playing" ? "paused" : "playing",
          }));
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowLeft":
        case "KeyA":
          setControls((prev) => ({ ...prev, left: false }));
          break;
        case "ArrowRight":
        case "KeyD":
          setControls((prev) => ({ ...prev, right: false }));
          break;
        case "ArrowUp":
        case "KeyW":
        case "Space":
          setControls((prev) => ({ ...prev, jump: false }));
          break;
        case "ShiftLeft":
        case "ShiftRight":
          setControls((prev) => ({ ...prev, run: false }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState.gameStatus === "playing") {
      const loop = () => {
        gameLoop();
        gameLoopRef.current = requestAnimationFrame(loop);
      };
      gameLoopRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStatus, gameLoop]);

  const nextLevel = useCallback(() => {
    const nextLevelIndex = gameState.level;
    if (nextLevelIndex < LEVELS.length) {
      const level = LEVELS[nextLevelIndex];
      const playerConfig = PLAYER_CONFIG[gameState.player.character];

      setGameState((prev) => ({
        ...prev,
        level: nextLevelIndex + 1,
        gameStatus: "playing",
        timeRemaining: level.timeLimit,
        player: {
          ...prev.player,
          position: { ...level.playerStart },
          velocity: { x: 0, y: 0 },
          health: playerConfig.maxHealth,
          powerUp: null,
        },
        enemies: level.enemies.map((enemy, index) => ({
          ...enemy,
          id: `enemy-${index}`,
        })),
        collectibles: level.collectibles.map((collectible, index) => ({
          ...collectible,
          id: `collectible-${index}`,
        })),
        platforms: level.platforms.map((platform, index) => ({
          ...platform,
          id: `platform-${index}`,
        })),
        camera: { x: 0, y: 0 },
      }));
    } else {
      // Game completed
      setGameState((prev) => ({ ...prev, gameStatus: "gameOver" }));
    }
  }, [gameState.level, gameState.player.character]);

  return {
    gameState,
    selectedCharacter,
    startGame,
    pauseGame,
    resetGame,
    selectCharacter,
    nextLevel,
  };
}

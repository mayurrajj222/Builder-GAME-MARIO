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
  const [selectedCharacter, setSelectedCharacter] = useState<"bubu" | "dudu">(
    "bubu",
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

  const selectCharacter = useCallback((character: "bubu" | "dudu") => {
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

      // Handle jumping with coyote time (more forgiving)
      if (controls.jump) {
        // Allow jumping for a short time after leaving ground (coyote time)
        const canJump =
          player.isGrounded ||
          (!player.isGrounded && Math.abs(player.velocity.y) < 2); // Small velocity tolerance

        if (canJump) {
          player.velocity.y = playerConfig.jumpForce;
          player.isJumping = true;
          player.isGrounded = false;
        }
      }

      // Apply physics
      applyGravity(player);
      applyFriction(player);

      // Check ground collision
      player.isGrounded = isOnGround(player, platforms);

      // Check if player is on a moving platform and move with it
      if (player.isGrounded) {
        platforms.forEach((platform) => {
          if (platform.type === "moving") {
            // Check if player is standing on this platform (more precise collision)
            const playerBottom = player.position.y + player.size.height;
            const playerLeft = player.position.x;
            const playerRight = player.position.x + player.size.width;
            const platformTop = platform.position.y;
            const platformLeft = platform.position.x;
            const platformRight = platform.position.x + platform.size.width;

            // Check if player is on top of the platform
            if (
              playerBottom >= platformTop &&
              playerBottom <= platformTop + 10 && // Small tolerance
              playerRight > platformLeft &&
              playerLeft < platformRight
            ) {
              // Player moves with the platform - reduced slipping
              player.position.x += platform.velocity.x * 0.95; // Slightly less than full speed to reduce slip
              player.position.y += platform.velocity.y * 0.95;

              // Add friction to make platform feel less slippery
              if (Math.abs(platform.velocity.x) > 0) {
                player.velocity.x *= 0.9; // Apply friction when on moving platform
              }
            }
          }
        });
      }

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

  const updateMovingPlatforms = useCallback((platforms: Platform[]) => {
    return platforms.map((platform) => {
      if (platform.type === "moving") {
        // Update position based on velocity (reduced speed for better control)
        platform.position.x += platform.velocity.x * 0.8; // 20% slower for better control
        platform.position.y += platform.velocity.y * 0.8;

        // Set default bounds if not specified
        const bounds = platform.moveBounds || {
          minX: 0,
          maxX: GAME_CONFIG.CANVAS_WIDTH * 2,
          minY: 0,
          maxY: GAME_CONFIG.CANVAS_HEIGHT,
        };

        // Reverse direction when hitting bounds
        if (
          platform.position.x <= (bounds.minX || 0) ||
          platform.position.x + platform.size.width >=
            (bounds.maxX || GAME_CONFIG.CANVAS_WIDTH * 2)
        ) {
          platform.velocity.x *= -1;
        }

        if (
          platform.position.y <= (bounds.minY || 0) ||
          platform.position.y + platform.size.height >=
            (bounds.maxY || GAME_CONFIG.CANVAS_HEIGHT)
        ) {
          platform.velocity.y *= -1;
        }

        // Clamp position to bounds
        platform.position.x = Math.max(
          bounds.minX || 0,
          Math.min(
            platform.position.x,
            (bounds.maxX || GAME_CONFIG.CANVAS_WIDTH * 2) - platform.size.width,
          ),
        );
        platform.position.y = Math.max(
          bounds.minY || 0,
          Math.min(
            platform.position.y,
            (bounds.maxY || GAME_CONFIG.CANVAS_HEIGHT) - platform.size.height,
          ),
        );
      }

      return platform;
    });
  }, []);

  const updateEnemies = useCallback(
    (enemies: Enemy[], platforms: Platform[]) => {
      return enemies.map((enemy) => {
        // Check if enemy is about to fall off a platform
        const futureX =
          enemy.position.x +
          (enemy.direction === "left" ? -enemy.speed - 5 : enemy.speed + 5);
        const feetY = enemy.position.y + enemy.size.height;

        // Check if there's still ground ahead
        const groundAhead = platforms.some((platform) => {
          return (
            futureX >= platform.position.x &&
            futureX <= platform.position.x + platform.size.width &&
            feetY >= platform.position.y - 5 &&
            feetY <= platform.position.y + 15
          );
        });

        // Check if hitting a wall
        const wallAhead = platforms.some((platform) => {
          const enemyFutureRight = futureX + enemy.size.width;
          const enemyFutureLeft = futureX;
          const enemyTop = enemy.position.y;
          const enemyBottom = enemy.position.y + enemy.size.height;

          return (
            ((enemyFutureRight > platform.position.x &&
              enemyFutureLeft < platform.position.x + platform.size.width) ||
              (enemyFutureLeft < platform.position.x + platform.size.width &&
                enemyFutureRight > platform.position.x)) &&
            enemyBottom > platform.position.y &&
            enemyTop < platform.position.y + platform.size.height &&
            platform.type !== "moving" // Don't consider moving platforms as walls
          );
        });

        // Turn around if no ground ahead or hitting a wall
        if (!groundAhead || wallAhead) {
          enemy.direction = enemy.direction === "left" ? "right" : "left";
        }

        // Move enemy in current direction
        enemy.velocity.x =
          enemy.direction === "left" ? -enemy.speed : enemy.speed;

        // Apply physics
        applyGravity(enemy);

        // Check ground collision before moving
        enemy.isGrounded = isOnGround(enemy, platforms);

        // If enemy is on a moving platform, move with it
        if (enemy.isGrounded) {
          platforms.forEach((platform) => {
            if (platform.type === "moving" && checkCollision(enemy, platform)) {
              enemy.position.x += platform.velocity.x;
              enemy.position.y += platform.velocity.y;
            }
          });
        }

        updatePosition(enemy);

        // Handle platform collisions
        platforms.forEach((platform) => {
          if (checkCollision(enemy, platform)) {
            resolveCollision(enemy, platform);
          }
        });

        // Keep enemies from falling off the world
        if (enemy.position.y > GAME_CONFIG.CANVAS_HEIGHT + 50) {
          // Remove enemies that fall off (they'll be filtered out)
          enemy.health = 0;
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

      // Update moving platforms
      newState.platforms = updateMovingPlatforms([...prev.platforms]);

      // Update player
      newState.player = updatePlayer({ ...prev.player }, newState.platforms);

      // Update enemies and filter out dead ones
      newState.enemies = updateEnemies(
        [...prev.enemies],
        newState.platforms,
      ).filter((enemy) => enemy.health > 0);

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
      // Adjusted for longer levels
      const levelEndX =
        newState.level === 1
          ? 3000
          : newState.level === 2
            ? 3100
            : newState.level <= 5
              ? 1500
              : newState.level <= 10
                ? 1700
                : newState.level <= 15
                  ? 2000
                  : 2500;

      if (newState.player.position.x > levelEndX) {
        newState.gameStatus = "levelComplete";
        newState.score += SCORES.LEVEL_COMPLETE;
        newState.score += Math.floor(
          newState.timeRemaining * SCORES.TIME_BONUS,
        );
      }

      // Update timer
      newState.timeRemaining = Math.max(0, prev.timeRemaining - 1 / 60);
      if (newState.timeRemaining <= 0) {
        newState.gameStatus = "gameOver";
      }

      // Check if player fell off screen (death fall)
      if (newState.player.position.y > GAME_CONFIG.CANVAS_HEIGHT + 50) {
        newState.lives -= 1;
        if (newState.lives <= 0) {
          newState.gameStatus = "gameOver";
        } else {
          // Reset player to start position
          const level = LEVELS[newState.level - 1];
          newState.player.position = { ...level.playerStart };
          newState.player.velocity = { x: 0, y: 0 };
          newState.player.health =
            PLAYER_CONFIG[newState.player.character].maxHealth;
          newState.player.powerUp = null;
          // Reset camera
          newState.camera = { x: 0, y: 0 };
        }
      }

      // Check if player fell off the left edge of platforms (also death)
      if (newState.player.position.x < -100) {
        newState.lives -= 1;
        if (newState.lives <= 0) {
          newState.gameStatus = "gameOver";
        } else {
          const level = LEVELS[newState.level - 1];
          newState.player.position = { ...level.playerStart };
          newState.player.velocity = { x: 0, y: 0 };
          newState.player.health =
            PLAYER_CONFIG[newState.player.character].maxHealth;
          newState.player.powerUp = null;
          newState.camera = { x: 0, y: 0 };
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
          // Set moving bounds for moving platforms
          moveBounds:
            platform.type === "moving"
              ? {
                  minX: Math.max(0, platform.position.x - 200),
                  maxX: Math.min(
                    GAME_CONFIG.CANVAS_WIDTH * 2,
                    platform.position.x + 200,
                  ),
                  minY: Math.max(50, platform.position.y - 100),
                  maxY: Math.min(
                    GAME_CONFIG.CANVAS_HEIGHT - 50,
                    platform.position.y + 100,
                  ),
                }
              : undefined,
        })),
        camera: { x: 0, y: 0 },
      }));
    } else {
      // All levels completed!
      setGameState((prev) => ({
        ...prev,
        gameStatus: "gameOver",
        score: prev.score + 5000, // Bonus for completing all levels
      }));
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

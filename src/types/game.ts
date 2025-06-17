export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface GameEntity {
  id: string;
  position: Position;
  velocity: Velocity;
  size: Size;
  isGrounded: boolean;
}

export interface Player extends GameEntity {
  character: "bubu" | "dudu";
  health: number;
  powerUp: PowerUpType | null;
  direction: "left" | "right";
  isJumping: boolean;
  isMoving: boolean;
}

export interface Enemy extends GameEntity {
  type: "goomba" | "koopa";
  health: number;
  direction: "left" | "right";
  speed: number;
}

export interface Collectible extends GameEntity {
  type: "coin" | "powerup" | "star";
  value: number;
  powerUpType?: PowerUpType;
}

export interface Platform extends GameEntity {
  type: "ground" | "block" | "pipe";
  isBreakable: boolean;
  hasItem?: Collectible;
}

export type PowerUpType = "mushroom" | "fireflower" | "star";

export interface GameState {
  player: Player;
  enemies: Enemy[];
  collectibles: Collectible[];
  platforms: Platform[];
  score: number;
  lives: number;
  level: number;
  gameStatus: "menu" | "playing" | "paused" | "gameOver" | "levelComplete";
  timeRemaining: number;
  camera: Position;
}

export interface GameLevel {
  id: number;
  name: string;
  platforms: Omit<Platform, "id">[];
  enemies: Omit<Enemy, "id">[];
  collectibles: Omit<Collectible, "id">[];
  playerStart: Position;
  timeLimit: number;
  background: string;
}

export interface GameControls {
  left: boolean;
  right: boolean;
  jump: boolean;
  run: boolean;
}

export interface GameStats {
  totalScore: number;
  levelsCompleted: number;
  coinsCollected: number;
  enemiesDefeated: number;
  playTime: number;
}

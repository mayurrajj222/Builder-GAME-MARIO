export const GAME_CONFIG = {
  CANVAS_WIDTH: 1024,
  CANVAS_HEIGHT: 600,
  LANDSCAPE_CANVAS_WIDTH: Math.min(window.innerWidth - 40, 1200), // Landscape optimized width
  LANDSCAPE_CANVAS_HEIGHT: Math.min(window.innerHeight - 140, 500), // Landscape optimized height
  MOBILE_CANVAS_HEIGHT: 400, // Smaller height for mobile
  GRAVITY: 0.8,
  JUMP_FORCE: -15,
  PLAYER_SPEED: 5,
  PLAYER_RUN_SPEED: 8,
  ENEMY_SPEED: 2,
  FRICTION: 0.8,
  TILE_SIZE: 32,
  CAMERA_SMOOTH: 0.1,
  MOBILE_UI_HEIGHT: 80, // Reduced height for landscape controls
  LANDSCAPE_MODE: true, // Enable landscape optimizations
} as const;

export const PLAYER_CONFIG = {
  bubu: {
    color: "#ff69b4",
    darkColor: "#e55a94",
    name: "Bubu",
    maxHealth: 3,
    jumpForce: -18, // Easier jumping for level completion
    speed: 5.2, // Faster for better platform jumping
    runSpeed: 8.5,
  },
  dudu: {
    color: "#deb887",
    darkColor: "#cd853f",
    name: "Dudu",
    maxHealth: 3,
    jumpForce: -18, // Easier jumping for level completion
    speed: 5.5, // Faster for better platform jumping
    runSpeed: 8.8,
  },
} as const;

export const SCORES = {
  COIN: 100,
  ENEMY_DEFEAT: 200,
  POWERUP: 500,
  LEVEL_COMPLETE: 1000,
  TIME_BONUS: 10,
} as const;

export const POWERUP_EFFECTS = {
  mushroom: {
    healthBonus: 1,
    sizeMultiplier: 1.2,
    duration: Infinity,
  },
  fireflower: {
    projectile: true,
    sizeMultiplier: 1.2,
    duration: Infinity,
  },
  star: {
    invincible: true,
    speedMultiplier: 1.5,
    duration: 10000, // 10 seconds
  },
} as const;

export const ENEMY_TYPES = {
  goomba: {
    health: 1,
    speed: 1,
    points: 100,
    color: "#8B4513",
  },
  koopa: {
    health: 2,
    speed: 1.5,
    points: 200,
    color: "#228B22",
  },
} as const;

export const LEVEL_THEMES = {
  grassland: {
    backgroundColor: "#87CEEB",
    groundColor: "#8B5A2B",
    blockColor: "#CD853F",
  },
  underground: {
    backgroundColor: "#2F4F4F",
    groundColor: "#4A4A4A",
    blockColor: "#696969",
  },
  castle: {
    backgroundColor: "#800080",
    groundColor: "#708090",
    blockColor: "#A9A9A9",
  },
  space: {
    backgroundColor: "#000011",
    groundColor: "#4A4A6A",
    blockColor: "#6A6AFF",
  },
  lava: {
    backgroundColor: "#330000",
    groundColor: "#AA3300",
    blockColor: "#FF6600",
  },
} as const;

export const KEYBOARD_CONTROLS = {
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  SPACE: " ",
  A: "a",
  D: "d",
  W: "w",
  S: "s",
  SHIFT: "Shift",
} as const;

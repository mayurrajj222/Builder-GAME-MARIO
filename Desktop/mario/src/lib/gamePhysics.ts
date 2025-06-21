import { GameEntity, Position, Velocity, Size } from "@/types/game";
import { GAME_CONFIG } from "./gameConstants";

export function checkCollision(
  entity1: { position: Position; size: Size },
  entity2: { position: Position; size: Size },
): boolean {
  return (
    entity1.position.x < entity2.position.x + entity2.size.width &&
    entity1.position.x + entity1.size.width > entity2.position.x &&
    entity1.position.y < entity2.position.y + entity2.size.height &&
    entity1.position.y + entity1.size.height > entity2.position.y
  );
}

export function getCollisionSide(
  moving: { position: Position; size: Size; velocity: Velocity },
  stationary: { position: Position; size: Size },
): "top" | "bottom" | "left" | "right" | null {
  if (!checkCollision(moving, stationary)) return null;

  const overlapX = Math.min(
    moving.position.x + moving.size.width - stationary.position.x,
    stationary.position.x + stationary.size.width - moving.position.x,
  );
  const overlapY = Math.min(
    moving.position.y + moving.size.height - stationary.position.y,
    stationary.position.y + stationary.size.height - moving.position.y,
  );

  if (overlapX < overlapY) {
    return moving.velocity.x > 0 ? "left" : "right";
  } else {
    return moving.velocity.y > 0 ? "top" : "bottom";
  }
}

export function applyGravity(entity: GameEntity): void {
  if (!entity.isGrounded) {
    entity.velocity.y += GAME_CONFIG.GRAVITY;
  }
}

export function applyFriction(entity: GameEntity): void {
  // Apply stronger friction when grounded for better control
  const frictionValue = entity.isGrounded ? 0.85 : GAME_CONFIG.FRICTION;
  entity.velocity.x *= frictionValue;
}

export function updatePosition(entity: GameEntity): void {
  entity.position.x += entity.velocity.x;
  entity.position.y += entity.velocity.y;
}

export function isOnGround(
  entity: { position: Position; size: Size },
  platforms: { position: Position; size: Size }[],
): boolean {
  const feetY = entity.position.y + entity.size.height;

  return platforms.some((platform) => {
    const onPlatformX =
      entity.position.x + entity.size.width > platform.position.x &&
      entity.position.x < platform.position.x + platform.size.width;

    const onPlatformY =
      feetY >= platform.position.y && feetY <= platform.position.y + 5; // Small tolerance

    return onPlatformX && onPlatformY;
  });
}

export function resolveCollision(
  entity: GameEntity,
  platform: { position: Position; size: Size },
): void {
  const collisionSide = getCollisionSide(entity, platform);

  switch (collisionSide) {
    case "top":
      entity.position.y = platform.position.y - entity.size.height;
      entity.velocity.y = 0;
      entity.isGrounded = true;
      break;
    case "bottom":
      entity.position.y = platform.position.y + platform.size.height;
      entity.velocity.y = 0;
      break;
    case "left":
      entity.position.x = platform.position.x - entity.size.width;
      entity.velocity.x = 0;
      break;
    case "right":
      entity.position.x = platform.position.x + platform.size.width;
      entity.velocity.x = 0;
      break;
  }
}

export function keepInBounds(entity: GameEntity, bounds: Size): void {
  // Left boundary
  if (entity.position.x < 0) {
    entity.position.x = 0;
    entity.velocity.x = 0;
  }

  // Right boundary (allow scrolling beyond screen width)
  if (entity.position.x + entity.size.width > bounds.width * 3) {
    entity.position.x = bounds.width * 3 - entity.size.width;
    entity.velocity.x = 0;
  }

  // Bottom boundary (game over if player falls)
  if (entity.position.y > bounds.height + 100) {
    entity.position.y = bounds.height + 100;
    entity.velocity.y = 0;
  }
}

export function calculateDistance(pos1: Position, pos2: Position): number {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function normalizeVector(velocity: Velocity): Velocity {
  const magnitude = Math.sqrt(
    velocity.x * velocity.x + velocity.y * velocity.y,
  );
  if (magnitude === 0) return { x: 0, y: 0 };

  return {
    x: velocity.x / magnitude,
    y: velocity.y / magnitude,
  };
}

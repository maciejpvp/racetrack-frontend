import type { Vec2 } from "../types";

export const getAvailableMoves = (pos: Vec2, vel: Vec2): Vec2[] => {
  const moves: Vec2[] = [];
  const isStandingStill = vel.x === 0 && vel.y === 0;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const newVelocity = {
        x: vel.x + dx,
        y: vel.y + dy,
      };

      if (newVelocity.x === 0 && newVelocity.y === 0) continue;

      if (!isStandingStill) {
        const dot = newVelocity.x * vel.x + newVelocity.y * vel.y;
        const lenA = Math.hypot(vel.x, vel.y);
        const lenB = Math.hypot(newVelocity.x, newVelocity.y);
        const cos = dot / (lenA * lenB);
        if (cos < 0.707) continue;
      }

      moves.push({
        x: pos.x + newVelocity.x,
        y: pos.y + newVelocity.y,
      });
    }
  }

  return moves;
};

import type { Vec2 } from "../types";

export const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  position: Vec2,
  velocity: Vec2,
  color: string,
  gridSize: number,
) => {
  const { x: vx, y: vy } = velocity;
  const hasVelocity = vx !== 0 || vy !== 0;

  // Oblicz środek pola gracza
  const centerX = position.x * gridSize + gridSize / 2;
  const centerY = position.y * gridSize + gridSize / 2;

  // Oblicz kąt obrotu na podstawie kierunku
  const angle = hasVelocity ? Math.atan2(vy, vx) : 0;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  ctx.fillStyle = color;

  // Prostokąt względem środka
  ctx.fillRect(
    -gridSize / 6, // szerokość / 2 = (gridSize / 3) / 2
    -gridSize / 6, // wysokość / 2 = (gridSize / 2) / 2
    gridSize / 2,
    gridSize / 3,
  );

  ctx.restore();
};

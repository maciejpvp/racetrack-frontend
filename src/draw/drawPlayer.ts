import { GRID_SIZE } from "../constants";
import type { Vec2 } from "../types";

const renderedPositions = new Map<string, Vec2>();

export const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  targetPos: Vec2,
  velocity: Vec2,
  color: string,
  gridSize: number,
  path: Vec2[],
) => {
  const speed = 0.15; //Animation speed

  let rendered = renderedPositions.get(color);
  if (!rendered) {
    rendered = { ...targetPos };
    renderedPositions.set(color, rendered);
  }

  const dx = targetPos.x - rendered.x;
  const dy = targetPos.y - rendered.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > 0.01) {
    rendered.x += (dx / dist) * Math.min(speed, dist);
    rendered.y += (dy / dist) * Math.min(speed, dist);
  } else {
    rendered.x = targetPos.x;
    rendered.y = targetPos.y;
  }

  const centerX = rendered.x * gridSize + gridSize / 2;
  const centerY = rendered.y * gridSize + gridSize / 2;

  const { x: vx, y: vy } = velocity;
  const angle = vx !== 0 || vy !== 0 ? Math.atan2(vy, vx) : 0;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  ctx.fillStyle = color;
  ctx.fillRect(-gridSize / 6, -gridSize / 6, gridSize / 2, gridSize / 3);

  ctx.restore();

  if (path.length > 1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(
      path[0].x * GRID_SIZE + GRID_SIZE / 2,
      path[0].y * GRID_SIZE + GRID_SIZE / 2,
    );
    for (let i = 1; i < path.length - 1; i++) {
      ctx.lineTo(
        path[i].x * GRID_SIZE + GRID_SIZE / 2,
        path[i].y * GRID_SIZE + GRID_SIZE / 2,
      );
    }
    ctx.lineTo(
      rendered.x * gridSize + gridSize / 2,
      rendered.y * gridSize + gridSize / 2,
    );

    ctx.stroke();
  }
};

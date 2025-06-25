import { GRID_SIZE } from "../constants";
import type { Vec2 } from "../types";

export const drawGame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  playerPos: Vec2,
  path: Vec2[],
  available: Vec2[],
) => {
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = "#ccc";
  for (let x = 0; x <= width; x += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.fillStyle = "gray";
  available.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x * GRID_SIZE, y * GRID_SIZE, 5, 0, 2 * Math.PI);
    ctx.fill();
  });

  if (path.length > 1) {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(path[0].x * GRID_SIZE, path[0].y * GRID_SIZE);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x * GRID_SIZE, path[i].y * GRID_SIZE);
    }
    ctx.stroke();
  }

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(playerPos.x * GRID_SIZE, playerPos.y * GRID_SIZE, 6, 0, 2 * Math.PI);
  ctx.fill();
};

import type { Vec2 } from "../types";

let renderedCameraPos: Vec2 = { x: 33.5, y: 30.5 };

export const updateCamera = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  targetPos: Vec2,
  gridSize: number,
) => {
  const speed = 0.15;

  const dx = targetPos.x - renderedCameraPos.x;
  const dy = targetPos.y - renderedCameraPos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > 0.01) {
    renderedCameraPos.x += (dx / dist) * Math.min(speed, dist);
    renderedCameraPos.y += (dy / dist) * Math.min(speed, dist);
  } else {
    renderedCameraPos = { ...targetPos };
  }

  const offsetX =
    canvasWidth / 2 - renderedCameraPos.x * gridSize - gridSize / 2;
  const offsetY =
    canvasHeight / 2 - renderedCameraPos.y * gridSize - gridSize / 2;

  ctx.translate(offsetX, offsetY);
};

export const resetCamera = () => {
  renderedCameraPos = { x: 0, y: 0 };
};

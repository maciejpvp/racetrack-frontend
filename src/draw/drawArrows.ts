import { GRID_SIZE } from "../constants";
import type { directionArrow } from "../types";

export const drawArrows = (
  ctx: CanvasRenderingContext2D,
  arrows: directionArrow[],
) => {
  for (const { x, y, angle } of arrows) {
    const px = x * GRID_SIZE;
    const py = y * GRID_SIZE;
    const radians = (angle * Math.PI) / 180;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(radians);

    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.moveTo(-10, -2);
    ctx.lineTo(6, -2);
    ctx.lineTo(6, -6);
    ctx.lineTo(12, 0);
    ctx.lineTo(6, 6);
    ctx.lineTo(6, 2);
    ctx.lineTo(-10, 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
};

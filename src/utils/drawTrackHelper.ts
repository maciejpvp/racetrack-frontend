import { GRID_SIZE } from "../constants";
import type { MapType } from "../types";

const drawTrackHelper = (
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  color: string,
  gridSize: number,
  lineWidth: number,
) => {
  if (points.length === 0) return;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();

  ctx.moveTo(
    points[0].x * gridSize + gridSize / 2,
    points[0].y * gridSize + gridSize / 2,
  );
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(
      points[i].x * gridSize + gridSize / 2,
      points[i].y * gridSize + gridSize / 2,
    );
  }

  ctx.stroke();
};

export const drawTrack = (ctx: CanvasRenderingContext2D, map: MapType) => {
  drawTrackHelper(ctx, map.innerBoundary, "black", GRID_SIZE, 10);
  drawTrackHelper(ctx, map.outerBoundary, "black", GRID_SIZE, 10);
};

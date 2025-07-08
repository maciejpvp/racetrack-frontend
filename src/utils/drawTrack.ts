import { colors, GRID_SIZE } from "../constants";
import type { MapType, Vec2 } from "../types";
import { drawGrid } from "./drawGrid";

export const drawTrackHelper = (
  ctx: CanvasRenderingContext2D,
  points: Vec2[],
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

export const drawTrackPolygon = (
  ctx: CanvasRenderingContext2D,
  outer: Vec2[],
  inner: Vec2[],
  gridSize: number,
  fillColor: string,
) => {
  if (outer.length === 0 || inner.length === 0) return;

  ctx.beginPath();

  // Draw outer boundary (clockwise)
  ctx.moveTo(
    outer[0].x * gridSize + gridSize / 2,
    outer[0].y * gridSize + gridSize / 2,
  );
  for (let i = 1; i < outer.length; i++) {
    ctx.lineTo(
      outer[i].x * gridSize + gridSize / 2,
      outer[i].y * gridSize + gridSize / 2,
    );
  }
  ctx.closePath();

  // Draw inner boundary (counter-clockwise)
  ctx.moveTo(
    inner[0].x * gridSize + gridSize / 2,
    inner[0].y * gridSize + gridSize / 2,
  );
  for (let i = inner.length - 1; i >= 0; i--) {
    ctx.lineTo(
      inner[i].x * gridSize + gridSize / 2,
      inner[i].y * gridSize + gridSize / 2,
    );
  }
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.fill("evenodd");
};

export const drawTrack = (ctx: CanvasRenderingContext2D, map: MapType) => {
  drawTrackPolygon(
    ctx,
    map.outerBoundary,
    map.innerBoundary,
    GRID_SIZE,
    colors.track.tourLine,
  );

  drawGrid(ctx);

  drawTrackHelper(ctx, map.innerBoundary, colors.track.outline, GRID_SIZE, 5);
  drawTrackHelper(ctx, map.outerBoundary, colors.track.outline, GRID_SIZE, 5);
};

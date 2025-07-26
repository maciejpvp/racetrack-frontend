import { GRID_SIZE } from "../constants";
import type { Line } from "../types";
import { drawTrackHelper } from "./drawTrack";

export const drawCheckpoints = (
  ctx: CanvasRenderingContext2D,
  checkpoints: Line[],
) => {
  for (const checkpoint of checkpoints) {
    drawTrackHelper(ctx, [checkpoint.a, checkpoint.b], "#22c55e", GRID_SIZE, 5);
  }
};

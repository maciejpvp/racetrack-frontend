import { GRID_SIZE } from "../constants";
import type { Line } from "../types";
import { drawTrackHelper } from "./drawTrack";

export const drawFinish = (ctx: CanvasRenderingContext2D, finish: Line) => {
  drawTrackHelper(ctx, [finish.a, finish.b], "#d97706", GRID_SIZE, 5);
};

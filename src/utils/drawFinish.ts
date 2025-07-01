import { GRID_SIZE } from "../constants";
import type { Line } from "../types";
import { drawTrackHelper } from "./drawTrackHelper";

export const drawFinish = (ctx: CanvasRenderingContext2D, finish: Line) => {
  drawTrackHelper(ctx, [finish.a, finish.b], "green", GRID_SIZE, 5);
};

import { colors, GRID_COLS, GRID_ROWS, GRID_SIZE } from "../constants";
import type { MapType, PlayerType, Vec2 } from "../types";
import { updateCamera } from "../utils/camera";
import { drawArrows } from "./drawArrows";
import { drawFinish } from "./drawFinish";
import { drawPlayer } from "./drawPlayer";
import { drawTrack } from "./drawTrack";

export const drawGame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  localPlayer: PlayerType,
  available: Vec2[],
  otherPlayers: PlayerType[],
  isYourTurn: boolean,
  map: MapType,
) => {
  if (!localPlayer.path) return;

  ctx.clearRect(0, 0, width, height);

  ctx.save();

  updateCamera(
    ctx,
    width,
    height,
    localPlayer.position,
    GRID_SIZE,
    map?.startPosition || { x: 0, y: 0 },
  );

  ctx.fillStyle = colors.environment.grass;
  ctx.fillRect(0, 0, GRID_COLS * GRID_SIZE, GRID_ROWS * GRID_SIZE);

  ctx.lineWidth = 0.3;
  drawTrack(ctx, map);
  drawFinish(ctx, map.finish!);

  drawPlayer(
    ctx,
    localPlayer.position,
    localPlayer.velocity,
    localPlayer.color,
    GRID_SIZE,
    localPlayer.path,
  );
  if (isYourTurn) {
    ctx.fillStyle = localPlayer.color;
    available.forEach(({ x, y }) => {
      if (otherPlayers.some((p) => p.position.x === x && p.position.y === y)) {
        return;
      }

      ctx.beginPath();
      ctx.arc(
        x * GRID_SIZE + GRID_SIZE / 2,
        y * GRID_SIZE + GRID_SIZE / 2,
        5,
        0,
        2 * Math.PI,
      );
      ctx.fill();
    });
  }

  otherPlayers.forEach((player) => {
    drawPlayer(
      ctx,
      player.position,
      player.velocity,
      player.color,
      GRID_SIZE,
      player.path ?? [player.position],
    );
  });

  drawArrows(ctx, map.directionArrows);

  // Show Checkpoints for Debug Purposes, do NOT uncomment for prod, should be invisible for users
  // drawCheckpoints(ctx, map.checkpoints);

  ctx.restore();
};

import { GRID_COLS, GRID_ROWS, GRID_SIZE } from "../constants";
import type { MapType, PlayerType, Vec2 } from "../types";
import { updateCamera } from "./camera";
import { drawFinish } from "./drawFinish";
import { drawPlayer } from "./drawPlayer";
import { drawTrack } from "./drawTrackHelper";

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

  // const offsetX =
  //   width / 2 - localPlayer.position.x * GRID_SIZE - GRID_SIZE / 2;
  // const offsetY =
  //   height / 2 - localPlayer.position.y * GRID_SIZE - GRID_SIZE / 2;
  // ctx.translate(offsetX, offsetY);
  updateCamera(
    ctx,
    width,
    height,
    localPlayer.position,
    GRID_SIZE,
    map?.startPosition || { x: 0, y: 0 },
  );

  ctx.strokeStyle = "#c4c4c4";
  for (let x = 0; x <= GRID_COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * GRID_SIZE, 0);
    ctx.lineTo(x * GRID_SIZE, GRID_SIZE * GRID_ROWS);
    ctx.stroke();
  }

  for (let y = 0; y <= GRID_ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * GRID_SIZE);
    ctx.lineTo(GRID_SIZE * GRID_COLS, y * GRID_SIZE);
    ctx.stroke();
  }

  if (isYourTurn) {
    ctx.fillStyle = localPlayer.color;
    available.forEach(({ x, y }) => {
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

  drawFinish(ctx, map.finish!);

  drawTrack(ctx, map);

  drawPlayer(
    ctx,
    localPlayer.position,
    localPlayer.velocity,
    localPlayer.color,
    GRID_SIZE,
    localPlayer.path,
  );

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

  ctx.restore();
};

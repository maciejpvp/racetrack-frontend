import { GRID_COLS, GRID_ROWS, GRID_SIZE } from "../constants";
import { drawTrack } from "../maps/donut";
import type { PlayerType, Vec2 } from "../types";
import { drawPlayer } from "./drawPlayer";

export const drawGame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  localPlayer: PlayerType,
  available: Vec2[],
  otherPlayers: PlayerType[],
) => {
  if (!localPlayer.path) return;

  ctx.clearRect(0, 0, width, height);

  ctx.save();

  const offsetX =
    width / 2 - localPlayer.position.x * GRID_SIZE - GRID_SIZE / 2;
  const offsetY =
    height / 2 - localPlayer.position.y * GRID_SIZE - GRID_SIZE / 2;
  ctx.translate(offsetX, offsetY);

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

  drawTrack(ctx);

  otherPlayers.forEach((player) => {
    const { x, y } = player.position;
    ctx.fillStyle = player.color;
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

  if (localPlayer.path.length > 1) {
    ctx.strokeStyle = localPlayer.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(
      localPlayer.path[0].x * GRID_SIZE + GRID_SIZE / 2,
      localPlayer.path[0].y * GRID_SIZE + GRID_SIZE / 2,
    );
    for (let i = 1; i < localPlayer.path.length; i++) {
      ctx.lineTo(
        localPlayer.path[i].x * GRID_SIZE + GRID_SIZE / 2,
        localPlayer.path[i].y * GRID_SIZE + GRID_SIZE / 2,
      );
    }
    ctx.stroke();
  }

  for (const player of otherPlayers) {
    if (!player.path || player.path.length < 2) continue;

    ctx.strokeStyle = player.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(
      player.path[0].x * GRID_SIZE + GRID_SIZE / 2,
      player.path[0].y * GRID_SIZE + GRID_SIZE / 2,
    );
    for (let i = 1; i < player.path.length; i++) {
      ctx.lineTo(
        player.path[i].x * GRID_SIZE + GRID_SIZE / 2,
        player.path[i].y * GRID_SIZE + GRID_SIZE / 2,
      );
    }
    ctx.stroke();
  }

  drawPlayer(
    ctx,
    localPlayer.position,
    localPlayer.velocity,
    localPlayer.color,
    GRID_SIZE,
  );

  ctx.restore();
};

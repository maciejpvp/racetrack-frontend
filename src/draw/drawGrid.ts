import { GRID_COLS, GRID_ROWS, GRID_SIZE } from "../constants";

export const drawGrid = (ctx: CanvasRenderingContext2D) => {
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
};

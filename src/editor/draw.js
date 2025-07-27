import { state } from "./state.js";

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export function setupDrawHelpers() {
  canvas.width = state.GRID_SIZE * 100;
  canvas.height = state.GRID_SIZE * 100;
}

export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawPoints(state.outerBoundary, "red");
  drawPoints(state.innerBoundary, "blue");

  if (state.startPosition) {
    drawMarker(state.startPosition, "lime", "S");
  }

  state.checkpoints.forEach((line, i) => drawLine(line, "yellow", i + 1));
  if (state.finish) drawLine(state.finish, "white", "F");
  state.directionArrows.forEach(drawArrow);
}

function drawGrid() {
  ctx.strokeStyle = "#333";
  for (let x = 0; x < canvas.width; x += state.GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += state.GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function drawPoints(points, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    ctx.beginPath();
    ctx.arc(
      p.x * state.GRID_SIZE + 20,
      p.y * state.GRID_SIZE + 20,
      4,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = color;
    ctx.fill();
    if (i > 0) {
      const prev = points[i - 1];
      ctx.beginPath();
      ctx.moveTo(prev.x * state.GRID_SIZE + 20, prev.y * state.GRID_SIZE + 20);
      ctx.lineTo(p.x * state.GRID_SIZE + 20, p.y * state.GRID_SIZE + 20);
      ctx.stroke();
    }
  }
}

function drawMarker(pos, color, label) {
  const cx = pos.x * state.GRID_SIZE + 20;
  const cy = pos.y * state.GRID_SIZE + 20;
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, cx, cy);
}

function drawLine(line, color, label) {
  const { a, b } = line;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(a.x * state.GRID_SIZE + 20, a.y * state.GRID_SIZE + 20);
  ctx.lineTo(b.x * state.GRID_SIZE + 20, b.y * state.GRID_SIZE + 20);
  ctx.stroke();

  const midX = ((a.x + b.x) / 2) * state.GRID_SIZE + 20;
  const midY = ((a.y + b.y) / 2) * state.GRID_SIZE + 20;
  ctx.fillStyle = "black";
  ctx.fillText(label, midX, midY);
}

function drawArrow({ x, y, angle }) {
  const cx = x * state.GRID_SIZE + 20;
  const cy = y * state.GRID_SIZE + 20;
  const len = 20;
  const rad = (angle * Math.PI) / 180;
  const ex = cx + Math.cos(rad) * len;
  const ey = cy + Math.sin(rad) * len;

  ctx.strokeStyle = "orange";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(ex, ey);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.lineTo(
    ex - 6 * Math.cos(rad - Math.PI / 6),
    ey - 6 * Math.sin(rad - Math.PI / 6),
  );
  ctx.lineTo(
    ex - 6 * Math.cos(rad + Math.PI / 6),
    ey - 6 * Math.sin(rad + Math.PI / 6),
  );
  ctx.lineTo(ex, ey);
  ctx.fillStyle = "orange";
  ctx.fill();
}

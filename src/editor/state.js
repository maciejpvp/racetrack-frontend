import { draw } from "./draw.js";

export const state = {
  mode: "outer",
  outerBoundary: [],
  innerBoundary: [],
  startPosition: null,
  checkpoints: [],
  finish: null,
  directionArrows: [],
  defaultVelocity: { x: 1, y: 0 },
  lineStart: null,
  GRID_SIZE: 40,
  history: [],
  handleClick(x, y) {
    if (this.mode === "outer" || this.mode === "inner") {
      const path =
        this.mode === "outer" ? this.outerBoundary : this.innerBoundary;
      path.push({ x, y });
    } else if (this.mode === "start") {
      this.startPosition = { x, y };
    } else if (this.mode === "checkpoint" || this.mode === "finish") {
      if (!this.lineStart) this.lineStart = { x, y };
      else {
        const line = { a: this.lineStart, b: { x, y } };
        if (this.mode === "checkpoint") this.checkpoints.push(line);
        else this.finish = line;
        this.lineStart = null;
      }
    } else if (this.mode === "arrow") {
      const existing = this.directionArrows.find((a) => a.x === x && a.y === y);
      if (existing) existing.angle = (existing.angle + 15) % 360;
      else this.directionArrows.push({ x, y, angle: 0 });
    } else if (this.mode === "deleteArrow") {
      const index = this.directionArrows.findIndex(
        (a) => a.x === x && a.y === y,
      );
      if (index !== -1) this.directionArrows.splice(index, 1);
    } else if (this.mode === "deleteCheckpoint") {
      const tolerance = 0.5;
      const dist = (p, a, b) => {
        const toCoord = (pt) => ({
          x: pt.x * this.GRID_SIZE + this.GRID_SIZE / 2,
          y: pt.y * this.GRID_SIZE + this.GRID_SIZE / 2,
        });
        const p0 = toCoord(p),
          p1 = toCoord(a),
          p2 = toCoord(b);
        const dx = p2.x - p1.x,
          dy = p2.y - p1.y;
        const lengthSq = dx * dx + dy * dy;
        const t = Math.max(
          0,
          Math.min(1, ((p0.x - p1.x) * dx + (p0.y - p1.y) * dy) / lengthSq),
        );
        const closest = { x: p1.x + t * dx, y: p1.y + t * dy };
        return Math.hypot(p0.x - closest.x, p0.y - closest.y);
      };
      const index = this.checkpoints.findIndex(
        (cp) => dist({ x, y }, cp.a, cp.b) < this.GRID_SIZE * tolerance,
      );
      if (index !== -1) this.checkpoints.splice(index, 1);
    }
  },
};

export const setMode = (m) => (state.mode = m);

export function saveState() {
  state.history.push(JSON.parse(JSON.stringify(state)));
}

export function undo(drawFn) {
  if (state.history.length) {
    const prev = state.history.pop();
    Object.assign(state, prev);
    drawFn();
  }
}

export function exportMap() {
  const map = {
    name: document.getElementById("mapName").value || "Unnamed Map",
    outerBoundary: state.outerBoundary,
    innerBoundary: state.innerBoundary,
    startPosition: state.startPosition,
    checkpoints: state.checkpoints,
    finish: state.finish,
    defaultVelocity: state.defaultVelocity,
    directionArrows: state.directionArrows,
  };
  const blob = new Blob([JSON.stringify(map, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "map.json";
  link.click();
}

export function loadMapFromFile(file, callback) {
  const reader = new FileReader();
  reader.onload = () => {
    Object.assign(state, JSON.parse(reader.result));
    callback();
  };
  reader.readAsText(file);
}

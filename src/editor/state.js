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
      if (!this.lineStart) {
        this.lineStart = { x, y };
      } else {
        const line = { a: this.lineStart, b: { x, y } };
        if (this.mode === "checkpoint") {
          this.checkpoints.push(line);
        } else {
          this.finish = line;
        }
        this.lineStart = null;
      }
    } else if (this.mode === "arrow") {
      const existing = this.directionArrows.find((a) => a.x === x && a.y === y);
      if (existing) {
        existing.angle = (existing.angle + 15) % 360;
      } else {
        this.directionArrows.push({ x, y, angle: 0 });
      }
    } else if (this.mode === "deleteArrow") {
      const clickX = x * this.GRID_SIZE + this.GRID_SIZE / 2;
      const clickY = y * this.GRID_SIZE + this.GRID_SIZE / 2;
      const radius = 15;

      const index = this.directionArrows.findIndex(({ x: ax, y: ay }) => {
        const arrowX = ax * this.GRID_SIZE + this.GRID_SIZE / 2;
        const arrowY = ay * this.GRID_SIZE + this.GRID_SIZE / 2;
        return Math.hypot(arrowX - clickX, arrowY - clickY) < radius;
      });

      if (index !== -1) this.directionArrows.splice(index, 1);
    } else if (this.mode === "deleteCheckpoint") {
      const clickX = x * this.GRID_SIZE + this.GRID_SIZE / 2;
      const clickY = y * this.GRID_SIZE + this.GRID_SIZE / 2;
      const tolerance = 10;

      const distToSegment = (px, py, ax, ay, bx, by) => {
        const dx = bx - ax;
        const dy = by - ay;
        const lengthSq = dx * dx + dy * dy;
        let t = ((px - ax) * dx + (py - ay) * dy) / lengthSq;
        t = Math.max(0, Math.min(1, t));
        const cx = ax + t * dx;
        const cy = ay + t * dy;
        return Math.hypot(px - cx, py - cy);
      };

      const index = this.checkpoints.findIndex(({ a, b }) => {
        const ax = a.x * this.GRID_SIZE + this.GRID_SIZE / 2;
        const ay = a.y * this.GRID_SIZE + this.GRID_SIZE / 2;
        const bx = b.x * this.GRID_SIZE + this.GRID_SIZE / 2;
        const by = b.y * this.GRID_SIZE + this.GRID_SIZE / 2;
        return distToSegment(clickX, clickY, ax, ay, bx, by) < tolerance;
      });

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

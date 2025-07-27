import { draw, canvas, ctx, setupDrawHelpers } from "./draw.js";
import {
  state,
  setMode,
  saveState,
  loadMapFromFile,
  exportMap,
  undo,
} from "./state.js";
import { setupOverlayControls } from "./overlay.js";
import { setupControlButtons } from "./controls.js";

setupDrawHelpers();
setupControlButtons();
setupOverlayControls();

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / state.GRID_SIZE);
  const y = Math.floor((e.clientY - rect.top) / state.GRID_SIZE);
  saveState();
  state.handleClick(x, y);
  draw();
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z") undo(draw);
});

draw();

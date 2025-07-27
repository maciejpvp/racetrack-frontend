import { setMode, exportMap, loadMapFromFile, state } from "./state.js";
import { draw } from "./draw.js";

export function setupControlButtons() {
  const modes = ["Outer", "Inner", "Start", "Checkpoint", "Finish", "Arrow"];
  modes.forEach(
    (mode) =>
      (document.getElementById("mode" + mode).onclick = () =>
        setMode(mode.toLowerCase())),
  );

  document.getElementById("export").onclick = exportMap;

  document.getElementById("import").addEventListener("change", (e) => {
    if (e.target.files.length) loadMapFromFile(e.target.files[0], draw);
  });

  document.getElementById("defaultVelocityX").oninput = (e) => {
    state.defaultVelocity.x = parseFloat(e.target.value);
    draw();
  };
  document.getElementById("defaultVelocityY").oninput = (e) => {
    state.defaultVelocity.y = parseFloat(e.target.value);
    draw();
  };
}

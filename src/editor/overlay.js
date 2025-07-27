export function setupOverlayControls() {
  const overlay = document.getElementById("overlayImage");
  const scale = document.getElementById("overlayScale");
  const xOffset = document.getElementById("overlayOffsetX");
  const yOffset = document.getElementById("overlayOffsetY");

  function update() {
    overlay.style.width = canvas.width * parseFloat(scale.value) + "px";
    overlay.style.height = canvas.height * parseFloat(scale.value) + "px";
    overlay.style.left = xOffset.value + "px";
    overlay.style.top = yOffset.value + "px";
  }

  [scale, xOffset, yOffset].forEach((el) =>
    el.addEventListener("input", update),
  );

  document.getElementById("overlayUpload").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        overlay.src = reader.result;
        overlay.onload = update;
      };
      reader.readAsDataURL(file);
    }
  });
}

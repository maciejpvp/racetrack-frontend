export const drawTrackHelper = (
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  color: string,
  gridSize: number,
  lineWidth: number,
) => {
  if (points.length === 0) return;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();

  // Przelicz na piksele
  ctx.moveTo(
    points[0].x * gridSize + gridSize / 2,
    points[0].y * gridSize + gridSize / 2,
  );
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(
      points[i].x * gridSize + gridSize / 2,
      points[i].y * gridSize + gridSize / 2,
    );
  }

  ctx.stroke();
};

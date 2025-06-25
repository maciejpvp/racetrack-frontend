import type { Vec2 } from "../types";

type Polygon = Vec2[];
type Track = {
  outerBoundary: Polygon;
  innerBoundary: Polygon;
};

const pointInPolygon = (
  point: Vec2,
  polygon: Polygon,
  epsilon = 0.001,
): boolean => {
  let inside = false;

  const px = point.x + epsilon;
  const py = point.y + epsilon;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      yi > py !== yj > py &&
      px < ((xj - xi) * (py - yi)) / (yj - yi + 0.0000001) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
};

export const isOnTrack = (carPos: Vec2, track: Track): boolean => {
  const insideOuter = pointInPolygon(carPos, track.outerBoundary);
  const insideInner = pointInPolygon(carPos, track.innerBoundary);
  return insideOuter && !insideInner;
};

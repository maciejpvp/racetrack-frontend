type Vec2 = { x: number; y: number };

export const mapGenerator = (
  svg: string,
): {
  outerBoundary: Vec2[];
  innerBoundary: Vec2[];
} => {
  const pathRegex = /<path[^>]+d="([^"]+)"/g;
  const paths = [...svg.matchAll(pathRegex)].map((match) => match[1]);

  const parsePath = (d: string): Vec2[] => {
    const coords = [...d.matchAll(/[-+]?\d*\.?\d+/g)].map((n) =>
      parseFloat(n[0]),
    );
    const points: Vec2[] = [];

    for (let i = 0; i < coords.length; i += 2) {
      points.push({
        x: Math.round(coords[i] / 5),
        y: Math.round(coords[i + 1] / 5),
      });
    }

    return points;
  };

  return {
    outerBoundary: parsePath(paths[0]),
    innerBoundary: parsePath(paths[1]),
  };
};

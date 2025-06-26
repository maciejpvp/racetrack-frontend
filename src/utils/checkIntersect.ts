import type { Vec2 } from "../types";

type Line = { a: Vec2; b: Vec2 };

function linesIntersect(a1: Vec2, a2: Vec2, b1: Vec2, b2: Vec2): boolean {
  const det = (a2.x - a1.x) * (b2.y - b1.y) - (a2.y - a1.y) * (b2.x - b1.x);
  if (det === 0) return false; // parallel lines

  const lambda =
    ((b2.y - b1.y) * (b2.x - a1.x) + (b1.x - b2.x) * (b2.y - a1.y)) / det;
  const gamma =
    ((a1.y - a2.y) * (b2.x - a1.x) + (a2.x - a1.x) * (b2.y - a1.y)) / det;

  return lambda > 0 && lambda < 1 && gamma > 0 && gamma < 1;
}

interface CheckpointResult {
  checkpointIndex: number;
  finished: boolean;
}

export function checkCheckpointProgress(
  lastPos: Vec2,
  newPos: Vec2,
  checkpoints: Line[],
  finish: Line | null,
  checkpointIndex: number,
): CheckpointResult {
  const segmentA = lastPos;
  const segmentB = newPos;

  if (checkpointIndex < checkpoints.length) {
    const cp = checkpoints[checkpointIndex];
    if (linesIntersect(segmentA, segmentB, cp.a, cp.b)) {
      return {
        checkpointIndex: checkpointIndex + 1,
        finished: false,
      };
    }
  }

  if (checkpointIndex === checkpoints.length && finish) {
    if (linesIntersect(segmentA, segmentB, finish.a, finish.b)) {
      return {
        checkpointIndex,
        finished: true,
      };
    }
  }

  return {
    checkpointIndex,
    finished: false,
  };
}

export type Vec2 = {
  x: number;
  y: number;
};
export type Line = {
  a: Vec2;
  b: Vec2;
};

export type PlayerType = {
  id: string;
  roomId?: string;
  color: "red" | "blue";
  username: string;
  position: Vec2;
  velocity: Vec2;
  path?: Vec2[];
  checkpointIndex: number;
};

export type LeaderboardType = {
  socketId: string;
  username: string;
  movesUsed: number;
}[];

export type GameDataType = {
  id: string;
  players: PlayerType[];
  playerTurn: string;
  mapIndex: number;
};

export type GameFinishedType = {
  leaderboard: LeaderboardType;
};

export type GameTerminatedType = {
  roomId: string;
  playerId: string;
  reason: "leave" | "kick";
};
export type WarningType = {
  punishment: number;
};

export type SkippedType = {
  reason: "punishment";
  remaining: number;
};

export type MapType = {
  name: string;
  outerBoundary: Vec2[];
  innerBoundary: Vec2[];
  startPosition: Vec2 | null;
  checkpoints: Line[];
  finish: Line | null;
};

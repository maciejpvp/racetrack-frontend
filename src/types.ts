export type Vec2 = {
  x: number;
  y: number;
};

export type PlayerType = {
  id: string;
  roomId?: string;
  color: "red" | "blue" | "green";
  username: string;
  position: Vec2;
  velocity: Vec2;
  path?: Vec2[];
  checkpointIndex: number;
};

export type GameDataType = {
  id: string;
  players: PlayerType[];
  playerTurn: string;
};

export type Vec2 = {
  x: number;
  y: number;
};

export type PlayerType = {
  id: string;
  roomId?: string;
  username: string;
  position: Vec2;
  velocity: Vec2;
};

export type GameDataType = {
  players: PlayerType[];
};

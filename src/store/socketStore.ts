import type { Socket } from "socket.io-client";
import ioClient from "socket.io-client";

import { create } from "zustand";
import type {
  GameDataType,
  GameTerminatedType,
  PlayerType,
  PlayerWonType,
  Vec2,
} from "../types";
import { backend } from "../constants";

export type PlayerMovedData = {
  newPos: Vec2;
  newVelocity: Vec2;
  playerId: string;
  playerTurn: string;
  leaderboard: PlayerType[];
};

type ServerToClientEvents = {
  "game-found": (gameInfo: GameDataType) => void;
  "player-moved": (data: PlayerMovedData) => void;
  "game-terminated": (data: GameTerminatedType) => void;
  "player-won": (data: PlayerWonType) => void;
};

type ClientToServerEvents = {
  "join-queue": (
    callback: (
      response:
        | { success: true; message: string }
        | { success: false; details: string; errorCode: number },
    ) => void,
  ) => void;
  "move-player": (data: { newPos: Vec2; roomId: string }) => void;
  "leave-lobby": () => void;
};

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents> | null;

type SocketStore = {
  socket: SocketType;
  connect: () => void;
  disconnect: () => void;
};

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,

  connect: () => {
    const { socket: isSocketConnected } = get();
    if (isSocketConnected) return;

    const socket = ioClient(`http://${backend}:3000`, {});

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socket.onAny((event, ...args) => {
      console.log(`📥 Received event: "${event}" with data:`, ...args);
    });

    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

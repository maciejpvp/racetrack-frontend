import type { Socket } from "socket.io-client";
import ioClient from "socket.io-client";

import { create } from "zustand";
import type {
  GameDataType,
  GameFinishedType,
  GameTerminatedType,
  PlayerType,
  SkippedType,
  Vec2,
  WarningType,
} from "../types";

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
  "game-finished": (data: GameFinishedType) => void;
  warning: (data: WarningType) => void;
  skipped: (data: SkippedType) => void;
  "punishment-ended": () => void;
};

type ClientToServerEvents = {
  "join-queue": (
    data: { username: string },
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

    const socket = ioClient(`${import.meta.env.VITE_BACKEND}`, {
      path: "/api/socket",
    });

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

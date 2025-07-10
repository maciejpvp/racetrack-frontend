import { create } from "zustand";
import type { GameDataType, LeaderboardType } from "../types";

interface gameState {
  isInGame: boolean;
  isOnTrack: boolean;
  isYourTurn: boolean;
  didYouWin: boolean;
  punishment: number;
  leaderboard: LeaderboardType;
  setIsInGame: (newValue: boolean) => void;
  gameData: GameDataType | undefined;
  setGameData: (gameData: GameDataType | undefined) => void;
  setIsYourTurn: (newValue: boolean) => void;
  setDidYouWin: (newValue: boolean) => void;
  setPunishment: (newValue: number) => void;
  setLeaderboard: (newValue: LeaderboardType) => void;
  restartData: () => void;
}

export const useGameStore = create<gameState>((set) => ({
  isInGame: false,
  isOnTrack: true,
  gameData: undefined,
  isYourTurn: false,
  didYouWin: false,
  punishment: 0,
  leaderboard: [],
  setIsInGame: (newValue) => set({ isInGame: newValue }),
  setGameData: (gameData) => set({ gameData }),
  setIsYourTurn: (newValue) => set({ isYourTurn: newValue }),
  setDidYouWin: (newValue) => set({ didYouWin: newValue }),
  setPunishment: (newValue) => set({ punishment: newValue }),
  setLeaderboard: (newValue) => set({ leaderboard: newValue }),
  restartData: () =>
    set({
      isInGame: false,
      isOnTrack: true,
      gameData: undefined,
      isYourTurn: false,
      didYouWin: false,
      punishment: 0,
      leaderboard: [],
    }),
}));

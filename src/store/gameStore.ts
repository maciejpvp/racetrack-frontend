import { create } from "zustand";
import type { GameDataType } from "../types";

interface gameState {
  isInGame: boolean;
  isOnTrack: boolean;
  setIsInGame: (newValue: boolean) => void;
  gameData: GameDataType | undefined;
  setGameData: (gameData: GameDataType) => void;
}

export const useGameStore = create<gameState>((set) => ({
  isInGame: false,
  isOnTrack: true,
  gameData: undefined,
  setIsInGame: (newValue) => set({ isInGame: newValue }),
  setGameData: (gameData) => set({ gameData }),
}));

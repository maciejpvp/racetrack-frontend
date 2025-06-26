import { create } from "zustand";
import type { GameDataType } from "../types";

interface gameState {
  isInGame: boolean;
  isOnTrack: boolean;
  isYourTurn: boolean;
  setIsInGame: (newValue: boolean) => void;
  gameData: GameDataType | undefined;
  setGameData: (gameData: GameDataType) => void;
  setIsYourTurn: (newValue: boolean) => void;
}

export const useGameStore = create<gameState>((set) => ({
  isInGame: false,
  isOnTrack: true,
  gameData: undefined,
  isYourTurn: false,
  setIsInGame: (newValue) => set({ isInGame: newValue }),
  setGameData: (gameData) => set({ gameData }),
  setIsYourTurn: (newValue) => set({ isYourTurn: newValue }),
}));

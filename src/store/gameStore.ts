import { create } from "zustand";
import type { GameDataType } from "../types";

interface gameState {
  isInGame: boolean;
  isOnTrack: boolean;
  isYourTurn: boolean;
  didYouWin: boolean;
  setIsInGame: (newValue: boolean) => void;
  gameData: GameDataType | undefined;
  setGameData: (gameData: GameDataType | undefined) => void;
  setIsYourTurn: (newValue: boolean) => void;
  setDidYouWin: (newValue: boolean) => void;
}

export const useGameStore = create<gameState>((set) => ({
  isInGame: false,
  isOnTrack: true,
  gameData: undefined,
  isYourTurn: false,
  didYouWin: false,
  setIsInGame: (newValue) => set({ isInGame: newValue }),
  setGameData: (gameData) => set({ gameData }),
  setIsYourTurn: (newValue) => set({ isYourTurn: newValue }),
  setDidYouWin: (newValue) => set({ didYouWin: newValue }),
}));

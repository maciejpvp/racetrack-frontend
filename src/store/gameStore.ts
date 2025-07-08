import { create } from "zustand";
import type { GameDataType } from "../types";

interface gameState {
  isInGame: boolean;
  isOnTrack: boolean;
  isYourTurn: boolean;
  didYouWin: boolean;
  punishment: number;
  setIsInGame: (newValue: boolean) => void;
  gameData: GameDataType | undefined;
  setGameData: (gameData: GameDataType | undefined) => void;
  setIsYourTurn: (newValue: boolean) => void;
  setDidYouWin: (newValue: boolean) => void;
  setPunishment: (newValue: number) => void;
}

export const useGameStore = create<gameState>((set) => ({
  isInGame: false,
  isOnTrack: true,
  gameData: undefined,
  isYourTurn: false,
  didYouWin: false,
  punishment: 10,
  setIsInGame: (newValue) => set({ isInGame: newValue }),
  setGameData: (gameData) => set({ gameData }),
  setIsYourTurn: (newValue) => set({ isYourTurn: newValue }),
  setDidYouWin: (newValue) => set({ didYouWin: newValue }),
  setPunishment: (newValue) => set({ punishment: newValue }),
}));

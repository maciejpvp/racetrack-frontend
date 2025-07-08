import { create } from "zustand";
import type { GameTerminatedType } from "../types";

type modalsState = {
  gameTerminateModal: boolean;
  gameTerminateData: GameTerminatedType | undefined;
  gameResult: boolean;
  setGameTerminateModal: (newValue: boolean) => void;
  setGameResult: (newValue: boolean) => void;
  setGameTerminateData: (newValue: GameTerminatedType | undefined) => void;
};

export const useModalsStore = create<modalsState>((set) => ({
  gameTerminateModal: false,
  gameTerminateData: undefined,
  gameResult: false,
  setGameTerminateModal: (newValue) => set({ gameTerminateModal: newValue }),
  setGameResult: (newValue) => {
    set({ gameResult: newValue });
  },
  setGameTerminateData: (newValue) => set({ gameTerminateData: newValue }),
}));

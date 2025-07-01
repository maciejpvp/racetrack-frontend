import { create } from "zustand";

type modalsState = {
  gameTerminateModal: boolean;
  gameResult: boolean;
  setGameTerminateModal: (newValue: boolean) => void;
  setGameResult: (newValue: boolean) => void;
};

export const useModalsStore = create<modalsState>((set) => ({
  gameTerminateModal: false,
  gameResult: false,
  setGameTerminateModal: (newValue) => set({ gameTerminateModal: newValue }),
  setGameResult: (newValue) => {
    set({ gameResult: newValue });
    console.log(newValue);
  },
}));

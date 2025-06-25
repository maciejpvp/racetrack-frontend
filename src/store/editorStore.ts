import { create } from "zustand";
import type { Vec2 } from "../types";

interface editorState {
  path: Vec2[];
  resetPath: () => void;
  addCord: (cord: Vec2) => void;
  printPath: () => Vec2[];
}

export const useEditorStore = create<editorState>((set, get) => ({
  path: [],
  resetPath: () => set({ path: [] }),
  addCord: (cord) => {
    set({ path: [...get().path, cord] });
  },
  printPath: () => get().path,
}));

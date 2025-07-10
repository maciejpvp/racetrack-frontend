import { create } from "zustand";
import type { Vec2 } from "../types";

type recordState = {
  path: Vec2[];
  addToPath: (vec2: Vec2) => void;
  result: () => Vec2[];
};

export const useRecordStore = create<recordState>((set, get) => ({
  path: [],
  addToPath: (vec2) => {
    const path = get().path;
    const newPath = [...path, vec2];
    set({ path: newPath });
  },
  result: () => {
    const path = get().path;
    console.log(path);
    return path;
  },
}));

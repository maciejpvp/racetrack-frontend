import { GRID_SIZE } from "../constants";
import { drawTrackHelper } from "../utils/drawTrackHelper";

export const First = {
  name: "First",
  outerBoundary: [
    {
      x: 33,
      y: 11,
    },
    {
      x: 25,
      y: 12,
    },
    {
      x: 23,
      y: 14,
    },
    {
      x: 20,
      y: 17,
    },
    {
      x: 18,
      y: 20,
    },
    {
      x: 18,
      y: 23,
    },
    {
      x: 17,
      y: 26,
    },
    {
      x: 16,
      y: 29,
    },
    {
      x: 14,
      y: 31,
    },
    {
      x: 13,
      y: 33,
    },
    {
      x: 12,
      y: 35,
    },
    {
      x: 11,
      y: 37,
    },
    {
      x: 11,
      y: 40,
    },
    {
      x: 13,
      y: 42,
    },
    {
      x: 16,
      y: 43,
    },
    {
      x: 20,
      y: 45,
    },
    {
      x: 24,
      y: 46,
    },
    {
      x: 28,
      y: 46,
    },
    {
      x: 32,
      y: 46,
    },
    {
      x: 32,
      y: 46,
    },
    {
      x: 32,
      y: 43,
    },
    {
      x: 33,
      y: 39,
    },
    {
      x: 34,
      y: 37,
    },
    {
      x: 36,
      y: 34,
    },
    {
      x: 37,
      y: 33,
    },
    {
      x: 39,
      y: 35,
    },
    {
      x: 40,
      y: 37,
    },
    {
      x: 40,
      y: 40,
    },
    {
      x: 40,
      y: 43,
    },
    {
      x: 41,
      y: 45,
    },
    {
      x: 43,
      y: 46,
    },
    {
      x: 45,
      y: 45,
    },
    {
      x: 47,
      y: 45,
    },
    {
      x: 49,
      y: 42,
    },
    {
      x: 50,
      y: 39,
    },
    {
      x: 50,
      y: 36,
    },
    {
      x: 50,
      y: 33,
    },
    {
      x: 50,
      y: 31,
    },
    {
      x: 50,
      y: 27,
    },
    {
      x: 50,
      y: 24,
    },
    {
      x: 50,
      y: 22,
    },
    {
      x: 50,
      y: 20,
    },
    {
      x: 48,
      y: 17,
    },
    {
      x: 46,
      y: 15,
    },
    {
      x: 43,
      y: 14,
    },
    {
      x: 38,
      y: 12,
    },
    {
      x: 33,
      y: 11,
    },
  ],
  innerBoundary: [
    {
      x: 40,
      y: 18,
    },
    {
      x: 43,
      y: 20,
    },
    {
      x: 45,
      y: 23,
    },
    {
      x: 46,
      y: 27,
    },
    {
      x: 47,
      y: 32,
    },
    {
      x: 47,
      y: 35,
    },
    {
      x: 47,
      y: 37,
    },
    {
      x: 47,
      y: 38,
    },
    {
      x: 45,
      y: 37,
    },
    {
      x: 44,
      y: 34,
    },
    {
      x: 44,
      y: 32,
    },
    {
      x: 41,
      y: 30,
    },
    {
      x: 35,
      y: 30,
    },
    {
      x: 34,
      y: 31,
    },
    {
      x: 32,
      y: 32,
    },
    {
      x: 32,
      y: 33,
    },
    {
      x: 30,
      y: 35,
    },
    {
      x: 27,
      y: 38,
    },
    {
      x: 24,
      y: 38,
    },
    {
      x: 22,
      y: 36,
    },
    {
      x: 21,
      y: 35,
    },
    {
      x: 21,
      y: 34,
    },
    {
      x: 21,
      y: 32,
    },
    {
      x: 21,
      y: 27,
    },
    {
      x: 22,
      y: 23,
    },
    {
      x: 24,
      y: 21,
    },
    {
      x: 25,
      y: 20,
    },
    {
      x: 27,
      y: 18,
    },
    {
      x: 32,
      y: 17,
    },
    {
      x: 37,
      y: 17,
    },
    {
      x: 40,
      y: 18,
    },
  ],
  startPosition: {
    x: 24,
    y: 42,
  },
  checkpoints: [
    {
      a: {
        x: 24,
        y: 34,
      },
      b: {
        x: 14,
        y: 45,
      },
    },
    {
      a: {
        x: 12,
        y: 24,
      },
      b: {
        x: 26,
        y: 26,
      },
    },
    {
      a: {
        x: 38,
        y: 6,
      },
      b: {
        x: 35,
        y: 22,
      },
    },
    {
      a: {
        x: 44,
        y: 30,
      },
      b: {
        x: 38,
        y: 38,
      },
    },
    {
      a: {
        x: 28,
        y: 30,
      },
      b: {
        x: 35,
        y: 43,
      },
    },
  ],
  finish: {
    a: {
      x: 27,
      y: 36,
    },
    b: {
      x: 27,
      y: 49,
    },
  },
};

export const drawTrack = (ctx: CanvasRenderingContext2D) => {
  // EXAMPLE MAP GENARATION!!!
  //   const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  //   <path style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);" d="M 386.188 412.155 L 270.166 433.702 L 107.735 390.055 L 51.381 293.37 L 29.282 159.116 L 85.083 67.403 L 277.901 71.271 L 408.84 143.094 L 427.624 237.569 L 386.188 412.155 Z"/>
  //   <path style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);" d="M 365.746 333.149 L 309.945 383.978 L 165.193 366.851 L 96.133 305.525 L 100.552 203.867 L 102.21 131.492 L 192.265 105.525 L 311.05 134.254 L 369.061 198.895 L 368.508 271.823 L 365.746 333.149 Z"/>
  // </svg>`;
  //   console.log("Map Array: ", mapGenerator(svg));
  //   console.log("123123");

  drawTrackHelper(ctx, First.innerBoundary, "black", GRID_SIZE, 10);
  drawTrackHelper(ctx, First.outerBoundary, "black", GRID_SIZE, 10);
};

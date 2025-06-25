import React, { useEffect, useRef, useState } from "react";
import { getAvailableMoves } from "./utils/getAvailableMoves";
import { drawGame } from "./utils/drawGame";
import { GRID_SIZE } from "./constants";
import type { Vec2 } from "./types";
import { useSocketStore, type PlayerMovedData } from "./store/socketStore";
import { useGameStore } from "./store/gameStore";

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameData = useGameStore((store) => store.gameData);

  const [playerPos, setPlayerPos] = useState<Vec2>({ x: 25, y: 5 });
  const [playerVelocity, setPlayerVelocity] = useState<Vec2>({ x: 0, y: 0 });
  const [path, setPath] = useState<Vec2[]>([{ x: 25, y: 5 }]);

  console.log(gameData?.players);

  const socket = useSocketStore((store) => store.socket);

  const handleMove = (newPos: Vec2) => {
    if (!socket) return;

    console.log(newPos);
    socket.emit("move-player", { newPos, roomId: "1" });
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const validMoves = getAvailableMoves(playerPos, playerVelocity);

    const clicked = validMoves.find((pos) => {
      const nodeX = pos.x * GRID_SIZE;
      const nodeY = pos.y * GRID_SIZE;
      const dist = Math.hypot(nodeX - clickX, nodeY - clickY);
      return dist < 10;
    });

    if (clicked) {
      handleMove(clicked);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handler = (data: PlayerMovedData) => {
      console.log(data);
      setPlayerPos(data.newPos);
      setPlayerVelocity(data.newVelocity);
      setPath((prev) => [...prev, data.newPos]);
    };
    socket.on("player-moved", handler);
    return () => {
      socket.off("player-moved", handler);
    };
  }, [socket]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const available = getAvailableMoves(playerPos, playerVelocity);
    drawGame(ctx, width, height, playerPos, path, available);
  }, [playerPos, path, playerVelocity]);

  useEffect(() => {
    if (!socket) return;
  }, [socket]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ display: "block" }}
      />
    </div>
  );
};

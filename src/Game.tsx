import React, { useEffect, useRef, useState } from "react";
import { getAvailableMoves } from "./utils/getAvailableMoves";
import { drawGame } from "./utils/drawGame";
import { GRID_SIZE } from "./constants";
import type { PlayerType, Vec2 } from "./types";
import { useSocketStore, type PlayerMovedData } from "./store/socketStore";
import { useGameStore } from "./store/gameStore";
import { useEditorStore } from "./store/editorStore";
import { isOnTrack } from "./utils/isOnTrack";
import { first } from "./maps/donut";

const EDITOR_MODE = false;

export const Game: React.FC = () => {
  const socket = useSocketStore((store) => store.socket);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameData = useGameStore((store) => store.gameData);

  const players = gameData?.players || [];

  const addEditorCord = useEditorStore((store) => store.addCord);

  const [localPlayer, setLocalPlayer] = useState(() => {
    const found = players.find((p) => p.id === socket?.id);
    return found ? { ...found, path: [found.position] } : null;
  });

  const [otherPlayers, setOtherPlayer] = useState<PlayerType[]>(
    players
      .filter((player) => player.id !== socket?.id)
      .map((p) => {
        return {
          ...p,
          path: [p.position],
        };
      }),
  );

  const handleMove = (newPos: Vec2) => {
    if (!socket) return;

    socket.emit("move-player", { newPos, roomId: gameData?.id ?? "" });
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !localPlayer) return;

    const rect = canvas.getBoundingClientRect();
    const rawClickX = e.clientX - rect.left;
    const rawClickY = e.clientY - rect.top;

    const offsetX =
      canvas.width / 2 - localPlayer.position.x * GRID_SIZE - GRID_SIZE / 2;
    const offsetY =
      canvas.height / 2 - localPlayer.position.y * GRID_SIZE - GRID_SIZE / 2;

    const clickX = rawClickX - offsetX;
    const clickY = rawClickY - offsetY;

    const validMoves = getAvailableMoves(
      localPlayer.position,
      localPlayer.velocity,
    );

    let clicked;
    if (!EDITOR_MODE) {
      clicked = validMoves.find((pos) => {
        const nodeX = pos.x * GRID_SIZE + GRID_SIZE / 2;
        const nodeY = pos.y * GRID_SIZE + GRID_SIZE / 2;
        const dist = Math.hypot(nodeX - clickX, nodeY - clickY);
        return dist < 10;
      });
    } else {
      const tileX = Math.floor(clickX / GRID_SIZE);
      const tileY = Math.floor(clickY / GRID_SIZE);
      clicked = { x: tileX, y: tileY };
    }

    if (clicked) {
      console.log(isOnTrack(clicked, first));
      handleMove(clicked);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handler = (data: PlayerMovedData) => {
      if (data.playerId === socket.id) {
        setLocalPlayer((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            position: data.newPos,
            velocity: data.newVelocity,
            path: prev.path ? [...prev.path, data.newPos] : [data.newPos],
          };
        });
        addEditorCord(data.newPos);
      } else {
        setOtherPlayer((prev) =>
          prev.map((player) => {
            if (player.id !== data.playerId) return player;
            return {
              ...player,
              position: data.newPos,
              velocity: data.newVelocity,
              path: player.path ? [...player.path, data.newPos] : [data.newPos],
            };
          }),
        );
      }
    };
    socket.on("player-moved", handler);
    return () => {
      socket.off("player-moved", handler);
    };
  }, [socket, otherPlayers, addEditorCord]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !localPlayer) return;
    // canvas.width = GRID_COLS * GRID_SIZE;
    // canvas.height = GRID_ROWS * GRID_SIZE;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const available = getAvailableMoves(
      localPlayer.position,
      localPlayer.velocity,
    );

    drawGame(ctx, width, height, localPlayer, available, otherPlayers);
  }, [localPlayer, otherPlayers]);

  useEffect(() => {
    if (!socket) return;
  }, [socket]);

  return (
    <div className="bg-zinc-200">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ display: "block" }}
      />
    </div>
  );
};

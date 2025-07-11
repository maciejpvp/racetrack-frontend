import React, { useEffect, useRef, useState } from "react";
import { getAvailableMoves } from "./utils/getAvailableMoves";
import { drawGame } from "./utils/drawGame";
import { GRID_SIZE } from "./constants";
import type {
  GameFinishedType,
  MapType,
  PlayerType,
  SkippedType,
  Vec2,
  WarningType,
} from "./types";
import { useSocketStore, type PlayerMovedData } from "./store/socketStore";
import { useGameStore } from "./store/gameStore";
import { isOnTrack } from "./utils/isOnTrack";
import { Overlay } from "./Overlay";
import { useModalsStore } from "./store/modalsStore";
import { audioManager } from "./utils/audioManager";
import { useRecordStore } from "./store/recordStore";

const EDITOR_MODE = false;

type Props = {
  map: MapType;
};

export const Game = ({ map }: Props) => {
  const socket = useSocketStore((store) => store.socket);
  const isYourTurn = useGameStore((store) => store.isYourTurn);
  const setIsYourTurn = useGameStore((store) => store.setIsYourTurn);
  const setGameData = useGameStore((store) => store.setGameData);
  const setFinishLeaderboard = useGameStore((store) => store.setLeaderboard);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameData = useGameStore((store) => store.gameData);
  const setPunishment = useGameStore((store) => store.setPunishment);
  const setDidYouWin = useGameStore((store) => store.setDidYouWin);
  const setGameResultModal = useModalsStore((store) => store.setGameResult);
  const addToRecordPath = useRecordStore((store) => store.addToPath);
  const [isPlayerOnTrack, setIsPlayerOnTrack] = useState<boolean>(true);

  const players = gameData?.players || [];

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

  const [leaderboard, setLeaderboard] = useState<PlayerType[]>([]);

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
        return dist < 30;
      });
    } else {
      const tileX = Math.floor(clickX / GRID_SIZE);
      const tileY = Math.floor(clickY / GRID_SIZE);
      clicked = { x: tileX, y: tileY };
    }

    if (!clicked) return;

    //Check Other Players Collisons
    const doesCollide = otherPlayers.some(
      (p) => p.position.x === clicked.x && p.position.y === clicked.y,
    );

    if (doesCollide) return;

    handleMove(clicked);
    addToRecordPath(clicked);

    audioManager.play("move");
    setIsPlayerOnTrack(isOnTrack(clicked, map));
  };

  useEffect(() => {
    if (!socket) return;

    const handler = (data: PlayerMovedData) => {
      setIsYourTurn(data.playerTurn === socket.id ? true : false);
      setLeaderboard(data.leaderboard);

      if (data.playerId === socket.id) {
        setLocalPlayer((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            position: data.newPos,
            velocity: data.newVelocity,
            path: prev.path
              ? [...prev.path, data.newPos].slice(-10)
              : [data.newPos],
          };
        });
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
    const GameFinishedHandler = (data: GameFinishedType) => {
      audioManager.play("win");

      setFinishLeaderboard(data.leaderboard);

      setGameData(undefined);
      setGameResultModal(true);
    };

    socket.on("player-moved", handler);
    socket.on("game-finished", GameFinishedHandler);
    return () => {
      socket.off("player-moved", handler);
      socket.off("game-finished", GameFinishedHandler);
    };
  }, [
    socket,
    otherPlayers,
    setIsYourTurn,
    setDidYouWin,
    setGameResultModal,
    setGameData,
    setFinishLeaderboard,
  ]);

  useEffect(() => {
    let animationFrameId = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas || !localPlayer) return;

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

      drawGame(
        ctx,
        width,
        height,
        localPlayer,
        available,
        otherPlayers,
        isYourTurn,
        map,
      );

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [localPlayer, otherPlayers, isYourTurn, map]);

  useEffect(() => {
    if (!socket) return;
    const handler = (data: WarningType) => {
      setPunishment(data.punishment);
    };

    socket.on("warning", handler);
    return () => {
      socket.off("warning", handler);
    };
  }, [socket, setPunishment]);

  useEffect(() => {
    if (!socket) return;
    const handler = (data: SkippedType) => {
      setPunishment(data.remaining);
    };

    socket.on("skipped", handler);
    return () => {
      socket.off("skipped", handler);
    };
  }, [socket, setPunishment]);

  useEffect(() => {
    if (!socket) return;
    const handler = () => {
      setPunishment(0);
    };

    socket.on("punishment-ended", handler);
    return () => {
      socket.off("punishment-ended", handler);
    };
  }, [socket, setPunishment]);

  return (
    <div className="bg-zinc-300">
      <Overlay
        isPlayerOnTrack={isPlayerOnTrack}
        place={1}
        leaderboard={leaderboard}
      />
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ display: "block" }}
      />
    </div>
  );
};

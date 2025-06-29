import React, { useEffect, useRef, useState } from "react";
import { getAvailableMoves } from "./utils/getAvailableMoves";
import { drawGame } from "./utils/drawGame";
import { GRID_SIZE } from "./constants";
import type { MapType, PlayerType, PlayerWonType, Vec2 } from "./types";
import { useSocketStore, type PlayerMovedData } from "./store/socketStore";
import { useGameStore } from "./store/gameStore";
import { isOnTrack } from "./utils/isOnTrack";
import { checkCheckpointProgress } from "./utils/checkIntersect";
import { Overlay } from "./Overlay";
import { useModalsStore } from "./store/modalsStore";

const EDITOR_MODE = false;
let finished = false;

type Props = {
  map: MapType;
};

export const Game = ({ map }: Props) => {
  const socket = useSocketStore((store) => store.socket);
  const isYourTurn = useGameStore((store) => store.isYourTurn);
  const setIsYourTurn = useGameStore((store) => store.setIsYourTurn);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameData = useGameStore((store) => store.gameData);
  const setDidYouWin = useGameStore((store) => store.setDidYouWin);
  const setGameResultModal = useModalsStore((store) => store.setGameResult);
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

    if (clicked) {
      handleMove(clicked);
      setIsPlayerOnTrack(isOnTrack(clicked, map));
      ///////////
      const { checkpointIndex: newIndex, finished: isFinished } =
        checkCheckpointProgress(
          localPlayer.position,
          clicked,
          map.checkpoints,
          map.finish,
          localPlayer.checkpointIndex,
        );

      console.log({ newIndex });

      setLocalPlayer((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          checkpointIndex: newIndex,
        };
      });

      console.log(localPlayer.checkpointIndex);
      finished = isFinished;

      if (finished) {
        console.log("🏁 Wyścig ukończony!");
      }
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handler = (data: PlayerMovedData) => {
      console.log(data);
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
    const PlayerWonHandler = (data: PlayerWonType) => {
      const didYouWin = data.playerId === socket.id ? true : false;

      setDidYouWin(didYouWin);
      setGameResultModal(true);
    };

    socket.on("player-moved", handler);
    socket.on("player-won", PlayerWonHandler);
    return () => {
      socket.off("player-moved", handler);
      socket.off("player-won", PlayerWonHandler);
    };
  }, [socket, otherPlayers, setIsYourTurn, setDidYouWin, setGameResultModal]);

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

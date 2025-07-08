import { useCallback, useEffect, useState } from "react";
import { useSocketStore } from "./store/socketStore";
import { Game } from "./Game";
import { useGameStore } from "./store/gameStore";
import { MainMenu } from "./MainMenu";
import type { GameDataType, GameTerminatedType, MapType } from "./types";
import { useModalsStore } from "./store/modalsStore";

export const App = () => {
  const connect = useSocketStore((store) => store.connect);
  const socket = useSocketStore((store) => store.socket);
  const isInGame = useGameStore((store) => store.isInGame);
  const setInGame = useGameStore((store) => store.setIsInGame);
  const setGameData = useGameStore((store) => store.setGameData);
  const gameData = useGameStore((store) => store.gameData);
  const setIsYourTurn = useGameStore((store) => store.setIsYourTurn);
  const setIsOpenGameTerminate = useModalsStore(
    (store) => store.setGameTerminateModal,
  );
  const setGameTerminateData = useModalsStore(
    (store) => store.setGameTerminateData,
  );

  const [map, setMap] = useState<MapType>();

  const fetchMap = useCallback(
    async (index: number) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/maps/${index}`,
      );
      if (!response.ok) return;

      const data = await response.json();
      setMap(data.map);
      setInGame(true);
    },
    [setInGame, setMap],
  );

  useEffect(() => {
    connect();

    if (!socket) return;

    const handleGameFound = (data: GameDataType) => {
      fetchMap(data.mapIndex);
      setGameData(data);
      setIsYourTurn(data.playerTurn === socket.id ? true : false);
    };

    const handleGameTerminated = (data: GameTerminatedType) => {
      if (gameData?.id === data.roomId) {
        setGameTerminateData(data);
        setInGame(false);
        setMap(undefined);
        setIsOpenGameTerminate(true);
      }
    };

    socket.on("game-found", handleGameFound);
    socket.on("game-terminated", handleGameTerminated);

    return () => {
      socket.off("game-found", handleGameFound);
      socket.off("game-terminated", handleGameTerminated);
    };
  }, [
    connect,
    socket,
    fetchMap,
    setGameData,
    setIsYourTurn,
    setInGame,
    setIsOpenGameTerminate,
    gameData,
    setGameTerminateData,
  ]);

  return <>{isInGame && map ? <Game map={map} /> : <MainMenu />}</>;
};

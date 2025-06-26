import { useEffect } from "react";
import { useSocketStore } from "./store/socketStore";
import { Game } from "./Game";
import { useGameStore } from "./store/gameStore";
import { MainMenu } from "./MainMenu";

export const App = () => {
  const connect = useSocketStore((store) => store.connect);
  const socket = useSocketStore((store) => store.socket);
  const isInGame = useGameStore((store) => store.isInGame);
  const setInGame = useGameStore((store) => store.setIsInGame);
  const setGameData = useGameStore((store) => store.setGameData);

  useEffect(() => {
    connect();

    if (!socket) return;
    socket.on("game-found", (data) => {
      setInGame(true);
      setGameData(data);
    });
  }, [connect, socket, setInGame, setGameData]);

  return <>{isInGame ? <Game /> : <MainMenu />}</>;
};

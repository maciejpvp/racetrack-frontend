import React from "react";
import { useModalsStore } from "../store/modalsStore";
import { useGameStore } from "../store/gameStore";
import { useSocketStore } from "../store/socketStore";

export const GameResultModal: React.FC = () => {
  const isOpen = useModalsStore((store) => store.gameResult);
  const setIsOpen = useModalsStore((store) => store.setGameResult);
  const setIsInGame = useGameStore((store) => store.setIsInGame);
  const leaderboard = useGameStore((store) => store.leaderboard);
  const socket = useSocketStore((store) => store.socket);

  console.log(leaderboard);

  const handleClose = () => {
    setIsOpen(false);
    setIsInGame(false);
    socket?.emit("leave-lobby");
    setTimeout(() => {
      document.getElementById("JoinQueue")?.click();
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="relative p-6 w-[90%] max-w-md bg-white rounded-xl border-4 border-yellow-700 shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-2 right-4 text-3xl text-red-600 hover:text-red-800"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-4xl text-center font-bold text-yellow-800 mb-4">
          🏁 Leaderboard
        </h2>

        <ul className="space-y-2 text-lg text-center">
          {leaderboard.map((player, index) => (
            <li key={index} className="flex justify-between px-4">
              <div className="flex flex-row gap-1">
                <span>{index + 1}. </span>
                {player.socketId === socket?.id ? (
                  <div className="flex flex-row gap-2">
                    <span>{player.username}</span>{" "}
                    <span className="bg-gradient-to-r from-yellow-600  to-yellow-800 bg-clip-text text-transparent font-semibold">
                      (You)
                    </span>
                  </div>
                ) : (
                  <span>{player.username}</span>
                )}
              </div>
              <span>{player.movesUsed} moves</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-yellow-100 border-2 border-yellow-700 rounded-lg hover:bg-yellow-200 transition pointer-events-auto"
          >
            🔁 Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

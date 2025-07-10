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
              <span>{player.username}</span>
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

import React from "react";
import { useModalsStore } from "../store/modalsStore";
import { useGameStore } from "../store/gameStore";
import { useSocketStore } from "../store/socketStore";

export const GameResultModal: React.FC = () => {
  const isOpen = useModalsStore((store) => store.gameResult);
  const setIsOpen = useModalsStore((store) => store.setGameResult);
  const setIsInGame = useGameStore((store) => store.setIsInGame);
  const isWin = useGameStore((store) => store.didYouWin);
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

  const title = isWin ? "🎉 You Crushed It!" : "💥 Oof. You Lost!";

  const message = isWin
    ? "You crossed the finish line like a pro. 🏁"
    : "C’mon, we both know you can do better. 👀";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        className="relative p-8 w-[90%] max-w-md rounded-xl shadow-xl text-blue-900 font-handwritten border-4 border-blue-800"
        style={{
          backgroundImage:
            "repeating-linear-gradient(white, white 24px, #d3d3d3 25px)",
          border: "1px solid #ccc",
          transform: "rotate(-2deg)",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-4 text-3xl text-red-500 hover:text-red-700"
        >
          ×
        </button>

        <h2
          className={`text-5xl text-center mb-4 ${
            isWin ? "text-green-600" : "text-red-600"
          }`}
        >
          {title}
        </h2>

        <p className="text-xl text-center mb-8">{message}</p>

        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className={`pointer-events-auto px-6 py-3 bg-white border-4 ${isWin ? "border-green-600" : "border-red-600"}  rounded-lg text-xl tracking-wide hover:shadow-[1px_1px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-150`}
          >
            🔁 Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

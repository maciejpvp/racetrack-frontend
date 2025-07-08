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
        className="relative p-8 w-[90%] max-w-md rounded-xl shadow-xl text-yellow-900 font-handwritten border-4 border-yellow-700"
        style={{
          backgroundImage:
            "repeating-linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 2px, transparent 25px)",
          backgroundSize: "100% 25px",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
          border: "1px solid #d97706",
          backgroundColor: "#fffbea",
          transform: "rotate(-2deg)",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-4 text-3xl text-red-600 hover:text-red-800"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2
          className={`text-5xl text-center mb-4 ${
            isWin ? "text-green-700" : "text-red-700"
          }`}
        >
          {title}
        </h2>

        <p className="text-xl text-center mb-8">{message}</p>

        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className={`pointer-events-auto px-6 py-3 bg-yellow-50 border-4 rounded-lg text-xl tracking-wide transition-all duration-150
              ${
                isWin
                  ? "border-green-700 hover:shadow-[1px_1px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px]"
                  : "border-red-700 hover:shadow-[1px_1px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px]"
              }`}
          >
            🔁 Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useModalsStore } from "../store/modalsStore";
import { useSocketStore } from "../store/socketStore";

export const GameTerminatedModal: React.FC = () => {
  const isOpen = useModalsStore((store) => store.gameTerminateModal);
  const setIsOpen = useModalsStore((store) => store.setGameTerminateModal);
  const socketId = useSocketStore((store) => store.socket?.id);
  const data = useModalsStore((store) => store.gameTerminateData);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const wasKicked = data?.reason === "kick" && data?.playerId === socketId;
  const otherWasKicked = data?.reason === "kick" && data?.playerId !== socketId;

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

        <h2 className="text-4xl text-center mb-4">
          {wasKicked
            ? "🚫 Removed from Game"
            : otherWasKicked
              ? "🚫 Player Removed"
              : "🛑 Game Terminated"}
        </h2>

        <p className="text-xl text-center mb-8">
          {wasKicked
            ? "You have been removed for breaking the rules."
            : otherWasKicked
              ? "The other player was removed from the game for violating the rules."
              : "The other player has disconnected."}
        </p>
      </div>
    </div>
  );
};

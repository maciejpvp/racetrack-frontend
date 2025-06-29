import React from "react";
import { useModalsStore } from "../store/modalsStore";

export const GameTerminatedModal: React.FC = () => {
  const isOpen = useModalsStore((store) => store.gameTerminateModal);
  const setIsOpen = useModalsStore((store) => store.setGameTerminateModal);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

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

        <h2 className="text-4xl text-center mb-4">🛑 Game Terminated</h2>

        <p className="text-xl text-center mb-8">
          The other player has disconnected. 😞
        </p>
      </div>
    </div>
  );
};

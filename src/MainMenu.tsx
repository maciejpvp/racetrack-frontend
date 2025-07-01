import { useState } from "react";
import { useSocketStore } from "./store/socketStore";
import { GameTerminatedModal } from "./Modals/GameTerminatedModal";

export const MainMenu = () => {
  const socket = useSocketStore((store) => store.socket);
  const [joinedQueue, setJoinedQueue] = useState(false);

  const joinQueue = () => {
    if (!socket) return;
    socket.emit("join-queue", (response) => {
      console.log(response);
      setJoinedQueue(true);
    });
  };

  return (
    <div className="bg-[url('/paper-texture.png')] bg-cover h-dvh w-full flex flex-col items-center justify-center text-blue-900 font-handwritten bg-zinc-200">
      <h1 className="text-6xl mb-8 drop-shadow-sm text-center">✏️ PaperRace</h1>

      <p className="mb-12 text-xl text-center max-w-md">
        🏁 Get to the finish line in as few moves as possible. 🧠 Think ahead,
        or you'll crash. 💥
      </p>

      <button
        id="JoinQueue"
        onClick={joinQueue}
        disabled={joinedQueue}
        className={`px-10 py-4 border-4 rounded-lg text-2xl tracking-wider transition-all duration-200
          ${
            joinedQueue
              ? "bg-gray-300 border-gray-500 text-gray-600 cursor-not-allowed"
              : "bg-white border-blue-700 hover:shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px]"
          }`}
      >
        {joinedQueue ? "Drawing Track…" : "🕹️ Join Race"}
      </button>

      <GameTerminatedModal />
    </div>
  );
};

import { useState } from "react";
import { useSocketStore } from "./store/socketStore";
import { GameTerminatedModal } from "./Modals/GameTerminatedModal";
import { motion } from "framer-motion";
import { Username } from "./MainMenu/Username";

const generateUsername = () => {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `guest-${randomPart}`;
};

export const MainMenu = () => {
  const socket = useSocketStore((store) => store.socket);
  const [joinedQueue, setJoinedQueue] = useState(false);
  const [username, setUsername] = useState<string>(() => generateUsername());
  const [singleplayer] = useState<boolean>(false);

  const joinQueue = () => {
    if (!socket) return;

    socket.emit("join-queue", { username, singleplayer }, () => {
      setJoinedQueue(true);
    });
  };

  return (
    <div className="bg-yellow-100 h-dvh w-full flex items-center justify-center text-yellow-900 font-handwritten px-4">
      <Username value={username} setValue={setUsername} />
      <motion.div
        initial={{ rotate: -2, scale: 0.95, opacity: 0 }}
        animate={{ rotate: -0.4, scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative p-8 w-[90%] max-w-xl rounded-xl shadow-xl border-4 border-yellow-700 text-yellow-900"
        style={{
          backgroundImage:
            "repeating-linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 2px, transparent 25px)",
          backgroundSize: "100% 25px",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
          border: "1px solid #d97706",
          backgroundColor: "#fffbea",
        }}
      >
        <h1 className="text-6xl text-center mb-6 drop-shadow-sm">
          📝 PaperRace
        </h1>

        <p className="text-xl text-center mb-8">
          🏁 Reach the finish line in the fewest moves possible. <br />
          🧠 Plan carefully, or you'll 💥 crash!
        </p>

        <div className="flex justify-center">
          <motion.button
            id="JoinQueue"
            onClick={joinQueue}
            disabled={joinedQueue}
            whileTap={{ scale: 0.95 }}
            whileHover={{
              x: joinedQueue ? 0 : -2,
              y: joinedQueue ? 0 : -2,
              boxShadow: joinedQueue ? "none" : "4px 4px 0px #78350f",
            }}
            className={`px-8 py-4 border-4 rounded-xl text-2xl tracking-wider font-bold transition-all duration-200
              ${
                joinedQueue
                  ? "bg-yellow-200 border-yellow-500 text-yellow-600 cursor-not-allowed"
                  : "bg-yellow-50 border-yellow-800 hover:shadow-[4px_4px_0_#78350f] hover:-translate-x-[2px] hover:-translate-y-[2px]"
              }`}
          >
            {joinedQueue ? "🖍️ Drawing Track…" : "🕹️ Join Race"}
          </motion.button>
        </div>
      </motion.div>

      <GameTerminatedModal />
    </div>
  );
};

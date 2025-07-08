import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PunishmentProps = {
  turns: number;
};

export const Punishment: React.FC<PunishmentProps> = ({ turns }) => {
  const [visible, setVisible] = useState(turns > 0);

  useEffect(() => {
    if (turns <= 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [turns]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-100 border-4 border-red-400 rounded-xl shadow-lg px-6 py-5 z-50"
        >
          <h2 className="text-5xl font-bold text-red-700 text-center drop-shadow-sm">
            ⚠️ Track Violation!
          </h2>

          <p className="text-xl text-red-600 text-center mt-3 font-semibold">
            You received a penalty for cutting the track.
          </p>

          <p className="text-lg text-red-500 text-center mt-2 italic">
            You'll be skipped for{" "}
            <span className="font-bold text-red-700">{turns}</span>{" "}
            {turns === 1 ? "turn" : "turns"}.
          </p>

          <p className="text-sm text-red-400 text-center mt-1">
            Stay on the correct path next time!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

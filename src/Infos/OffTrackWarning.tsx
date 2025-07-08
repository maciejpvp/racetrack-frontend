import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type OffTrackWarningProps = {
  isVisible: boolean;
};

export const OffTrackWarning: React.FC<OffTrackWarningProps> = ({
  isVisible,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-yellow-100 border-4 border-yellow-400 text-yellow-900 rounded-xl px-6 py-4 shadow-xl"
        >
          <h2 className="text-4xl font-bold text-center drop-shadow-sm">
            ⚠️ Get Back On Track!
          </h2>
          <p className="text-lg text-center mt-2 italic">
            You’re outside the race path. Hurry back!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

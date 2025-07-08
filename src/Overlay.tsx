import { OffTrackWarning } from "./Infos/OffTrackWarning";
import { Punishment } from "./Infos/Punishment";
import { GameResultModal } from "./Modals/GameResultModal";
import { useGameStore } from "./store/gameStore";
import { useSocketStore } from "./store/socketStore";
import { Timer } from "./Timer";
import type { PlayerType } from "./types";

type Props = {
  isPlayerOnTrack: boolean;
  place: number;
  leaderboard: PlayerType[];
};

const ordinalMap: Record<number, string> = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  4: "4th",
  5: "5th",
  6: "6th",
  7: "7th",
  8: "8th",
  9: "9th",
  10: "10th",
};

export const Overlay = ({ isPlayerOnTrack, leaderboard }: Props) => {
  const socket = useSocketStore((store) => store.socket);
  const playerIndex = leaderboard.findIndex((p) => p.id === socket?.id) + 1;
  const isYourTurn = useGameStore((store) => store.isYourTurn);

  return (
    <div className="font-handwriting    h-dvh w-dvw absolute pointer-events-none">
      <GameResultModal />

      <OffTrackWarning isVisible={!isPlayerOnTrack} />
      <Punishment turns={0} />
      <p className="text-zinc-800 absolute bottom-10 right-10 text-5xl">
        {ordinalMap[playerIndex]}
      </p>
      {isYourTurn && <Timer onFinish={() => {}} />}
    </div>
  );
};

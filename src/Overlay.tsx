import { OffTrackWarning } from "./Infos/OffTrackWarning";
import { Punishment } from "./Infos/Punishment";
import { GameResultModal } from "./Modals/GameResultModal";
import { useGameStore } from "./store/gameStore";
import { useRecordStore } from "./store/recordStore";
import { useSocketStore } from "./store/socketStore";
import { Timer } from "./Infos/Timer";
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
  const punishment = useGameStore((store) => store.punishment);
  const logPath = useRecordStore((store) => store.result);

  return (
    <div className="font-handwriting    h-dvh w-dvw absolute pointer-events-none">
      <GameResultModal />

      <OffTrackWarning isVisible={!isPlayerOnTrack} />
      <Punishment turns={punishment} />
      <p className="text-zinc-800 absolute bottom-10 right-10 text-5xl">
        {ordinalMap[playerIndex]}
      </p>
      {isYourTurn && <Timer onFinish={() => {}} />}
      <button className="pointer-events-auto" onClick={logPath}>
        RECORD
      </button>
    </div>
  );
};

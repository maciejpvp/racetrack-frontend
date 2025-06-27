import { useSocketStore } from "./store/socketStore";
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

export const Overlay = ({ isPlayerOnTrack, place, leaderboard }: Props) => {
  const socket = useSocketStore((store) => store.socket);
  const playerIndex = leaderboard.findIndex((p) => p.id === socket?.id) + 1;
  console.log(playerIndex);

  return (
    <div className="font-handwriting    h-dvh w-dvw absolute pointer-events-none">
      {!isPlayerOnTrack && (
        <div className="absolute bg-zinc-200 p-2 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className=" text-4xl">Get Back On Track!</p>
        </div>
      )}
      <p className="text-zinc-800 absolute bottom-10 right-10 text-5xl">
        {ordinalMap[playerIndex]}
      </p>
      <ul>
        {leaderboard.map((player) => (
          <li key={player.id}>{player.id}</li>
        ))}
      </ul>
    </div>
  );
};

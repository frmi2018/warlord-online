// src/components/BattleField.tsx
import React from "react";
import type { Dispatch, SetStateAction } from "react";
import styles from "./BattleField.module.css";
import PlayerZone from "./PlayerZone";

import type { Ranks, Card } from "../types/types";

interface BattleFieldProps {
  aiRanks: Ranks;
  aiVisibleRanks: { rank: Card[]; number: number }[];
  aiRankOffset: number;
  setAiRankOffset: Dispatch<SetStateAction<number>>;
  playerRanks: Ranks;
  playerVisibleRanks: { rank: Card[]; number: number }[];
  playerRankOffset: number;
  setPlayerRankOffset: Dispatch<SetStateAction<number>>;
  selectedRank: number | null;
  renderRank: (
    rank: Card[],
    number: number,
    isPlayer: boolean,
    isSelected: boolean,
  ) => React.ReactNode;
}

const Battlefield: React.FC<BattleFieldProps> = ({
  aiRanks,
  aiVisibleRanks,
  aiRankOffset,
  setAiRankOffset,
  playerRanks,
  playerVisibleRanks,
  playerRankOffset,
  setPlayerRankOffset,
  selectedRank,
  renderRank,
}) => {
  return (
    <div className={styles.battlefield}>
      {/* Section IA */}
      <PlayerZone
        title="IA"
        ranks={aiRanks}
        visibleRanks={[...aiVisibleRanks].reverse()}
        rankOffset={aiRankOffset}
        setRankOffset={setAiRankOffset}
        renderRank={renderRank}
        isPlayer={false}
        selectedRank={selectedRank}
      />

      {/* Section Joueur */}
      <PlayerZone
        title="JOUEUR"
        ranks={playerRanks}
        visibleRanks={playerVisibleRanks}
        rankOffset={playerRankOffset}
        setRankOffset={setPlayerRankOffset}
        renderRank={renderRank}
        isPlayer={true}
        selectedRank={selectedRank}
      />
    </div>
  );
};

export default Battlefield;

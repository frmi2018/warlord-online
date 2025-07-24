// src/components/BattleField.tsx
import React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useGameContext } from "../contexts/GameContext";
import type { Card } from "../types/types";

import PlayerZone from "./PlayerZone";

import styles from "./Battlefield.module.css";

interface BattleFieldProps {
  aiVisibleRanks: { rank: Card[]; number: number }[];
  aiRankOffset: number;
  setAiRankOffset: Dispatch<SetStateAction<number>>;
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
  aiVisibleRanks,
  aiRankOffset,
  setAiRankOffset,
  playerVisibleRanks,
  playerRankOffset,
  setPlayerRankOffset,
  selectedRank,
  renderRank,
}) => {
  const { playerRanks, aiRanks } = useGameContext();

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

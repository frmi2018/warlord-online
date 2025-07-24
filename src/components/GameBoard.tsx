// src\components\GameBoard.tsx

import React, { useState } from "react";

import GameZone from "./GameZone";
import HandDisplay from "./HandDisplay";
import GameRanks from "./GameRanks";
import SelectedCardDisplay from "./SelectedCardDisplay";

import styles from "./GameBoard.module.css";

const GameBoard: React.FC = () => {
  const [selectedRank, setSelectedRank] = useState<number>(1);
  const [aiRankOffset, setAiRankOffset] = useState<number>(0);
  const [playerRankOffset, setPlayerRankOffset] = useState<number>(0);

  return (
    <div className={styles.gameBoard}>
      <div className={styles.gamezone}>
        <GameZone />
      </div>

      <div className={styles.HandDisplay}>
        <div className={styles.handDisplayContainer}>
          <div className={styles.handDisplayItem}>
            <HandDisplay playerType="ai" title="Main de l'IA" />
          </div>
          <div className={styles.handDisplayItem}>
            <HandDisplay playerType="player" title="Votre main" />
          </div>
        </div>
      </div>

      <div className={styles.GameRanks}>
        <GameRanks
          selectedRank={selectedRank}
          setSelectedRank={setSelectedRank}
          aiRankOffset={aiRankOffset}
          setAiRankOffset={setAiRankOffset}
          playerRankOffset={playerRankOffset}
          setPlayerRankOffset={setPlayerRankOffset}
        />
      </div>

      <div className={styles.SelectedCardDisplay}>
        <SelectedCardDisplay />
      </div>
    </div>
  );
};

export default GameBoard;

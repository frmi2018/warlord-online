// src\components\GameBoard.tsx

import React, { useState } from "react";
import type {
  Ranks,
  Card,
  Phase,
  Turn,
  Action,
  ClickMode,
} from "../types/types";

import HandDisplay from "./HandDisplay";
import GameRanks from "./GameRanks";
import SelectedCardDisplay from "./SelectedCardDisplay";

import styles from "./GameBoard.module.css";
import GameZone from "./GameZone";

interface GameBoardProps {
  playerRanks: Ranks;
  aiRanks: Ranks;
  phase: Phase;
  turn: Turn;
  logs: string[];
  hand: Card[];
  aiHand: Card[];
  actions: Action[];
  actionsPlayer: number;
  actionsAi: number;
  hasStarted: boolean;
  selectedCardsForDiscard: Card[];
  selectedCards: Card[];
  selectedToDisplay: Card | null;
  clickMode: ClickMode;
  handleCardClick: (card: Card) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  playerRanks,
  aiRanks,
  phase,
  turn,
  logs,
  hand,
  aiHand,
  actions,
  actionsPlayer,
  actionsAi,
  hasStarted,
  selectedCardsForDiscard,
  selectedCards,
  selectedToDisplay,
  clickMode,
  handleCardClick,
}) => {
  const [selectedRank, setSelectedRank] = useState<number>(1);
  const [aiRankOffset, setAiRankOffset] = useState<number>(0);
  const [playerRankOffset, setPlayerRankOffset] = useState<number>(0);

  return (
    <div className={styles.gameBoard}>
      <div className={styles.gamezone}>
        <GameZone
          turn={turn}
          phase={phase}
          actionsPlayer={actionsPlayer}
          logs={logs}
          actions={actions}
          actionsAi={actionsAi}
          hasStarted={hasStarted}
        />
      </div>

      <div className={styles.HandDisplay}>
        <div className={styles.handDisplayContainer}>
          <div className={styles.handDisplayItem}>
            <HandDisplay
              hand={aiHand}
              title={"Main de AI"}
              selectedCards={selectedCards}
              selectedCardsForDiscard={selectedCardsForDiscard} // ✅ À ajouter
              clickMode={clickMode} // ✅ À ajouter
              handleCardClick={handleCardClick}
            />
          </div>
          <div className={styles.handDisplayItem}>
            <HandDisplay
              hand={hand}
              title={"Main du joueur"}
              selectedCards={selectedCards}
              selectedCardsForDiscard={selectedCardsForDiscard} // ✅ À ajouter
              clickMode={clickMode} // ✅ À ajouter
              handleCardClick={handleCardClick}
            />
          </div>
        </div>
      </div>

      <div className={styles.GameRanks}>
        <GameRanks
          aiRanks={aiRanks}
          playerRanks={playerRanks}
          selectedRank={selectedRank}
          setSelectedRank={setSelectedRank}
          aiRankOffset={aiRankOffset}
          setAiRankOffset={setAiRankOffset}
          playerRankOffset={playerRankOffset}
          setPlayerRankOffset={setPlayerRankOffset}
          handleCardClick={handleCardClick}
        />
      </div>

      <div className={styles.SelectedCardDisplay}>
        <SelectedCardDisplay
          emptyMessage={"Aucune carte sélectionnée"}
          selectedToDisplay={selectedToDisplay}
        />
      </div>
    </div>
  );
};

export default GameBoard;

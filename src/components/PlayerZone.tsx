// src/components/PlayerZone.tsx
import React from "react";
import { useGameContext } from "../contexts/GameContext";
import type { Dispatch, SetStateAction } from "react";
import styles from "./PlayerZone.module.css";
import type { Ranks, Card } from "../types/types";

import { D20 } from "./D20";

interface PlayerZoneProps {
  title: string;
  ranks: Ranks;
  visibleRanks: { rank: Card[]; number: number }[];
  rankOffset: number;
  setRankOffset: Dispatch<SetStateAction<number>>;
  renderRank: (
    rank: Card[],
    number: number,
    isPlayer: boolean,
    isSelected: boolean,
  ) => React.ReactNode;
  isPlayer: boolean;
  selectedRank: number | null;
}

const PlayerZone: React.FC<PlayerZoneProps> = ({
  title,
  ranks,
  visibleRanks,
  rankOffset,
  setRankOffset,
  renderRank,
  isPlayer,
  selectedRank,
}) => {
  const {
    playerDeck,
    aiDeck,
    playerDiscardPile,
    aiDiscardPile,
    playerDiceValue,
    aiDiceValue,
  } = useGameContext();
  return (
    <div className={styles.playerSection}>
      <div className={styles.zone}>
        <div className={styles.sectionLabel}>
          <h3>{title}</h3>
        </div>
        <div className={styles.rankNavigation}>
          <button
            className={styles.navArrow}
            onClick={() => setRankOffset(Math.max(0, rankOffset - 1))}
            disabled={rankOffset === 0}
          >
            ⬆️
          </button>

          {isPlayer ? (
            <D20 type={"normal"} value={playerDiceValue} size={80} />
          ) : (
            <D20 type={"normal"} value={aiDiceValue} size={80} />
          )}

          <button
            className={styles.navArrow}
            onClick={() => setRankOffset(rankOffset + 1)}
            disabled={ranks.length <= 4 + rankOffset}
          >
            ⬇️
          </button>
          <div className={styles.deckContainer}>
            <button className={styles.deck}>
              {isPlayer ? playerDeck.length : aiDeck.length}
            </button>

            <button className={styles.discard}>
              {isPlayer ? playerDiscardPile.length : aiDiscardPile.length}
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.ranksContainer}>
          {visibleRanks.map(({ rank, number }) =>
            renderRank(rank, number, isPlayer, selectedRank === number),
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerZone;

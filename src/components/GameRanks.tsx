// src/components/GameRanks.tsx
import type { Dispatch, SetStateAction } from "react";
import { useGameContext } from "../contexts/GameContext";
import type { Ranks, Card } from "../types/types";

import { Card as CardComponent } from "./Card";
import Battlefield from "./Battlefield";

import styles from "./GameRanks.module.css";

interface Props {
  selectedRank: number;
  setSelectedRank: Dispatch<SetStateAction<number>>;
  aiRankOffset: number;
  setAiRankOffset: Dispatch<SetStateAction<number>>;
  playerRankOffset: number;
  setPlayerRankOffset: Dispatch<SetStateAction<number>>;
}

export default function GameRanks({
  selectedRank,
  setSelectedRank,
  aiRankOffset,
  setAiRankOffset,
  playerRankOffset,
  setPlayerRankOffset,
}: Props) {
  const { playerRanks, aiRanks, handleCardClick } = useGameContext();
  const renderCard = (card: Card, isPlayer: boolean, isSelected: boolean) => {
    return (
      <div
        className={`${styles.cardSlot} ${
          !isSelected ? styles.compactCard : ""
        }`}
        key={card.id}
        style={{ cursor: isPlayer ? "pointer" : "default" }}
        onClick={() => handleCardClick(card)} // Ajouter le clic
      >
        <CardComponent card={card} />
      </div>
    );
  };

  const renderRank = (
    rank: Card[],
    rankNumber: number,
    isPlayer: boolean = false,
    isSelected: boolean = false,
  ) => {
    const visibleCards = rank.slice(0, 5);
    const hasMoreCards = rank.length > 5;

    return (
      <div
        className={`${styles.rankRow} ${
          isSelected ? styles.selectedRank : styles.compactRank
        }`}
        onClick={() => !isSelected && setSelectedRank(rankNumber)}
        key={`rank-${isPlayer ? "player" : "ai"}-${rankNumber}`}
      >
        <div className={styles.rankLabel}>
          <span>Rang {rankNumber}</span>
          {hasMoreCards && (
            <div className={styles.cardNavigation}>
              <button
                onClick={e => e.stopPropagation()}
                className={styles.navArrow}
              >
                ←
              </button>
              <button
                onClick={e => e.stopPropagation()}
                className={styles.navArrow}
              >
                →
              </button>
            </div>
          )}
        </div>

        <div className={styles.cardsContainer}>
          {visibleCards.map(card => renderCard(card, isPlayer, isSelected))}
          {Array.from({ length: 5 - visibleCards.length }, (_, i) => (
            <div
              key={`empty-${isPlayer ? "player" : "ai"}-${rankNumber}-${i}`}
              className={`${styles.emptySlot} ${
                isSelected ? "" : styles.compactCard
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const getVisibleRanks = (ranks: Ranks, offset: number) => {
    const maxVisible = 4;
    const startIndex = Math.max(0, ranks.length - maxVisible - offset);
    const endIndex = Math.min(ranks.length, startIndex + maxVisible);
    return ranks.slice(startIndex, endIndex).map((rank, i) => ({
      rank,
      number: startIndex + i + 1,
    }));
  };

  const aiVisibleRanks = getVisibleRanks(aiRanks, aiRankOffset);
  const playerVisibleRanks = getVisibleRanks(playerRanks, playerRankOffset);

  return (
    <Battlefield
      aiVisibleRanks={aiVisibleRanks}
      aiRankOffset={aiRankOffset}
      setAiRankOffset={setAiRankOffset}
      playerVisibleRanks={playerVisibleRanks}
      playerRankOffset={playerRankOffset}
      setPlayerRankOffset={setPlayerRankOffset}
      selectedRank={selectedRank}
      renderRank={renderRank}
    />
  );
}

// HandCardsStack.tsx - Correction
import React, { useEffect, useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import type { Card } from "../types/types";

import { Card as CardComponent } from "./Card";

import styles from "./HandCardsStack.module.css";

interface HandCardsStackProps {
  hand: Card[];
  stackOffset?: number;
}

const HandCardsStack: React.FC<HandCardsStackProps> = ({
  hand,
  stackOffset = 70,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const totalHeight =
        hand.length > 0 ? (hand.length - 1) * stackOffset + 70 : 0;
      containerRef.current.style.height = `${totalHeight}px`;
    }
  }, [hand, stackOffset]);

  const { clickMode, selectedCards, selectedCardsForDiscard, handleCardClick } =
    useGameContext();

  // ✅ Choisir les bonnes cartes sélectionnées selon le mode
  const isCardSelected = (card: Card): boolean => {
    const cardsToCheck =
      clickMode === "discard" ? selectedCardsForDiscard : selectedCards;

    return cardsToCheck.some(selectedCard => selectedCard.id === card.id);
  };

  return (
    <div className={styles.stackedCards} ref={containerRef}>
      {hand.map((card, index) => {
        // Créer une copie de la carte avec la propriété selected mise à jour
        const cardWithSelection: Card = {
          ...card,
          selected: isCardSelected(card),
        };

        return (
          <div
            key={card.id}
            className={`${styles.cardTopOnly}`}
            style={{
              top: `${index * stackOffset}px`,
            }}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              handleCardClick(card);
            }}
          >
            <CardComponent card={cardWithSelection} />
          </div>
        );
      })}
    </div>
  );
};

export default HandCardsStack;

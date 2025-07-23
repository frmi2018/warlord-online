// HandCardsStack.tsx - Retrait des props phase et clickMode
import React, { useEffect, useRef } from "react";
import styles from "./HandCardsStack.module.css";
import { Card as CardComponent } from "./Card";
import type { Card } from "../types/types";

interface HandCardsStackProps {
  hand: Card[];
  stackOffset?: number;
  selectedCards: Card[];
  handleCardClick: (card: Card) => void;
}

const HandCardsStack: React.FC<HandCardsStackProps> = ({
  hand,
  selectedCards,
  stackOffset = 70,
  handleCardClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const totalHeight =
        hand.length > 0 ? (hand.length - 1) * stackOffset + 70 : 0;
      containerRef.current.style.height = `${totalHeight}px`;
    }
  }, [hand, stackOffset]);

  // ✅ TODO résolu : vérifier si chaque carte est sélectionnée
  const isCardSelected = (card: Card): boolean => {
    return selectedCards.some(selectedCard => selectedCard.id === card.id);
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
              e.preventDefault(); // ❓ Pas vraiment nécessaire sur une div
              e.stopPropagation(); // ✅ Utile si vous avez des onClick sur les parents
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

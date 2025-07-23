// HandDisplay.tsx
import React from "react";
import styles from "./HandDisplay.module.css";
import HandCardsStack from "./HandCardsStack";
import type { Card } from "../types/types";

interface HandDisplayProps {
  hand: Card[];
  title?: string;
  emptyMessage?: string;
  selectedCards: Card[];
  handleCardClick: (card: Card) => void;
}

const HandDisplay: React.FC<HandDisplayProps> = ({
  hand,
  title,
  selectedCards,
  handleCardClick,
}) => {
  return (
    <div className={styles.handSection}>
      <h4>{title}</h4>
      <div className={styles.handCardsContainer}>
        <HandCardsStack
          hand={hand}
          selectedCards={selectedCards}
          handleCardClick={handleCardClick}
        />
      </div>
    </div>
  );
};

export default HandDisplay;

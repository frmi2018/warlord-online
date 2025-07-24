// src\components\SelectedCardDisplay.tsx
import React from "react";
import { useGameContext } from "../contexts/GameContext";

import { Card as CardComponent } from "./Card";

import styles from "./SelectedCardDisplay.module.css";

const SelectedCardDisplay: React.FC = () => {
  const { selectedToDisplay } = useGameContext();

  if (!selectedToDisplay) {
    return (
      <div className={styles.selectedCardDisplay}>
        <div className={styles.card}>
          <p>Aucune carte sélectionnée</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.selectedCardDisplay}>
      <CardComponent card={selectedToDisplay} />
    </div>
  );
};

export default SelectedCardDisplay;

// src/components/SelectedCardDisplay.tsx
import React from "react";
import { useGameContext } from "../contexts/GameContext";
import { Card } from "./Card";
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

  // Créer une copie de la carte sans la propriété selected
  // pour éviter la bordure jaune dans l'affichage grand format
  const cardForDisplay = {
    ...selectedToDisplay,
    selected: false, // Forcer selected à false
  };

  return (
    <div className={styles.selectedCardDisplay}>
      <Card card={cardForDisplay} />
    </div>
  );
};

export default SelectedCardDisplay;

// SelectedCardDisplay.tsx
import React from "react";
import { Card as CardComponent } from "./Card";
import type { Card } from "../types/types";
import styles from "./SelectedCardDisplay.module.css";

interface SelectedCardDisplayProps {
  emptyMessage?: string;
  selectedToDisplay: Card | null;
}

const SelectedCardDisplay: React.FC<SelectedCardDisplayProps> = ({
  emptyMessage = "Aucune carte sélectionnée",
  selectedToDisplay,
}) => {
  if (!selectedToDisplay) {
    return (
      <div className={styles.selectedCardDisplay}>
        <div className={styles.card}>
          <p>{emptyMessage}</p>
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

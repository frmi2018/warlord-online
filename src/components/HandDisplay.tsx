// HandDisplay.tsx - Correction
import React from "react";
import { useGameContext } from "../contexts/GameContext";
import HandCardsStack from "./HandCardsStack";
import styles from "./HandDisplay.module.css";

interface HandDisplayProps {
  playerType: "ai" | "player";
  title?: string;
}

const HandDisplay: React.FC<HandDisplayProps> = ({ playerType, title }) => {
  const { playerHand, aiHand } = useGameContext();

  const hand = playerType === "ai" ? aiHand : playerHand;

  return (
    <div className={styles.handSection}>
      <h4>{title}</h4>
      <div className={styles.handCardsContainer}>
        <HandCardsStack hand={hand} />
      </div>
    </div>
  );
};

export default HandDisplay;

import React from "react";
import { useGameContext } from "../contexts/GameContext";
import styles from "./ActionButtons.module.css";

const ActionButtons: React.FC = () => {
  const { actions } = useGameContext();

  return (
    <div className={styles.actionsSection}>
      <h4>Actions</h4>

      <div className={styles.actionsButtonsContainer}>
        {actions.map((action, index) => (
          <button
            key={index}
            className={styles.actionButton}
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;

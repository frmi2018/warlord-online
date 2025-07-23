import React from "react";
import styles from "./ActionButtons.module.css";

interface Action {
  label: React.ReactNode;
  onClick: () => void;
}

interface ActionButtonsProps {
  actions: Action[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ actions }) => {
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

// src/components/GameLog.tsx
import React from "react";
import styles from "./GameLog.module.css";

interface GameLogProps {
  lastFiveLogs: string[];
}

const GameLog: React.FC<GameLogProps> = ({ lastFiveLogs }) => {
  return (
    <div className={styles.logSection}>
      <h4>Log</h4>
      <div className={styles.logContent}>
        {[...lastFiveLogs].reverse().map((logEntry, index) => (
          <pre key={index} className={styles.logEntry}>
            {logEntry}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default GameLog;

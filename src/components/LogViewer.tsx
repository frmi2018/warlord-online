// src\components\LogViewer.tsx
import { useGameContext } from "../contexts/GameContext";

import styles from "./LogViewer.module.css";

export default function LogViewer() {
  const { logs } = useGameContext();
  const lastFiveLogs = logs.slice(-9);

  return (
    <div className={styles.LogViewer}>
      <h4>Log</h4>
      <div className={styles.LogViewerContent}>
        {[...lastFiveLogs].reverse().map((logEntry, index) => (
          <pre key={index} className={styles.LogViewerEntry}>
            {logEntry}
          </pre>
        ))}
      </div>
    </div>
  );
}

// src/components/GameZone.tsx
import ActionButtons from "./ActionButtons";
import LogViewer from "./LogViewer";
import PhaseInfo from "./PhaseInfo";

import styles from "./GameZone.module.css";

export default function GameZone() {
  return (
    <div className={styles.container}>
      <PhaseInfo />
      <LogViewer />
      <ActionButtons />
    </div>
  );
}

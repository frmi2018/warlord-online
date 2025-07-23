// src/components/GameZone.tsx
import type { Action, Phase, Turn } from "../types/types";

import ActionButtons from "./ActionButtons";
import LogViewer from "./LogViewer";
import PhaseInfo from "./PhaseInfo";

import styles from "./GameZone.module.css";

interface Props {
  turn: Turn;
  phase: Phase;
  actionsPlayer: number;
  logs: string[];
  actions: Action[];
  actionsAi: number;
  hasStarted: boolean;
}

export default function GameZone({
  turn,
  phase,
  actionsPlayer,
  logs,
  actions,
  actionsAi,
  hasStarted,
}: Props) {
  return (
    <div className={styles.container}>
      <PhaseInfo
        turn={turn}
        phase={phase}
        actionsPlayer={actionsPlayer}
        actionsAi={actionsAi}
        hasStarted={hasStarted}
      />
      <LogViewer logs={logs} />
      <ActionButtons actions={actions} />
    </div>
  );
}

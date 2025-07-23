import styles from "./PhaseInfo.module.css";
import type { Phase, Turn } from "../types/types";

interface Props {
  turn: Turn;
  phase: Phase;
  actionsPlayer: number;
  actionsAi: number;
  hasStarted: boolean;
}

export default function PhaseInfo({
  turn,
  phase,
  actionsPlayer,
  actionsAi,
  hasStarted,
}: Props) {
  return (
    <div className={styles.phaseInfo}>
      <img src="/images/warlord-card-back.webp" alt="Dos de carte Warlord" />

      <div>
        <p>Initiative : {turn}</p>
        <p>Phase actuelle: {phase}</p>
        <p>
          Action joueur: {actionsPlayer} / Ai: {actionsAi}
        </p>
        <p>Phase commencé ? {hasStarted ? "Oui" : "Non"}</p>
      </div>
    </div>
  );
}

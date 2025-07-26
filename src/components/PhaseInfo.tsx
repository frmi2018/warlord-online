import { useGameContext } from "../contexts/GameContext";

import styles from "./PhaseInfo.module.css";

export default function PhaseInfo() {
  const { turn, phase, clickMode } = useGameContext();

  return (
    <div className={styles.phaseInfo}>
      <img src="/images/warlord-card-back.webp" alt="Dos de carte Warlord" />

      <div>
        <p>version 0.04-260725-frmi@free.fr</p>
        <p>--</p>
        <p>Phase {phase}</p>
        <p>tour : {turn}</p>
        <p>clickMode : {clickMode}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "space-around",
          }}
        ></div>
      </div>
    </div>
  );
}

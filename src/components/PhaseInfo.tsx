import { useGameContext } from "../contexts/GameContext";

import { D20 } from "./D20";

import styles from "./PhaseInfo.module.css";

export default function PhaseInfo() {
  const { turn, phase, clickMode } = useGameContext();

  return (
    <div className={styles.phaseInfo}>
      <img src="/images/warlord-card-back.webp" alt="Dos de carte Warlord" />

      <div>
        <p>version 0.03-260725-frmi@free.fr</p>
        <p>--</p>
        <p>Phase {phase}</p>
        <p>tour : {turn}</p>
        <p>clickMode : {clickMode}</p>
        <p>--</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "space-around",
          }}
        >
          <D20 type="fail" value={1} />
        </div>
      </div>
    </div>
  );
}

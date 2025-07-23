// Liste des ACTIONS possible pendant la phase enturn
// // src/game/actionsPhase/phaseEndTurnActions.ts

import type { Action } from "../../types/types";
import type { Dispatch, SetStateAction } from "react";
// import { handleEndTurnPhase } from "../effetsPhase/handleEndTurnPhase";

interface PhaseEndTurnProps {
  setLogs: Dispatch<SetStateAction<string[]>>;
  handleNextPhase: () => void;
}

export const phaseEndTurnActions = ({
  setLogs,
  handleNextPhase,
}: // setActionsPlayer,
PhaseEndTurnProps): Action[] => {
  const actions: Action[] = [];

  actions.push({
    label: "NOUVEAU TOUR",
    onClick: () => {
      try {
        handleNextPhase();
        setLogs(prevLogs => [...prevLogs.slice(-9), "Début du tour READY"]);
      } catch (error) {
        console.error("🔍 DEBUG: Erreur dans onClick:", error);
      }
    },
    enabled: true,
  });

  return actions;
};

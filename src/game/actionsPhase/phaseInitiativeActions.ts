// Liste des ACTIONS possible pendant la phase Initiative
// src/game/actionsPhase/phaseInitiativeActions.ts

import type { Action, Turn } from "../../types/types";
import type { Dispatch, SetStateAction } from "react";
import { handleInitiativePhase } from "../effetsPhase/handleInitiativePhase";

interface PhaseInitiativeActionsProps {
  setInitiativeWinner: Dispatch<SetStateAction<Turn>>;
  hasRolled: boolean;
  setHasRolled: Dispatch<SetStateAction<boolean>>;
  isTie: boolean;
  setIsTie: Dispatch<SetStateAction<boolean>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
  handleNextPhase: () => void;
  setPlayerDiceValue: Dispatch<SetStateAction<number>>;
  setAiDiceValue: Dispatch<SetStateAction<number>>;
}

export const phaseInitiativeActions = ({
  setLogs,
  setInitiativeWinner,
  hasRolled,
  setHasRolled,
  isTie,
  setIsTie,
  handleNextPhase,
  setPlayerDiceValue,
  setAiDiceValue,
}: PhaseInitiativeActionsProps): Action[] => {
  const actions: Action[] = [];

  if (!hasRolled || isTie) {
    // Affiche uniquement le bouton "Lancer le dé" si pas encore lancé ou égalité
    actions.push({
      label: "Lancer le dé",
      onClick: () => {
        handleInitiativePhase(
          setInitiativeWinner,
          setLogs,
          setHasRolled,
          setIsTie,
          setPlayerDiceValue,
          setAiDiceValue,
        );
      },
      enabled: true,
    });
  } else {
    // Sinon, affiche uniquement le bouton "NEXT PHASE"
    actions.push({
      label: "PHASE DECREE",
      onClick: () => {
        setLogs(prevLogs => [...prevLogs.slice(-9), "Fin du tour INITIATIVE"]);
        handleNextPhase();
      },
      enabled: true,
    });
  }

  return actions;
};

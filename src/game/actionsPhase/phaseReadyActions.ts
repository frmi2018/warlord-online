import type { Dispatch, SetStateAction } from "react";
import type { Action, Ranks } from "../../types/types";

import { handleReadyPhase } from "../effetsPhase/handleReadyPhase";

interface PhaseReadyActionsProps {
  playerRanks: Ranks;
  setPlayerRanks: Dispatch<SetStateAction<Ranks>>;
  aiRanks: Ranks;
  setAiRanks: Dispatch<SetStateAction<Ranks>>;
  hasStarted: boolean;
  setHasStarted: Dispatch<SetStateAction<boolean>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
  handleNextPhase: () => void;
}

/**
 * Définit les actions disponibles pendant la phase "Ready".
 *
 * Si la partie n’a pas encore commencé :
 * - Affiche "Tourner vos cartes", qui appelle `handleReadyPhase`
 *   pour redresser les personnages (ready/spent/stunned).
 *
 * Si la partie a commencé :
 * - Affiche "NEXT PHASE" pour passer à la phase suivante (Draw).
 *
 * @param props Paramètres nécessaires à la gestion des états et des logs.
 * @returns Un tableau d’actions à afficher dans l’interface.
 */
export const phaseReadyActions = ({
  playerRanks,
  setPlayerRanks,
  aiRanks,
  setAiRanks,
  hasStarted,
  setHasStarted,
  setLogs,
  handleNextPhase,
}: PhaseReadyActionsProps): Action[] => {
  const actions: Action[] = [];

  if (!hasStarted) {
    actions.push({
      label: "Tourner vos cartes",
      onClick: () => {
        handleReadyPhase(
          playerRanks,
          aiRanks,
          setPlayerRanks,
          setAiRanks,
          setLogs,
        );
        setHasStarted(true);
      },
      enabled: true,
    });
  } else {
    actions.push({
      label: "PHASE DRAW",
      onClick: () => {
        try {
          setLogs(prevLogs => [...prevLogs.slice(-9), "Fin du tour READY"]);
          setHasStarted(false);

          handleNextPhase();
        } catch (error) {
          console.error("🔍 DEBUG: Erreur dans onClick:", error);
        }
      },
      enabled: true,
    });
  }

  return actions;
};

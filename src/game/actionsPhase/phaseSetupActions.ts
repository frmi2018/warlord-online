// Imports React (types)
import type { Dispatch, SetStateAction } from "react";

// Imports internes (types de données du jeu)
import type { Action, Ranks, Card } from "../../types/types";

// Imports internes (fonctions métier)
import { handleSetupPhase } from "../effetsPhase/handleSetupPhase";

/**
 * Propriétés nécessaires pour gérer les actions pendant la phase de Setup.
 */
interface PhaseSetupActionsProps {
  setPlayerRanks: Dispatch<SetStateAction<Ranks>>;
  setAiRanks: Dispatch<SetStateAction<Ranks>>;
  setPlayerDeck: Dispatch<SetStateAction<Card[]>>;
  setAiDeck: Dispatch<SetStateAction<Card[]>>;
  setPlayerHand: Dispatch<SetStateAction<Card[]>>;
  setAiHand: Dispatch<SetStateAction<Card[]>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
  handleNextPhase: () => void;
  hasStarted: boolean;
  setHasStarted: Dispatch<SetStateAction<boolean>>;
}

/**
 * Détermine les actions disponibles pendant la phase "setup".
 *
 * - Si `hasStarted` est `false`, propose de démarrer la partie via `handleSetupPhase`.
 * - Sinon, propose de passer à la phase suivante avec `handleNextPhase`.
 *
 * @param props Objet contenant tous les setters et états nécessaires à cette phase.
 * @returns Un tableau d'objets `Action` à afficher dans l’interface.
 */
export const phaseSetupActions = ({
  setPlayerRanks,
  setAiRanks,
  setPlayerDeck,
  setAiDeck,
  setPlayerHand,
  setAiHand,
  setLogs,
  handleNextPhase,
  hasStarted,
  setHasStarted,
}: PhaseSetupActionsProps): Action[] => {
  const actions: Action[] = [];

  if (!hasStarted) {
    actions.push({
      label: "🚀 Commencer la partie",
      onClick: () => {
        handleSetupPhase(
          setPlayerRanks,
          setAiRanks,
          setPlayerDeck,
          setAiDeck,
          setPlayerHand,
          setAiHand,
          setLogs,
        );
        setHasStarted(true);
      },
      enabled: true,
    });
  } else {
    actions.push({
      label: "PHASE READY",
      onClick: () => {
        try {
          setLogs(prevLogs => [...prevLogs.slice(-9), "Fin de la phase SETUP"]);
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

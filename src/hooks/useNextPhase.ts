import { useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { Phase, Turn } from "../types/types";

interface UseGameActionsProps {
  phase: Phase;
  setPhase: Dispatch<SetStateAction<Phase>>;
  initiativeWinner: Turn;
  setActionsPlayer: Dispatch<SetStateAction<number>>;
  setActionsAi: Dispatch<SetStateAction<number>>;
  setTurn: Dispatch<SetStateAction<Turn>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
  setHasRolled: Dispatch<SetStateAction<boolean>>;
  setIsTie: Dispatch<SetStateAction<boolean>>;
}

export const useNextPhase = ({
  phase,
  setPhase,
  initiativeWinner,
  setActionsPlayer,
  setActionsAi,
  setTurn,
  setLogs,
  setHasRolled,
  setIsTie,
}: UseGameActionsProps) => {
  // refs globales réutilisables pour bloquer les appels multiples

  /**
   * Passe à la phase suivante, en fonction de la phase actuelle.
   * Chaque phase appelle une fonction dédiée à son traitement.
   */
  const handleNextPhase = useCallback(() => {
    switch (phase) {
      case "setup":
        // Transition vers la phase decree
        setPhase("ready");
        setLogs(["Début du tour READY"]);
        break;

      case "ready":
        setPhase("draw");
        setLogs(["Début du tour DRAW"]);
        break;

      case "draw":
        // Réinitialiser les états d'initiative pour le nouveau tour
        setHasRolled(false);
        setIsTie(false);
        setPhase("initiative");
        setLogs(["Début du tour INITIATIVE"]);
        break;

      case "initiative":
        setTurn(initiativeWinner);
        setPhase("decree");
        setLogs([
          `Début du tour DECREE\n${
            initiativeWinner === "player" ? "Joueur" : "IA"
          } commence`,
        ]);
        break;

      case "decree":
        // Initialisation des actions pour chaque joueurs
        setActionsPlayer(2);
        setActionsAi(2);
        setPhase("endturn");
        setLogs(["Fin du tour"]);
        break;

      case "endturn":
        setPhase("ready");
        setLogs(["Nouveau tour de jeu"]);
        break;

      default:
        // Sécurité : phase inconnue
        console.warn(`Phase non gérée: ${phase}`);
        break;
    }
  }, [
    phase,
    initiativeWinner,
    setActionsPlayer,
    setActionsAi,
    setTurn,
    setPhase,
    setLogs,
    setHasRolled,
    setIsTie,
  ]);

  return {
    handleNextPhase,
  };
};

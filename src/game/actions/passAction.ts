// src/game/actions/nextPhase.ts

import type { Dispatch, SetStateAction } from "react";
import type { Action } from "../../types/types";

/**
 * Crée une action qui permet de passer à la phase suivante.
 * @param phase La phase actuelle du jeu.
 * @param setActionsPlayer Fonction pour définir le nombre d'action du joueur.
 * @param setLogs Fonction pour écrire un message dans le journal.
 * @param handleNextPhase Fonction qui déclenche la phase suivante.
 * @returns Un objet Action utilisable dans un tableau d’actions.
 */
export function passAction(
  setLogs: Dispatch<SetStateAction<string[]>>,
  setActionsPlayer: Dispatch<SetStateAction<number>>,
  handleNextPhase: () => void,
): Action {
  return {
    label: "PASSER",
    onClick: () => {
      setActionsPlayer(0);
      handleNextPhase(); // passe à la phase suivante
      setLogs(prevLogs => [...prevLogs.slice(-9), "Vous avez passé"]);
    },
  };
}

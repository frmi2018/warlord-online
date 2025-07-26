import type { Dispatch, SetStateAction } from "react";
import type { Turn } from "../../types/types";

import { rollD20WithModifier, type DiceResult } from "../../utils/dice";

/**
 * Gère la phase d'initiative du jeu.
 *
 * Chaque joueur (humain et IA) lance un d20 (avec modificateur éventuel).
 * - Si l’un obtient un 20 naturel (critique) sans égalité, il gagne automatiquement.
 * - En cas d’égalité, une relance est nécessaire (isTie = true, hasRolled = false).
 * - Met à jour les logs avec les jets de dés et le résultat.
 *
 * @param setInitiativeWinner Setter pour définir qui a gagné l’initiative.
 * @param setLogs Setter pour ajouter les résultats dans le journal.
 * @param setHasRolled Setter booléen pour indiquer si l’initiative a été résolue.
 * @param setIsTie Setter booléen pour signaler une égalité (nécessite relance).
 */
export const handleInitiativePhase = (
  setInitiativeWinner: Dispatch<SetStateAction<Turn>>,
  setLogs: Dispatch<SetStateAction<string[]>>,
  setHasRolled: Dispatch<SetStateAction<boolean>>,
  setIsTie: Dispatch<SetStateAction<boolean>>,
  setPlayerDiceValue: Dispatch<SetStateAction<number>>,
  setAiDiceValue: Dispatch<SetStateAction<number>>,
) => {
  const rollInitiative = (): {
    winner: Turn | null;
    logMessages: string[];
    isTie: boolean;
  } => {
    const playerModifier = 0;
    const iaModifier = 0;

    const playerResult: DiceResult = rollD20WithModifier(playerModifier);
    const iaResult: DiceResult = rollD20WithModifier(iaModifier);

    // Affichage du dé
    setPlayerDiceValue(playerResult.roll);
    setAiDiceValue(iaResult.roll);

    const logs: string[] = [];

    logs.push(
      `Joueur : dé ${playerResult.roll}${
        playerResult.modifier >= 0 ? ` + bonus ${playerResult.modifier}` : ""
      }${playerResult.modifier < 0 ? `${playerResult.modifier}` : ""} = ${
        playerResult.total
      }${playerResult.isCritical ? " (CRITIQUE!)" : ""}`,
    );

    logs.push(
      `IA : dé ${iaResult.roll}${
        iaResult.modifier >= 0 ? ` + bonus ${iaResult.modifier}` : ""
      }${iaResult.modifier < 0 ? `${iaResult.modifier}` : ""} = ${
        iaResult.total
      }${iaResult.isCritical ? " (CRITIQUE!)" : ""}`,
    );

    if (playerResult.isCritical && !iaResult.isCritical) {
      logs.push("Joueur gagne l'initiative (critique)");
      return { winner: "player", logMessages: logs, isTie: false };
    }

    if (iaResult.isCritical && !playerResult.isCritical) {
      logs.push("IA gagne l'initiative (critique)");
      return { winner: "ai", logMessages: logs, isTie: false };
    }

    if (playerResult.total > iaResult.total) {
      logs.push("Joueur gagne l'initiative");
      return { winner: "player", logMessages: logs, isTie: false };
    } else if (iaResult.total > playerResult.total) {
      logs.push("IA gagne l'initiative");
      return { winner: "ai", logMessages: logs, isTie: false };
    } else {
      logs.push("Égalité - relance des dés");
      return { winner: null, logMessages: logs, isTie: true };
    }
  };

  const result = rollInitiative();

  if (result.isTie) {
    setIsTie(true);
    setHasRolled(false);
    setLogs(prevLogs => [...prevLogs.slice(-9), ...result.logMessages]);
  } else {
    setIsTie(false);
    setHasRolled(true);
    if (result.winner !== null) {
      setInitiativeWinner(result.winner);
    }
    setLogs(prevLogs => [...prevLogs.slice(-9), ...result.logMessages]);
  }
};

// src/game/effetsPhase/handleReadyPhase.ts

import type { Dispatch, SetStateAction } from "react";
import type { Ranks } from "../../types/types";

import { rotateCardStatuses } from "../gameActions/ranks";

/**
 * Gère la phase "ready" (préparation) du tour.
 * Cette phase permet de remettre toutes les cartes en position "prêtes" pour la suite du tour.
 *
 * Game rules
 * 1st: ready phase
 * All players simultaneously turn their cards 90 degrees back toward the upright position.
 * Spent cards become ready, and stunned cards become spent.
 */
export function handleReadyPhase(
  playerRanks: Ranks, // Les rangs du joueur
  aiRanks: Ranks, // Les rangs de l'IA
  setPlayerRanks: Dispatch<SetStateAction<Ranks>>, // Permet de mettre à jour les rangs du joueur
  setAiRanks: Dispatch<SetStateAction<Ranks>>, // Permet de mettre à jour les rangs de l’IA
  setLogs: Dispatch<SetStateAction<string[]>>, // Permet d’ajouter un message dans le journal
) {
  // On "réinitialise" les cartes du joueur et de l’IA : elles sont prêtes à rejouer (ex: non tapées)
  setPlayerRanks(rotateCardStatuses(playerRanks));
  setAiRanks(rotateCardStatuses(aiRanks));

  // On affiche un message dans le journal du jeu
  setLogs(prevLogs => [...prevLogs.slice(-9), "Rotation des cartes faite."]);
}

// src/game/actions/drawCards.ts

import type { Card } from "../../types/types";
import type { Dispatch, SetStateAction } from "react";

/**
 * Tire un certain nombre de cartes depuis le haut du deck.
 * @param deck Le deck d'où piocher les cartes.
 * @param count Le nombre de cartes à piocher.
 * @returns Un objet contenant les cartes piochées et le nouveau deck.
 */
export function drawCards(
  deck: Card[],
  count: number,
): { drawn: Card[]; updatedDeck: Card[] } {
  // On vérifie qu'on ne pioche pas plus que le nombre de cartes disponibles
  const safeCount = Math.min(count, deck.length);

  // On prend les premières cartes à piocher
  const drawn = deck.slice(0, safeCount);

  // On enlève ces cartes du deck d'origine pour créer un nouveau deck mis à jour
  const updatedDeck = deck.slice(safeCount);

  // On retourne les cartes piochées et le nouveau deck
  return { drawn, updatedDeck };
}

/**
 * Gère la pioche pour le joueur et l'IA simultanément
 * @param playerDeck Deck du joueur
 * @param aiDeck Deck de l'IA
 * @param playerHand Main du joueur
 * @param aiHand Main de l'IA
 * @param setPlayerDeck Setter deck joueur
 * @param setAiDeck Setter deck IA
 * @param setPlayerHand Setter main joueur
 * @param setAiHand Setter main IA
 * @param setLogs Setter logs
 */
export function drawCardsForBothPlayers(
  playerDeck: Card[],
  aiDeck: Card[],
  playerHand: Card[],
  aiHand: Card[],
  setPlayerDeck: Dispatch<SetStateAction<Card[]>>,
  setAiDeck: Dispatch<SetStateAction<Card[]>>,
  setPlayerHand: Dispatch<SetStateAction<Card[]>>,
  setAiHand: Dispatch<SetStateAction<Card[]>>,
  setLogs: Dispatch<SetStateAction<string[]>>,
) {
  const HAND_SIZE = 5;

  // Le joueur pioche UNE carte s'il peut
  if (playerHand.length < HAND_SIZE && playerDeck.length > 0) {
    const { drawn, updatedDeck } = drawCards(playerDeck, 1);
    setPlayerHand([...playerHand, ...drawn]);
    setPlayerDeck(updatedDeck);
    setLogs(prevLogs => [...prevLogs.slice(-9), `Vous piochez une carte.`]);
  }

  // L'IA pioche UNE carte si elle peut
  if (aiHand.length < HAND_SIZE && aiDeck.length > 0) {
    const { drawn, updatedDeck } = drawCards(aiDeck, 1);
    setAiHand([...aiHand, ...drawn]);
    setAiDeck(updatedDeck);
    setLogs(prevLogs => [...prevLogs.slice(-9), `L'IA pioche une carte.`]);
  }
}

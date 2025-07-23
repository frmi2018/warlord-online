// src/game/actions/discardCards.ts
import type { Card } from "../../types/types";
import type { Dispatch, SetStateAction } from "react";

/**
 * Défausse des cartes depuis une main vers une pile de défausse.
 * @param hand La main du joueur
 * @param discardPile La pile de défausse actuelle
 * @param cardsToDiscard Les cartes à défausser
 * @returns Un objet contenant la nouvelle main et la nouvelle pile de défausse
 */
export function discardCards(
  hand: Card[],
  discardPile: Card[],
  cardsToDiscard: Card[],
): { updatedHand: Card[]; updatedDiscardPile: Card[] } {
  // Enlève les cartes de la main
  const updatedHand = hand.filter(
    handCard =>
      !cardsToDiscard.some(discardCard => discardCard.id === handCard.id),
  );

  // Ajoute les cartes à la pile de défausse
  const updatedDiscardPile = [...discardPile, ...cardsToDiscard];

  return { updatedHand, updatedDiscardPile };
}

/**
 * Gère la défausse du joueur avec mise à jour des états et logs
 */
export function discardPlayerCards(
  selectedCards: Card[],
  playerHand: Card[],
  playerDiscardPile: Card[],
  setPlayerHand: Dispatch<SetStateAction<Card[]>>,
  setPlayerDiscardPile: Dispatch<SetStateAction<Card[]>>,
  setLogs: Dispatch<SetStateAction<string[]>>,
) {
  if (selectedCards.length === 0) {
    setLogs(prevLogs => [...prevLogs.slice(-9), "Aucune carte à défausser"]);
    return;
  }

  const { updatedHand, updatedDiscardPile } = discardCards(
    playerHand,
    playerDiscardPile,
    selectedCards,
  );

  setPlayerHand(updatedHand);
  setPlayerDiscardPile(updatedDiscardPile);
  setLogs(prevLogs => [
    ...prevLogs.slice(-9),
    `Vous défaussez ${selectedCards.length} carte(s)`,
  ]);
}

/**
 * Gère la défausse automatique de l'IA avec mise à jour des états et logs
 */
export function discardAICards(
  aiHand: Card[],
  aiDiscardPile: Card[],
  setAiHand: Dispatch<SetStateAction<Card[]>>,
  setAiDiscardPile: Dispatch<SetStateAction<Card[]>>,
  setLogs: Dispatch<SetStateAction<string[]>>,
) {
  // L'IA défausse au hasard entre 0 et 2 cartes
  const maxDiscard = Math.min(2, aiHand.length);
  const discardCount = Math.floor(Math.random() * (maxDiscard + 1));

  if (discardCount === 0) {
    setLogs(prevLogs => [
      ...prevLogs.slice(-9),
      "L'IA ne défausse aucune carte",
    ]);
    return;
  }

  const cardsToDiscard = aiHand.slice(0, discardCount);
  const { updatedHand, updatedDiscardPile } = discardCards(
    aiHand,
    aiDiscardPile,
    cardsToDiscard,
  );

  setAiHand(updatedHand);
  setAiDiscardPile(updatedDiscardPile);
  setLogs(prevLogs => [
    ...prevLogs.slice(-9),
    `L'IA défausse ${discardCount} carte(s)`,
  ]);
}

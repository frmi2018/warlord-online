// src/game/actions/toggleCardSelection.ts
import type { Card } from "../../types/types";

/**
 * Bascule la sélection d'une carte (sélectionne si pas sélectionnée, désélectionne si sélectionnée).
 * @param selectedCards Tableau des cartes déjà sélectionnées
 * @param card La carte à basculer
 * @returns Le nouveau tableau avec la carte ajoutée ou retirée
 */
export function toggleCardSelection(selectedCards: Card[], card: Card): Card[] {
  const isSelected = selectedCards.some(c => c.id === card.id);

  if (isSelected) {
    return selectedCards.filter(c => c.id !== card.id);
  } else {
    return [...selectedCards, card];
  }
}

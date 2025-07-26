import type { Card } from "../types/types";

export function toggleCardSelection(
  card: Card,
  selectedCards: Card[],
  playerHand: Card[],
): {
  updatedSelected: Card[];
  updatedHand: Card[];
  logMessage: string;
} {
  const isAlreadySelected = selectedCards.some(c => c.id === card.id);

  if (isAlreadySelected) {
    return {
      updatedSelected: selectedCards.filter(c => c.id !== card.id),
      updatedHand: playerHand.map(c =>
        c.id === card.id ? { ...c, selected: false } : c,
      ),
      logMessage: `Carte ${card.name} désélectionnée`,
    };
  } else {
    const updatedCard = { ...card, selected: true };
    return {
      updatedSelected: [...selectedCards, updatedCard],
      updatedHand: playerHand.map(c => (c.id === card.id ? updatedCard : c)),
      logMessage: `Carte ${card.name} sélectionnée`,
    };
  }
}

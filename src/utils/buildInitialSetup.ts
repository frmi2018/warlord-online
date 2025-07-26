// src/game/buildInitialSetup.ts
import type { Card } from "../types/types";
import { shuffleArray } from "./shuffle";

function initCardDefaults(card: Card): Card {
  return {
    ...card,
    stunned: false,
    tapped: false,
    movedThisTurn: false,
    selected: false,
  };
}

export function buildInitialSetup(deck: Card[]) {
  const deckWithDefaults = deck.map(initCardDefaults);

  const warlord = deckWithDefaults.find(card =>
    card.traits?.includes("Warlord"),
  );
  if (!warlord) throw new Error("Deck invalide : aucun Warlord trouvé.");

  // Ne prendre que des cartes character et de la même faction que le Warlord
  const sameFaction = (card: Card) =>
    card.faction === warlord.faction &&
    card.cardType === "character" &&
    card.id !== warlord.id;

  // Filtrer et mélanger les cartes de niveau 1 (sans le Warlord)
  const level1Cards = shuffleArray(
    deckWithDefaults.filter(c => c.level === 1 && sameFaction(c)),
  ).slice(0, 3);

  // Filtrer et mélanger les cartes de niveau 2 (sans le Warlord)
  const level2Cards = shuffleArray(
    deckWithDefaults.filter(c => c.level === 2 && sameFaction(c)),
  ).slice(0, 2);

  const startingCards = [warlord, ...level1Cards, ...level2Cards];

  const startingIds = new Set(startingCards.map(c => c.id));
  const remainingDeck = shuffleArray(
    deckWithDefaults.filter(c => !startingIds.has(c.id)),
  );

  console.log(startingCards, remainingDeck);
  return {
    startingCards,
    remainingDeck,
  };
}

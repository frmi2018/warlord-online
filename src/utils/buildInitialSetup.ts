// src/game/buildInitialSetup.ts
import type { Card } from "../../types/types";
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

  // Filtrer et mélanger les cartes de niveau 1 (sans le Warlord)
  const level1Cards = deckWithDefaults.filter(
    c => c.level === 1 && c.id !== warlord.id,
  );
  const shuffledLevel1 = shuffleArray(level1Cards);
  const level1 = shuffledLevel1.slice(0, 3);

  // Filtrer et mélanger les cartes de niveau 2 (sans le Warlord)
  const level2Cards = deckWithDefaults.filter(
    c => c.level === 2 && c.id !== warlord.id,
  );
  const shuffledLevel2 = shuffleArray(level2Cards);
  const level2 = shuffledLevel2.slice(0, 2);

  const startingCards = [warlord, ...level1, ...level2];

  const startingIds = new Set(startingCards.map(c => c.id));
  const remainingDeck = shuffleArray(
    deckWithDefaults.filter(c => !startingIds.has(c.id)),
  );

  return {
    startingCards,
    remainingDeck,
  };
}

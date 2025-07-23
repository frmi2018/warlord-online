// src/game/prepareStartingArmyFromCards.ts
import type { Card, Ranks } from "../types/types";

/**
 * Place les cartes fournies dans les bons rangs selon leur niveau :
 * - Niveau 1 → Rang 1
 * - Niveau 2 → Rang 2
 * - Warlord → Rang 3
 */
export function prepareStartingArmyFromCards(cards: Card[]): Ranks {
  if (cards.length !== 6) {
    throw new Error("Le deck de départ doit contenir exactement 6 cartes.");
  }

  const ranks: Ranks = [[], [], [], []];

  const warlord = cards.find(c => c.traits?.includes("Warlord"));
  if (!warlord) throw new Error("Aucun Warlord trouvé parmi les cartes.");

  const faction = warlord.faction;
  if (!faction) throw new Error("Le Warlord n’a pas de faction définie.");

  // Ajouter chaque carte dans le bon rang
  for (const card of cards) {
    if (card.id === warlord.id) {
      ranks[2].push(card); // rang 3 pour le Warlord
    } else if (card.level === 1) {
      ranks[0].push(card); // rang 1
    } else if (card.level === 2) {
      ranks[1].push(card); // rang 2
    } else {
      throw new Error(
        `Carte non autorisée dans le deck de départ : ${card.name} (niveau ${card.level})`,
      );
    }
  }

  return ranks;
}

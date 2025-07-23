// src/game/ranks.ts

import type { Card, Ranks, FixResult } from "../types/types";

/**
 * Initialise les rangs avec 4 niveaux. Répartit les cartes en partant du rang 1.
 */
export const createRanks = (cards: Card[]): Ranks => {
  const ranks: Ranks = [[], [], [], []];
  cards.forEach((card, i) => {
    const rank = Math.min(i, 3); // ne dépasse pas rang 4
    ranks[rank].push(card);
  });
  return ranks;
};

/**
 * Nettoie les statuts d'une carte au début du tour.
 */
export const clearStatusAtTurnStart = (ranks: Ranks): Ranks =>
  ranks.map(rank =>
    rank.map(card => ({
      ...card,
      stunned: false,
      movedThisTurn: false,
      tapped: false,
    })),
  );

/**
 * Vérifie si un déplacement est autorisé selon les règles.
 */
export const canMoveCard = (from: number, to: number): boolean => {
  if (to < 0 || to > 3) return false;
  if (from === to) return true;
  return Math.abs(from - to) === 1;
};

/**
 * Déplace une carte d’un rang à un autre (marque la carte comme déplacée).
 */
export const moveCard = (
  ranks: Ranks,
  fromRank: number,
  toRank: number,
  card: Card,
  insertPosition: number = 0,
): Ranks => {
  const newRanks = ranks.map(rank => [...rank]);
  newRanks[fromRank] = newRanks[fromRank].filter(c => c.id !== card.id);

  const movedCard = { ...card, movedThisTurn: true };
  const safeInsert = Math.min(insertPosition, newRanks[toRank].length);
  newRanks[toRank].splice(safeInsert, 0, movedCard);

  return newRanks;
};

/**
 * Corrige les rangs si un rang vide est suivi d'un rang plein.
 */
export const fixIllegalRanks = (ranks: Ranks): FixResult => {
  const newRanks = ranks.map(rank => [...rank]);

  for (let i = 0; i < newRanks.length - 1; i++) {
    if (newRanks[i].length === 0 && newRanks[i + 1].length > 0) {
      if (newRanks[i + 1].length === 1) {
        const moved = { ...newRanks[i + 1][0], stunned: true };
        newRanks[i] = [moved];
        newRanks[i + 1] = [];
      } else {
        return {
          ranks: newRanks,
          needsManualFix: true,
          rankToFix: i,
          candidates: newRanks[i + 1],
        };
      }
    }
  }

  for (let i = 0; i < newRanks.length - 1; i++) {
    if (newRanks[i].length > 0 && newRanks[i + 1].length > newRanks[i].length) {
      const surplus = newRanks[i + 1].length - newRanks[i].length;
      if (surplus === 1) {
        const moved = { ...newRanks[i + 1][0], stunned: true };
        newRanks[i].push(moved);
        newRanks[i + 1] = newRanks[i + 1].slice(1);
      } else {
        return {
          ranks: newRanks,
          needsManualFix: true,
          rankToFix: i,
          candidates: newRanks[i + 1],
        };
      }
    }
  }

  return { ranks: newRanks, needsManualFix: false };
};

/**
 * Applique des dégâts à une carte. Supprime la carte si elle meurt.
 * Corrige les rangs ensuite si besoin.
 */
export const updateRanksAfterAttack = (
  ranks: Ranks,
  rankIndex: number,
  cardId: string,
  dmg: number,
): Ranks => {
  const newRanks = ranks.map(rank => [...rank]);
  const idx = newRanks[rankIndex].findIndex(c => c.id === cardId);
  if (idx === -1) return newRanks;

  const card = newRanks[rankIndex][idx];
  const hp = card.hitPoints - dmg;

  if (hp <= 0) {
    newRanks[rankIndex].splice(idx, 1); // carte KO
  } else {
    newRanks[rankIndex][idx] = { ...card, hitPoints: hp };
  }

  const result = fixIllegalRanks(newRanks);
  return result.ranks;
};

/**
 * Rotation automatique des statuts de carte à la phase "ready"
 */
export const rotateCardStatuses = (ranks: Ranks): Ranks =>
  ranks.map(rank =>
    rank.map(card => ({
      ...card,
      tapped: card.stunned ? true : false,
      stunned: false,
      movedThisTurn: false,
    })),
  );

// src/game/types.ts

// Liste des différentes phases du jeu
export type Phase =
  | "setup"
  | "ready"
  | "draw"
  | "initiative"
  | "decree"
  | "endturn";

// Indique à qui est le tour
export type Turn = "player" | "ai";

// Type de carte
// Type de carte
export interface Card {
  id: string;
  name: string;

  // Combat & caractéristiques
  level: number;
  attackValues: number[];
  armorClass: number;
  skill: number;
  hitPoints: number;

  // Faction et style
  faction?: string;
  borderColor?: string;

  // Classe et alignement
  classIcon: "starburst" | "gauntlet" | "glove" | "scroll" | "oval";
  className: string;
  alignment: "good" | "evil";

  // Divers
  traits?: string[];
  unique?: boolean;

  // État en jeu
  stunned?: boolean;
  tapped?: boolean;
  movedThisTurn?: boolean;
  selected?: boolean;

  // ✅ Nouvelle propriété pour indiquer la provenance
  zone?: "playerHand" | "aiHand" | "ranks" | "discard";
}

// Tableau de cartes par rang (4 rangs : 0 = rang 1, 1 = rang 2, etc.)
export type Ranks = Card[][];

// Résultat de correction des rangs (si rangs invalides)
export interface FixResult {
  ranks: Ranks;
  needsManualFix: boolean;
  rankToFix?: number;
  candidates?: Card[];
}

// Action utilisable par le joueur
export interface Action {
  label: React.ReactNode;
  onClick: () => void;
  // Propriétés optionnelles pour l'évolution future
  id?: string;
  description?: string;
  cost?: number;
  enabled?: boolean;
  visible?: boolean;
}

// Dans types.ts
export type ClickMode = "display" | "select" | "discard" | "move" | "attack";

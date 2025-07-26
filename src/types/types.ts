// src/types/types.ts

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

// TODO 1 - Définition des icônes de classe
// export const classIcons: Record<string, string> = {
//   starburst: "✨", // Cleric
//   gauntlet: "🛡️", // Fighter
//   glove: "🧤", // Rogue
//   scroll: "📜", // Wizard
//   oval: "⭕", // Multi/classless
// };

// TODO 1 - Définition des couleurs de faction
export const factionColors: Record<string, string> = {
  Deverenian: "#6d0202ff",
  Dwarf: "#916412ff",
  Elf: "#ffffffff",
  "Free Kingdoms": "#dd982fff",
  Nothrog: "#075a2aff",
  "The Chosen": "#58095fff",
  Mercenary: "#2197dbff",
};

// Liste des éléments sur une carte
export interface Card {
  id: string;
  name: string;

  // Combat & caractéristiques
  level: number;
  attackValues?: number[];
  armorClass?: number;
  skill?: number;
  hitPoints?: number | null;

  // Faction et style
  faction?: string;
  borderColor?: string;

  // Classe et alignement
  classIcon: "starburst" | "gauntlet" | "glove" | "scroll" | "oval";
  alignment?: "good" | "evil";

  // TODO 2 - Type de carte
  cardType: "character" | "item" | "action";

  // Divers
  traits?: string[];
  unique?: boolean;

  // Items / actions
  only?: string[];
  attackBonus?: number | null;
  armorBonus?: number | null;
  malus?: string[];
  bonus?: string[];
  order?: ["order" | "spend" | "react"];
  action?: string[];
  // conditions: (state, card) => card.ready && hasTargetInRange(card, state),
  // execute: (state, card) => {
  //   const newState = cloneState(state);
  //   const target = chooseWeakestTarget(state);
  //   applyDamage(target, 2);
  //   card.tapped = true;
  //   return newState;
  // }

  // État en jeu
  stunned?: boolean;
  tapped?: boolean;
  movedThisTurn?: boolean;
  selected?: boolean;

  // Position dans le jeu
  zone?:
    | "playerDeck"
    | "aiDeck"
    | "playerHand"
    | "aiHand"
    | "playerRanks"
    | "aiRanks"
    | "playerdiscard"
    | "aiDiscard";
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

// Etat de la souris lors du clic
export type ClickMode = "display" | "select" | "discard" | "move" | "attack";

// interface CardAction {
//   id: string;
//   label: string;
//   description?: string;
//   cost?: number;
//   conditions: (state: GameState, source: Card) => boolean;
//   execute: (state: GameState, source: Card) => GameState;
// }

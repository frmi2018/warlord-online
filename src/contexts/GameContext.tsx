import { createContext, useContext } from "react";
import type {
  Card,
  ClickMode,
  Ranks,
  Turn,
  Phase,
  Action,
} from "../types/types";

interface GameContextType {
  clickMode: ClickMode;
  selectedCards: Card[];
  selectedCardsForDiscard: Card[];
  selectedToDisplay: Card | null;
  handleCardClick: (card: Card) => void;
  // GameBoard
  playerRanks: Ranks;
  aiRanks: Ranks;
  phase: Phase;
  turn: Turn;
  logs: string[];
  playerHand: Card[];
  aiHand: Card[];
  actions: Action[];
  actionsPlayer: number;
  actionsAi: number;
  hasStarted: boolean;
  playerDeck: Card[];
  aiDeck: Card[];
  playerDiscardPile: Card[];
  aiDiscardPile: Card[];
  playerDiceValue: number;
  setPlayerDiceValue: React.Dispatch<React.SetStateAction<number>>;
  aiDiceValue: number;
  setAiDiceValue: React.Dispatch<React.SetStateAction<number>>;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context)
    throw new Error("useGameContext must be used within GameProvider");
  return context;
};

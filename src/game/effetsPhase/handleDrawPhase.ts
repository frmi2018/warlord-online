// src/game/effetsPhase/handleDrawPhase.ts

import type { Dispatch, SetStateAction } from "react";
import type { Card } from "../../types/types";
import { drawCards } from "../actions/drawCards";
import { discardCards } from "../actions/discardCards";

type PlayerDiscardProps = {
  playerHand: Card[];
  setPlayerHand: Dispatch<SetStateAction<Card[]>>;
  playerDiscardPile: Card[];
  setPlayerDiscardPile: Dispatch<SetStateAction<Card[]>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
};

type AiDiscardProps = {
  aiHand: Card[];
  setAiHand: Dispatch<SetStateAction<Card[]>>;
  aiDiscardPile: Card[];
  setAiDiscardPile: Dispatch<SetStateAction<Card[]>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
};

type PlayerDrawProps = {
  playerHand: Card[];
  setPlayerHand: Dispatch<SetStateAction<Card[]>>;
  playerDeck: Card[];
  setPlayerDeck: Dispatch<SetStateAction<Card[]>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
};

type AiDrawProps = {
  aiHand: Card[];
  setAiHand: Dispatch<SetStateAction<Card[]>>;
  aiDeck: Card[];
  setAiDeck: Dispatch<SetStateAction<Card[]>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
};

type DrawCardsProps = {
  playerHand: Card[];
  setPlayerHand: Dispatch<SetStateAction<Card[]>>;
  playerDeck: Card[];
  setPlayerDeck: Dispatch<SetStateAction<Card[]>>;
  aiHand: Card[];
  setAiHand: Dispatch<SetStateAction<Card[]>>;
  aiDeck: Card[];
  setAiDeck: Dispatch<SetStateAction<Card[]>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
  count: number;
};

/**
 * Le joueur pioche UNE carte s'il peut
 */
export function handlePlayerDraw({
  playerDeck,
  setPlayerDeck,
  playerHand,
  setPlayerHand,
  setLogs,
}: PlayerDrawProps) {
  const HAND_SIZE = 5;

  if (playerHand.length < HAND_SIZE && playerDeck.length > 0) {
    const { drawn, updatedDeck } = drawCards(playerDeck, 1);
    setPlayerHand([...playerHand, ...drawn]);
    setPlayerDeck(updatedDeck);
    setLogs(prevLogs => [...prevLogs.slice(-9), `Vous piochez une carte.`]);
  }
}

/**
 * L'IA pioche X cartes
 */
export function handleAIDraw({
  aiDeck,
  setAiDeck,
  aiHand,
  setAiHand,
  setLogs,
  count,
}: AiDrawProps & { count: number }) {
  const cardsToDraw = Math.min(count, aiDeck.length);

  if (cardsToDraw > 0) {
    const { drawn, updatedDeck } = drawCards(aiDeck, cardsToDraw);
    setAiHand([...aiHand, ...drawn]);
    setAiDeck(updatedDeck);

    const message =
      cardsToDraw < count
        ? `L'IA n'a pas assez de cartes, elle pioche seulement ${cardsToDraw} carte(s).`
        : `L'IA pioche ${cardsToDraw} carte(s).`;

    setLogs(prevLogs => [...prevLogs.slice(-9), message]);
  }
}

/**
 * Gère la pioche d'une carte pour chaque joueur
 */
export function handleSimultaneousDraw(props: DrawCardsProps) {
  handlePlayerDraw(props);
  handleAIDraw(props);
}

/**
 * Gère la défausse du joueur
 */
export function handlePlayerDiscard(
  selectedCards: Card[],
  {
    playerHand,
    setPlayerHand,
    playerDiscardPile,
    setPlayerDiscardPile,
    setLogs,
  }: PlayerDiscardProps,
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
 * Gère la défausse automatique de l'IA
 */
export function handleAIDiscard(
  selectedCards: Card[],
  {
    aiHand,
    setAiHand,
    aiDiscardPile,
    setAiDiscardPile,
    setLogs,
  }: AiDiscardProps,
) {
  if (selectedCards.length === 0) {
    setLogs(prevLogs => [
      ...prevLogs.slice(-9),
      "L'IA ne défausse aucune carte",
    ]);
    return;
  }

  const { updatedHand, updatedDiscardPile } = discardCards(
    aiHand,
    aiDiscardPile,
    selectedCards,
  );

  setAiHand(updatedHand);
  setAiDiscardPile(updatedDiscardPile);
  setLogs(prevLogs => [
    ...prevLogs.slice(-9),
    `L'IA défausse ${selectedCards.length} carte(s)`,
  ]);
}

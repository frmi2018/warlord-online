import type { Dispatch, SetStateAction } from "react";
import type { Card, Ranks } from "../../types/types";

import { buildInitialSetup } from "../gameActions/buildInitialSetup";
import { prepareStartingArmyFromCards } from "../../utils/prepareStartingArmyFromCards";
import { drawCards } from "../actions/drawCards";

import { demoDeck } from "../../data/demoDeck";

/**
 * Gère la phase "setup" du jeu.
 * Initialise les états de départ pour le joueur et l'IA :
 * - Génère les armées de départ selon les règles (1 Warlord, 3 pers. niv. 1, 2 pers. niv. 2).
 * - Construit les rangs de départ sur le champ de bataille.
 * - Constitue les decks restants à partir du deck source (demoDeck ici).
 * - Fait piocher 5 cartes à chaque joueur.
 * - Met à jour les logs pour suivre l’avancement.
 *
 * @param setPlayerRanks Setter pour mettre à jour les rangs du joueur.
 * @param setAiRanks Setter pour mettre à jour les rangs de l'IA.
 * @param setPlayerDeck Setter pour mettre à jour le deck du joueur.
 * @param setAiDeck Setter pour mettre à jour le deck de l'IA.
 * @param setPlayerHand Setter pour mettre à jour la main du joueur.
 * @param setAiHand Setter pour mettre à jour la main de l'IA.
 * @param setLogs Setter pour ajouter un message dans le journal.
 */
export function handleSetupPhase(
  setPlayerRanks: Dispatch<SetStateAction<Ranks>>,
  setAiRanks: Dispatch<SetStateAction<Ranks>>,
  setPlayerDeck: Dispatch<SetStateAction<Card[]>>,
  setAiDeck: Dispatch<SetStateAction<Card[]>>,
  setPlayerHand: Dispatch<SetStateAction<Card[]>>,
  setAiHand: Dispatch<SetStateAction<Card[]>>,
  setLogs: Dispatch<SetStateAction<string[]>>,
) {
  setLogs(prevLogs => [...prevLogs.slice(-9), "Choix des cartes de départ."]);

  // Génère les cartes de départ et le deck restant pour le joueur à partir du deck démo
  const {
    startingCards: playerStartingCards,
    remainingDeck: playerRemainingDeck,
  } = buildInitialSetup([...demoDeck]);

  // Même chose pour l'IA (on utilise aussi le même deck démo ici)
  const { startingCards: aiStartingCards, remainingDeck: aiRemainingDeck } =
    buildInitialSetup([...demoDeck]);

  // Message de confirmation
  setLogs(prevLogs => [...prevLogs.slice(-9), "Positionnement des cartes."]);

  // Crée les rangées initiales du joueur avec ses cartes de départ
  const initialPlayerRanks = prepareStartingArmyFromCards(playerStartingCards);
  setPlayerRanks(initialPlayerRanks);

  // Même chose pour l'IA
  const initialAiRanks = prepareStartingArmyFromCards(aiStartingCards);
  setAiRanks(initialAiRanks);

  // Message de confirmation
  setLogs(prevLogs => [...prevLogs.slice(-9), "Création des decks."]);

  // Initialise les decks restants
  setPlayerDeck(playerRemainingDeck);
  setAiDeck(aiRemainingDeck);

  // Message de confirmation
  setLogs(prevLogs => [
    ...prevLogs.slice(-9),
    "Les joueurs piochent 5 cartes.",
  ]);

  // Le joueur pioche 5 cartes depuis son deck
  const { drawn: playerDrawn, updatedDeck: deckAfterPlayerDraw } = drawCards(
    playerRemainingDeck,
    5,
  );

  // L'IA pioche pioche 5 cartes depuis son deck
  const { drawn: aiDrawn, updatedDeck: deckAfterAiDraw } = drawCards(
    aiRemainingDeck,
    5,
  );

  // ✅ Ajout du champ zone
  const playerHandWithZone = playerDrawn.map(card => ({
    ...card,
    zone: "playerHand" as const,
  }));

  const aiHandWithZone = aiDrawn.map(card => ({
    ...card,
    zone: "aiHand" as const,
  }));

  // Mise à jour des mains et du deck final
  setPlayerHand(playerHandWithZone);
  setAiHand(aiHandWithZone);
  setPlayerDeck(deckAfterPlayerDraw);
  setAiDeck(deckAfterAiDraw);

  // Message de confirmation
  setLogs(prevLogs => [...prevLogs.slice(-9), "Mise en place terminée."]);
}

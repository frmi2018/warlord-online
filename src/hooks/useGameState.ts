import { useState } from "react";
import type {
  Phase,
  Turn,
  Card,
  Ranks,
  Action,
  ClickMode,
} from "../types/types";

import { useNextPhase } from "./useNextPhase";

export function useGameState() {
  // ** useSetupState
  const [phase, setPhase] = useState<Phase>("setup");
  const [playerDeck, setPlayerDeck] = useState<Card[]>([]);
  const [aiDeck, setAiDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [aiHand, setAiHand] = useState<Card[]>([]);
  const [playerRanks, setPlayerRanks] = useState<Ranks>([]);
  const [aiRanks, setAiRanks] = useState<Ranks>([]);
  const [logs, setLogs] = useState<string[]>([]);
  // ** useActionPhase
  const [actions, setActions] = useState<Action[]>([]);
  // ** phaseReadyActions
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  // ** phaseDrawActions
  const [selectedCardsForDiscard, setSelectedCardsForDiscard] = useState<
    Card[]
  >([]);
  const [discardStep, setDiscardStep] = useState<"player" | "ai" | "draw">(
    "player",
  );
  const [playerDiscardPile, setPlayerDiscardPile] = useState<Card[]>([]);
  const [aiDiscardPile, setAiDiscardPile] = useState<Card[]>([]);
  // ** phaseInitiativeActions
  const [initiativeWinner, setInitiativeWinner] = useState<Turn>("player");
  const [hasRolled, setHasRolled] = useState<boolean>(false);
  const [isTie, setIsTie] = useState<boolean>(false);
  // ** phaseDecreeActions
  const [turn, setTurn] = useState<Turn>("player");
  const [actionsPlayer, setActionsPlayer] = useState<number>(2);
  const [actionsAi, setActionsAi] = useState<number>(2);
  const [decreeStep, setDecreeStep] = useState<string>("start");
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  // const [hasDiscarded, setHasDiscarded] = useState<boolean>(false);
  const [selectedToDisplay, setSelectedToDisplay] = useState<Card | null>(null);
  const [clickMode, setClickMode] = useState<ClickMode>("display");
  const [aiDiceValue, setAiDiceValue] = useState(12);
  const [playerDiceValue, setPlayerDiceValue] = useState(12);

  const { handleNextPhase } = useNextPhase({
    phase,
    setPhase,
    initiativeWinner,
    setActionsPlayer,
    setActionsAi,
    setTurn,
    setLogs,
    setHasRolled,
    setIsTie,
  });

  const handleCardClick = (card: Card) => {
    switch (clickMode) {
      case "display":
        // Mode par défaut : affichage simple
        setSelectedToDisplay(card);
        break;

      case "discard": {
        // Mode défausse : sélection de cartes de la main du joueur uniquement
        if (card.zone !== "playerHand") {
          // Si ce n'est pas une carte de la main du joueur, on l'affiche juste
          setSelectedToDisplay(card);
          return;
        }

        // Vérifier si la carte est déjà sélectionnée pour défausse
        const isAlreadySelected = selectedCardsForDiscard.some(
          c => c.id === card.id,
        );

        if (isAlreadySelected) {
          // Désélectionner la carte
          setSelectedCardsForDiscard(prev =>
            prev.filter(c => c.id !== card.id),
          );

          // Mettre à jour l'affichage visuel dans playerHand
          const updatedHand = playerHand.map(c =>
            c.id === card.id ? { ...c, selected: false } : c,
          );
          setPlayerHand(updatedHand);

          setLogs(prev => [
            ...prev.slice(-9),
            `Carte ${card.name} désélectionnée pour défausse`,
          ]);
        } else {
          // Sélectionner la carte
          setSelectedCardsForDiscard(prev => [...prev, card]);

          // Mettre à jour l'affichage visuel dans playerHand
          const updatedHand = playerHand.map(c =>
            c.id === card.id ? { ...c, selected: true } : c,
          );
          setPlayerHand(updatedHand);

          setLogs(prev => [
            ...prev.slice(-9),
            `Carte ${card.name} sélectionnée pour défausse`,
          ]);
        }

        // Toujours afficher la carte cliquée
        setSelectedToDisplay(card);
        break;
      }

      case "select":
        // Mode sélection générale : peut sélectionner n'importe quelle carte
        handleCardSelection(card);
        break;

      case "move":
        // Mode déplacement : sélection pour le mouvement
        handleCardSelection(card);
        break;

      case "attack":
        // Mode attaque : sélection pour l'attaque
        handleCardSelection(card);
        break;

      default:
        // Fallback sur display
        setSelectedToDisplay(card);
        console.warn(`Mode de clic non reconnu: ${clickMode}`);
        break;
    }
  };

  // Fonction helper pour la logique de sélection/désélection
  const handleCardSelection = (card: Card) => {
    // vérifier si id de la carte déjà dans la liste de carte
    const isAlreadySelected = selectedCards.some(c => c.id === card.id);

    // Déjà sélectionnée ?
    if (isAlreadySelected) {
      // Désélectionner la carte
      if (card.zone === "playerHand") {
        // Mettre card.selected=false dans playerHand
        const updatedHand = playerHand.map(c =>
          c.id === card.id ? { ...c, selected: false } : c,
        );
        setPlayerHand(updatedHand);

        // Mettre à jour selectedToDisplay avec la version désélectionnée
        const updatedCard = updatedHand.find(c => c.id === card.id);
        if (selectedToDisplay?.id === card.id && updatedCard) {
          setSelectedToDisplay(updatedCard);
        }
      }
      // TODO: Gérer d'autres zones (aiHand, ranks, etc.) si nécessaire

      // retirer la carte sélectionnée de la liste
      setSelectedCards(prev => prev.filter(c => c.id !== card.id));

      setLogs(prev => [...prev.slice(-9), `Carte ${card.name} désélectionnée`]);
    } else {
      // Sélectionner la carte
      if (card.zone === "playerHand") {
        // Mettre card.selected=true dans playerHand
        const updatedHand = playerHand.map(c =>
          c.id === card.id ? { ...c, selected: true } : c,
        );
        setPlayerHand(updatedHand);

        // ajouter la carte sélectionnée (version avec selected=true)
        const selectedCard = updatedHand.find(c => c.id === card.id);
        if (selectedCard) {
          setSelectedCards(prev => [...prev, selectedCard]);

          // Mettre à jour selectedToDisplay avec la version sélectionnée
          setSelectedToDisplay(selectedCard);
        }
      } else {
        // Pour les cartes d'autres zones, les ajouter directement avec selected=true
        const cardToAdd = { ...card, selected: true };
        setSelectedCards(prev => [...prev, cardToAdd]);
        setSelectedToDisplay(cardToAdd);
      }

      setLogs(prev => [...prev.slice(-9), `Carte ${card.name} sélectionnée`]);
    }
  };

  return {
    // ** useSetupState
    playerDeck,
    setPlayerDeck,
    aiDeck,
    setAiDeck,
    playerHand,
    setPlayerHand,
    aiHand,
    setAiHand,
    playerRanks,
    setPlayerRanks,
    aiRanks,
    setAiRanks,
    logs,
    setLogs,
    // ** useActionPhase
    actions,
    setActions,
    // ** phaseReadyActions
    hasStarted,
    setHasStarted,
    // ** phaseDrawActions
    selectedCardsForDiscard,
    setSelectedCardsForDiscard,
    discardStep,
    setDiscardStep,
    playerDiscardPile,
    setPlayerDiscardPile,
    aiDiscardPile,
    setAiDiscardPile,
    // ** phaseInitiativeActions
    initiativeWinner,
    setInitiativeWinner,
    hasRolled,
    setHasRolled,
    isTie,
    setIsTie,
    // ** phaseDecreeActions
    turn,
    setTurn,
    actionsPlayer,
    setActionsPlayer,
    actionsAi,
    setActionsAi,
    decreeStep,
    setDecreeStep,
    phase,
    selectedCards,
    setSelectedCards,
    // ** nextPhase
    handleNextPhase,
    selectedToDisplay,
    clickMode,
    setClickMode,
    handleCardClick, // Retourner la fonction
    aiDiceValue,
    setAiDiceValue,
    playerDiceValue,
    setPlayerDiceValue,
  };
}

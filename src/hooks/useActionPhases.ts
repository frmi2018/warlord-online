import { useEffect, useCallback, useMemo, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import type {
  Action,
  Card,
  Phase,
  Turn,
  Ranks,
  ClickMode,
} from "../types/types";

// Actions possibles durant les phases
import { phaseSetupActions } from "../game/actionsPhase/phaseSetupActions";
import { phaseReadyActions } from "../game/actionsPhase/phaseReadyActions";
import { phaseDrawActions } from "../game/actionsPhase/phaseDrawActions";
import { phaseInitiativeActions } from "../game/actionsPhase/phaseInitiativeActions";
import { phaseDecreeActions } from "../game/actionsPhase/phaseDecreeActions";
import { phaseEndTurnActions } from "../game/actionsPhase/phaseEndTurnActions";

interface Props {
  playerDeck: Card[];
  setPlayerDeck: Dispatch<SetStateAction<Card[]>>;
  aiDeck: Card[];
  setAiDeck: Dispatch<SetStateAction<Card[]>>;
  playerHand: Card[];
  setPlayerHand: Dispatch<SetStateAction<Card[]>>;
  aiHand: Card[];
  setAiHand: Dispatch<SetStateAction<Card[]>>;
  playerRanks: Ranks;
  setPlayerRanks: Dispatch<SetStateAction<Ranks>>;
  aiRanks: Ranks;
  setAiRanks: Dispatch<SetStateAction<Ranks>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
  setActions: Dispatch<SetStateAction<Action[]>>;
  hasStarted: boolean;
  setHasStarted: Dispatch<SetStateAction<boolean>>;
  selectedCardsForDiscard: Card[];
  setSelectedCardsForDiscard: Dispatch<SetStateAction<Card[]>>;
  discardStep: "player" | "ai" | "draw";
  setDiscardStep: Dispatch<SetStateAction<"player" | "ai" | "draw">>;
  playerDiscardPile: Card[];
  setPlayerDiscardPile: Dispatch<SetStateAction<Card[]>>;
  aiDiscardPile: Card[];
  setAiDiscardPile: Dispatch<SetStateAction<Card[]>>;
  initiativeWinner: Turn;
  setInitiativeWinner: Dispatch<SetStateAction<Turn>>;
  hasRolled: boolean;
  setHasRolled: Dispatch<SetStateAction<boolean>>;
  isTie: boolean;
  setIsTie: Dispatch<SetStateAction<boolean>>;
  turn: Turn;
  setTurn: Dispatch<SetStateAction<Turn>>;
  actionsPlayer: number;
  setActionsPlayer: Dispatch<SetStateAction<number>>;
  actionsAi: number;
  setActionsAi: Dispatch<SetStateAction<number>>;
  // decreeStep: string;
  // setDecreeStep: Dispatch<SetStateAction<string>>;
  phase: Phase;
  selectedCards: Card[]; // Nouveau : tableau des cartes sélectionnées
  setSelectedCards: Dispatch<SetStateAction<Card[]>>; // Nouveau : setter
  handleNextPhase: () => void;
  // selectedCard: Card | null;
  // targetCard: Card | null;
  // hasAIDiscardedRef: React.MutableRefObject<boolean>;
  // hasAIDrawnRef: React.MutableRefObject<boolean>;
  // hasPhaseHandledRef: React.MutableRefObject<boolean>;
  clickMode: ClickMode;
  setClickMode: Dispatch<SetStateAction<ClickMode>>;
  setPlayerDiceValue: Dispatch<SetStateAction<number>>;
  setAiDiceValue: Dispatch<SetStateAction<number>>;
}

export function useActionPhases({
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
  // logs,
  setLogs,
  // ** useActionPhase
  // actions,
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
  clickMode,
  setClickMode,
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
  // decreeStep,
  // setDecreeStep,
  phase,
  selectedCards,
  setSelectedCards,
  // ** nextPhase
  handleNextPhase,
  setPlayerDiceValue,
  setAiDiceValue,
}: Props) {
  // Mémoriser les actions de setup
  const setupActions = useMemo(() => {
    return phaseSetupActions({
      setPlayerDeck,
      setAiDeck,
      setPlayerHand,
      setAiHand,
      setPlayerRanks,
      setAiRanks,
      hasStarted,
      setHasStarted,
      setLogs,
      handleNextPhase,
    });
  }, [
    setPlayerDeck,
    setAiDeck,
    setPlayerHand,
    setAiHand,
    setPlayerRanks,
    setAiRanks,
    hasStarted,
    setHasStarted,
    setLogs,
    handleNextPhase,
  ]);

  // Mémoriser les actions de ready
  const readyActions = useMemo(() => {
    return phaseReadyActions({
      playerRanks,
      setPlayerRanks,
      aiRanks,
      setAiRanks,
      hasStarted,
      setHasStarted,
      setLogs,
      handleNextPhase,
    });
  }, [
    playerRanks,
    setPlayerRanks,
    aiRanks,
    setAiRanks,
    hasStarted,
    setHasStarted,
    setLogs,
    handleNextPhase,
  ]);

  const hasAIDiscardedRef = useRef(false);
  const hasAIDrawnRef = useRef(false);

  // Mémoriser les actions de draw
  const drawActions = useMemo(() => {
    return phaseDrawActions({
      playerDeck,
      setPlayerDeck,
      aiDeck,
      setAiDeck,
      playerHand,
      setPlayerHand,
      aiHand,
      setAiHand,
      setLogs,
      selectedCardsForDiscard,
      setSelectedCardsForDiscard,
      discardStep,
      setDiscardStep,
      playerDiscardPile,
      setPlayerDiscardPile,
      aiDiscardPile,
      setAiDiscardPile,
      setClickMode,
      clickMode,
      phase,
      handleNextPhase,
      hasAIDiscardedRef,
      hasAIDrawnRef,
    });
  }, [
    playerDeck,
    setPlayerDeck,
    aiDeck,
    setAiDeck,
    playerHand,
    setPlayerHand,
    aiHand,
    setAiHand,
    setLogs,
    selectedCardsForDiscard,
    setSelectedCardsForDiscard,
    discardStep,
    setDiscardStep,
    playerDiscardPile,
    setPlayerDiscardPile,
    aiDiscardPile,
    setAiDiscardPile,
    setClickMode,
    clickMode,
    phase,
    handleNextPhase,
  ]);

  // Mémoriser les actions d'initiative
  const initiativeActions = useMemo(() => {
    return phaseInitiativeActions({
      setLogs,
      setInitiativeWinner,
      hasRolled,
      setHasRolled,
      isTie,
      setIsTie,
      handleNextPhase,
      setPlayerDiceValue,
      setAiDiceValue,
    });
  }, [
    setLogs,
    setInitiativeWinner,
    hasRolled,
    setHasRolled,
    isTie,
    setIsTie,
    handleNextPhase,
    setPlayerDiceValue,
    setAiDiceValue,
  ]);

  const hasPhaseHandledRef = useRef(false);

  // Mémoriser les actions de decree
  const decreeActions = useMemo(() => {
    return phaseDecreeActions({
      aiHand,
      setAiHand,
      playerRanks,
      setPlayerRanks,
      aiRanks,
      setAiRanks,
      setLogs,
      initiativeWinner,
      turn,
      setTurn,
      actionsPlayer,
      setActionsPlayer,
      actionsAi,
      setActionsAi,
      // decreeStep,
      // setDecreeStep,
      // phase,
      selectedCards,
      setSelectedCards,
      handleNextPhase,
      hasPhaseHandledRef,
    });
  }, [
    aiHand,
    setAiHand,
    playerRanks,
    setPlayerRanks,
    aiRanks,
    setAiRanks,
    setLogs,
    initiativeWinner,
    turn,
    setTurn,
    actionsPlayer,
    setActionsPlayer,
    actionsAi,
    setActionsAi,
    // decreeStep,
    // setDecreeStep,
    // phase,
    selectedCards,
    setSelectedCards,
    handleNextPhase,
  ]);

  // Mémoriser les actions de endTurn
  const endturnActions = useMemo(() => {
    return phaseEndTurnActions({
      setLogs,
      handleNextPhase,
    });
  }, [setLogs, handleNextPhase]);

  // Fonction pour gérer les actions selon la phase
  const updateActionsForPhase = useCallback(() => {
    switch (phase) {
      case "setup":
        setActions(setupActions);
        break;

      case "ready":
        setActions(readyActions);
        break;

      case "draw":
        setActions(drawActions);
        break;

      case "initiative":
        setActions(initiativeActions);
        break;

      case "decree":
        setActions(decreeActions);
        break;

      case "endturn":
      default:
        setActions(endturnActions);
    }
  }, [
    phase,
    setupActions,
    readyActions,
    drawActions,
    initiativeActions,
    decreeActions,
    endturnActions,
    setActions,
  ]);

  // Effet principal qui se déclenche quand la phase change ou quand les actions spécifiques changent
  useEffect(() => {
    updateActionsForPhase();
  }, [updateActionsForPhase]);

  // Effet séparé pour la phase decree qui nécessite des mises à jour plus fréquentes
  useEffect(() => {
    if (phase === "decree") {
      setActions(decreeActions);
    }
  }, [phase, decreeActions, setActions]);
}

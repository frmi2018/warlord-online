// GamePage.tsx
import GameBoard from "../components/GameBoard";

// Hooks personnalisés
import { useGameState } from "../hooks/useGameState";
import { useActionPhases } from "../hooks/useActionPhases";

const GamePage: React.FC = () => {
  // États globaux du jeu
  const {
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
    clickMode, // ✅ Ajouter clickMode
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
    selectedToDisplay,
    handleCardClick,
  } = useGameState();

  // Définir les boutons d'action selon la phase
  useActionPhases({
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
    setClickMode,
    clickMode,
  });

  return (
    <GameBoard
      playerRanks={playerRanks}
      aiRanks={aiRanks}
      phase={phase}
      turn={turn}
      logs={logs}
      hand={playerHand}
      aiHand={aiHand}
      actions={actions}
      actionsPlayer={actionsPlayer}
      actionsAi={actionsAi}
      hasStarted={hasStarted}
      selectedCards={selectedCards}
      selectedToDisplay={selectedToDisplay}
      handleCardClick={handleCardClick}
    />
  );
};

export default GamePage;

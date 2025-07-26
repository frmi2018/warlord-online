// GamePage.tsx
import { GameContext } from "../contexts/GameContext";

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
    actions,
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
    aiDiceValue,
    setAiDiceValue,
    playerDiceValue,
    setPlayerDiceValue,
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
    setPlayerDiceValue,
    setAiDiceValue,
  });

  return (
    <GameContext.Provider
      value={{
        clickMode,
        selectedCards,
        selectedCardsForDiscard,
        selectedToDisplay,
        handleCardClick,
        // GameBoard
        playerRanks,
        aiRanks,
        phase,
        turn,
        logs,
        playerHand,
        aiHand,
        actions,
        actionsPlayer,
        actionsAi,
        hasStarted,
        playerDeck,
        aiDeck,
        playerDiscardPile,
        aiDiscardPile,
        playerDiceValue,
        setPlayerDiceValue,
        aiDiceValue,
        setAiDiceValue,
      }}
    >
      <GameBoard />
    </GameContext.Provider>
  );
};

export default GamePage;

// src/game/actionsPhase/phaseDecreeActions.ts

import type { Dispatch, SetStateAction } from "react";
import type { Action, Card, Ranks, Turn } from "../../types/types";

interface PhaseDecreeActionsProps {
  aiHand: Card[];
  setAiHand: Dispatch<SetStateAction<Card[]>>;
  playerRanks: Ranks;
  setPlayerRanks: Dispatch<SetStateAction<Ranks>>;
  aiRanks: Ranks;
  setAiRanks: Dispatch<SetStateAction<Ranks>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
  initiativeWinner: Turn;
  turn: Turn;
  setTurn: Dispatch<SetStateAction<Turn>>;
  actionsPlayer: number;
  setActionsPlayer: Dispatch<SetStateAction<number>>;
  actionsAi: number;
  setActionsAi: Dispatch<SetStateAction<number>>;
  // decreeStep: string;
  // setDecreeStep: Dispatch<SetStateAction<string>>;
  // phase: Phase;
  selectedCards: Card[]; // Nouveau : tableau des cartes sélectionnées
  setSelectedCards: Dispatch<SetStateAction<Card[]>>; // Nouveau : setter
  handleNextPhase: () => void;
  hasPhaseHandledRef: React.MutableRefObject<boolean>;
}

export const phaseDecreeActions = ({
  // aiHand,
  // setAiHand,
  // playerRanks,
  // setPlayerRanks,
  // aiRanks,
  // setAiRanks,
  setLogs,
  // initiativeWinner,
  turn,
  setTurn,
  actionsPlayer,
  setActionsPlayer,
  actionsAi,
  setActionsAi,
  // decreeStep,
  // setDecreeStep,
  // phase,
  // selectedCards,
  // setSelectedCards,
  handleNextPhase,
  hasPhaseHandledRef,
}: PhaseDecreeActionsProps): Action[] => {
  const actions: Action[] = [];
  // const safeActionsPlayer = Math.max(0, actionsPlayer);
  // const safeActionsAi = Math.max(0, actionsAi);

  // 1. Fin de phase - priorité absolue
  if (actionsPlayer <= 0 && actionsAi <= 0 && !hasPhaseHandledRef.current) {
    hasPhaseHandledRef.current = true;
    setLogs(prevLogs => [
      ...prevLogs.slice(-9),
      "Les deux joueurs ont terminé leurs actions. Vous pouvez passer à la phase suivante.",
    ]);
    actions.push({
      label: "PHASE ENDTURN",
      onClick: () => {
        hasPhaseHandledRef.current = false;
        try {
          setLogs(prevLogs => [
            ...prevLogs.slice(-9),
            `Fin de la phase DECREE`,
          ]);
          handleNextPhase();
        } catch (error) {
          console.error("🔍 DEBUG: Erreur dans onClick:", error);
        }
      },
      enabled: true,
    });
  } else {
    if (turn === "player") {
      actions.push({
        label: "PASSER",
        onClick: () => {
          setLogs(prevLogs => [
            ...prevLogs.slice(-9),
            `Vous passez votre tour.`,
          ]);
          setActionsPlayer(0);
          setTurn("ai");
        },

        enabled: true,
      });
    } else {
      actions.push({
        label: "PASSER AI",
        onClick: () => {
          setLogs(prevLogs => [...prevLogs.slice(-9), `AI passe son tour.`]);
          setActionsAi(0);
          setTurn("player");
        },
        enabled: true,
      });
    }
  }

  return actions;
};

// src/game/actionsPhase/phaseDrawActions.ts

import type { Dispatch, SetStateAction } from "react";

import type { Action, Card, Phase } from "../../types/types";
import {
  handlePlayerDiscard,
  handleAIDiscard,
  handlePlayerDraw,
  handleAIDraw,
} from "../effetsPhase/handleDrawPhase";

interface PhaseDrawActionsProps {
  playerDeck: Card[];
  setPlayerDeck: Dispatch<SetStateAction<Card[]>>;
  aiDeck: Card[];
  setAiDeck: Dispatch<SetStateAction<Card[]>>;
  playerHand: Card[];
  setPlayerHand: Dispatch<SetStateAction<Card[]>>;
  aiHand: Card[];
  setAiHand: Dispatch<SetStateAction<Card[]>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
  selectedCardsForDiscard: Card[];
  setSelectedCardsForDiscard: Dispatch<SetStateAction<Card[]>>;
  discardStep: "player" | "ai" | "draw";
  setDiscardStep: Dispatch<SetStateAction<"player" | "ai" | "draw">>;
  playerDiscardPile: Card[];
  setPlayerDiscardPile: Dispatch<SetStateAction<Card[]>>;
  aiDiscardPile: Card[];
  setAiDiscardPile: Dispatch<SetStateAction<Card[]>>;
  handleNextPhase: () => void;
  hasAIDiscardedRef: React.MutableRefObject<boolean>;
  hasAIDrawnRef: React.MutableRefObject<boolean>;
  setClickMode: Dispatch<
    SetStateAction<"display" | "select" | "discard" | "move" | "attack">
  >;
  clickMode: "display" | "select" | "discard" | "move" | "attack";
  phase: Phase;
}

export const phaseDrawActions = ({
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
  handleNextPhase,
  hasAIDiscardedRef,
  hasAIDrawnRef,
  setClickMode,
  clickMode,
  phase,
}: PhaseDrawActionsProps): Action[] => {
  const HAND_SIZE = 5;
  const actions: Action[] = [];

  // === ÉTAPE 1 : DÉFAUSSE DU JOUEUR ===
  if (discardStep === "player") {
    if (playerHand.length > 0) {
      // Activer le mode discard si pas déjà actif
      if (clickMode !== "discard" && phase === "draw") {
        setClickMode("discard");
      }
      // Afficher les instructions
      const selectedCount = selectedCardsForDiscard.length;
      const instruction =
        selectedCount === 0
          ? "Cliquez sur les cartes à défausser"
          : `${selectedCount} carte(s) sélectionnée(s)`;

      actions.push({
        label: instruction,
        onClick: () => {}, // Action informative seulement
        enabled: false,
        description:
          "Cliquez directement sur vos cartes pour les sélectionner/désélectionner",
      });

      // Bouton confirmer défausse (toujours visible)
      actions.push({
        label:
          selectedCount > 0
            ? `DÉFAUSSER ${selectedCount} CARTE(S)`
            : "PASSER LA DÉFAUSSE",
        onClick: () => {
          if (selectedCount > 0) {
            handlePlayerDiscard(selectedCardsForDiscard, {
              playerHand,
              setPlayerHand,
              playerDiscardPile,
              setPlayerDiscardPile,
              setLogs,
            });
          } else {
            setLogs(prevLogs => [
              ...prevLogs.slice(-9),
              "Vous ne défaussez aucune carte",
            ]);
          }

          // Nettoyer et passer à l'IA
          setSelectedCardsForDiscard([]);
          setClickMode("display");
          setDiscardStep("ai");
        },
        enabled: true,
      });

      // Bouton pour tout désélectionner (si des cartes sont sélectionnées)
      if (selectedCount > 0) {
        actions.push({
          label: "TOUT DÉSÉLECTIONNER",
          onClick: () => {
            setSelectedCardsForDiscard([]);
            setLogs(prevLogs => [
              ...prevLogs.slice(-9),
              "Toutes les cartes désélectionnées",
            ]);
          },
          enabled: true,
        });
      }
    } else {
      // Pas de cartes en main
      actions.push({
        label: "PAS DE DÉFAUSSE (main vide)",
        onClick: () => {
          setDiscardStep("ai");
          setLogs(prevLogs => [
            ...prevLogs.slice(-9),
            "Aucune carte à défausser",
          ]);
        },
        enabled: true,
      });
    }
  }

  // === ÉTAPE 2 : DÉFAUSSE DE L'IA (automatique) ===
  else if (discardStep === "ai" && !hasAIDiscardedRef.current) {
    // S'assurer que le clickMode est en display pendant l'IA
    setClickMode("display");

    hasAIDiscardedRef.current = true;

    actions.push({
      label: "L'IA réfléchit...",
      onClick: () => {},
      enabled: false,
      description: "L'intelligence artificielle choisit ses cartes à défausser",
    });

    const maxDiscard = Math.min(2, aiHand.length);
    const discardCount = Math.floor(Math.random() * (maxDiscard + 1));
    // mélanger la main de l'IA
    const shuffledHand = [...aiHand].sort(() => Math.random() - 0.5);
    // sélectionner les cartes
    const selectedCards = shuffledHand.slice(0, discardCount);

    setTimeout(() => {
      handleAIDiscard(selectedCards, {
        aiHand,
        setAiHand,
        aiDiscardPile,
        setAiDiscardPile,
        setLogs,
      });
      setDiscardStep("draw");
    }, 1000);
  }

  // === ÉTAPE 3 : PIOCHE ===
  else if (discardStep === "draw") {
    // Mode display pour la pioche
    setClickMode("display");

    const canPlayerDraw =
      playerHand.length < HAND_SIZE && playerDeck.length > 0;
    const canAiDraw = aiHand.length < HAND_SIZE && aiDeck.length > 0;

    // Information sur l'état des mains
    actions.push({
      label: `Joueur: ${playerHand.length}/${HAND_SIZE} | IA: ${aiHand.length}/${HAND_SIZE}`,
      onClick: () => {},
      enabled: false,
      description: "État actuel des mains",
    });

    // Bouton pioche pour le joueur
    if (canPlayerDraw) {
      actions.push({
        label: "PIOCHER UNE CARTE",
        onClick: () => {
          handlePlayerDraw({
            playerDeck,
            setPlayerDeck,
            playerHand,
            setPlayerHand,
            setLogs,
          });
        },
        enabled: true,
        description: `Piocher une carte (${playerDeck.length} restantes dans le deck)`,
      });
    } else if (playerHand.length >= HAND_SIZE) {
      actions.push({
        label: "MAIN PLEINE",
        onClick: () => {},
        enabled: false,
        description: "Vous avez déjà 5 cartes en main",
      });
    } else {
      actions.push({
        label: "DECK VIDE",
        onClick: () => {},
        enabled: false,
        description: "Plus de cartes à piocher",
      });
    }

    // IA pioche automatiquement si seule elle peut piocher
    if (!canPlayerDraw && canAiDraw && !hasAIDrawnRef.current) {
      hasAIDrawnRef.current = true;

      actions.push({
        label: "L'IA pioche...",
        onClick: () => {},
        enabled: false,
        description: "L'intelligence artificielle pioche ses cartes",
      });

      setTimeout(() => {
        handleAIDraw({
          aiDeck,
          setAiDeck,
          aiHand,
          setAiHand,
          setLogs,
          count: HAND_SIZE - aiHand.length,
        });
      }, 800);
    }

    // Bouton phase suivante
    actions.push({
      label: "PHASE INITIATIVE",
      onClick: () => {
        // Réinitialisation pour la prochaine phase draw
        setDiscardStep("player");
        hasAIDiscardedRef.current = false;
        hasAIDrawnRef.current = false;
        setSelectedCardsForDiscard([]);
        setClickMode("display");
        setLogs(prevLogs => [...prevLogs.slice(-9), "Fin de la phase DRAW"]);
        handleNextPhase();
      },
      enabled: true,
      description: "Passer à la phase suivante",
    });
  }

  return actions;
};

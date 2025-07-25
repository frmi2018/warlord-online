// src/components/Card.tsx
import type { Card as CardType } from "../types/types";
import { classIcons, factionColors } from "../types/types";
import styles from "./Card.module.css";

interface CardProps {
  card: CardType;
  onClick?: () => void; // Optionnel, pour les cas où on ne veut pas de clic
}

export const Card = ({ card, onClick }: CardProps) => {
  const {
    name,
    level,
    attackValues,
    armorClass,
    skill,
    hitPoints,
    faction,
    classIcon,
    alignment,
    traits,
    cardType = "character", // Valeur par défaut pour les cartes existantes
  } = card;

  // TODO 3 - Fonction pour déterminer si on doit afficher la bordure jaune
  const shouldShowYellowBorder = (): boolean => {
    if (!card?.selected) return false;

    // Bordure jaune uniquement si sélectionné ET dans la main ou rangs du joueur
    return card.zone === "playerHand" || card.zone === "ranks";
  };

  // TODO 2 & 3 - Logique de couleur de bordure
  const computedBorderColor = (): string => {
    // Si doit afficher bordure jaune (sélectionné + zone joueur)
    if (shouldShowYellowBorder()) {
      return "yellow";
    }

    // Sinon, couleur selon le type de carte
    switch (cardType) {
      case "item":
        return "gray";
      case "action":
        return "red";
      case "character":
      default:
        // Pour les characters, utiliser la couleur de faction ou gris par défaut
        return faction ? factionColors[faction] ?? "gray" : "gray";
    }
  };

  const borderStyle = {
    border: `4px solid ${computedBorderColor()}`,
  };

  return (
    <div
      role="button"
      aria-label={name}
      className={styles.card}
      onClick={onClick}
      style={{
        ...borderStyle,
      }}
    >
      {cardType !== "action" ? (
        <div className={styles.stats}>
          {attackValues ? (
            <span className={styles.attack}>⚔️ {attackValues.join(" / ")}</span>
          ) : null}

          {armorClass ? (
            <span className={styles.armor}>🛡️ {armorClass}</span>
          ) : null}
        </div>
      ) : (
        <span className={styles.armor}>&nbsp;</span>
      )}

      <div className={styles.name}>{name}</div>

      <div className={styles.image}></div>

      <div className={styles.classLine}>
        <span
          className={`${styles.classCircle} ${
            alignment === "good" ? styles.good : styles.evil
          }`}
        >
          {classIcons[classIcon]}
        </span>
        <span className={styles.levelText}>{level}</span>
        <span style={{ color: "white" }}>{cardType.toUpperCase()}</span>
      </div>

      <div className={styles.factionLine}>
        {faction && <div className={styles.faction}>{faction}</div>}
      </div>

      {traits && traits.length > 0 && (
        <div className={styles.traits}>
          {traits.map((trait, i) => (
            <span key={i} className={styles.trait}>
              {trait}
            </span>
          ))}
        </div>
      )}

      {cardType !== "action" && cardType !== "item" ? (
        <div className={styles.stats}>
          {skill ? <span className={styles.skill}>💎 {skill}</span> : null}

          {hitPoints ? <span className={styles.hp}>❤️ {hitPoints}</span> : null}
        </div>
      ) : (
        <span className={styles.armor}>&nbsp;</span>
      )}
    </div>
  );
};

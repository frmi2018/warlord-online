// src/components/Card.tsx
import type { Card as CardType } from "../types/types";
import { factionColors } from "../types/types";
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
    cardType,
    zone,
  } = card;

  // TODO 3 - Fonction pour déterminer si on doit afficher la bordure jaune
  const shouldShowYellowBorder = (): boolean => {
    if (!card?.selected) return false;

    // Bordure jaune uniquement si sélectionné ET dans une zone possible
    return (
      zone === "playerHand" ||
      zone === "aiHand" ||
      zone === "playerRanks" ||
      zone === "aiRanks"
    );
  };

  // TODO 2 & 3 - Logique de couleur de bordure
  const computedBorderColor = (): string => {
    // Si doit afficher bordure jaune (sélectionné + zone possible)
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
      onClick={() => {
        console.log({ card });
        onClick?.(); // exécute si défini
      }}
      style={{
        ...borderStyle,
      }}
    >
      {cardType !== "action" ? (
        <div className={styles.stats}>
          {attackValues ? (
            <span className={styles.attack}>⚔️ {attackValues.join(" / ")}</span>
          ) : (
            <span className={styles.attack}>⚔️</span>
          )}

          {armorClass ? (
            <span className={styles.armor}>🛡️ {armorClass}</span>
          ) : (
            <span className={styles.armor}>🛡️</span>
          )}
        </div>
      ) : (
        <span className={styles.armor}>&nbsp;</span>
      )}

      <div className={styles.name}>{name}</div>

      {/* Image + classe icone */}
      <div className={styles.imageContainer}>
        <div className={styles.image}></div>

        <div className={styles.classLine}>
          {/* Classe / Alignement */}
          <div className={styles.classCircleWrapper}>
            <div className={styles.classCircleBorder}></div>
            <div className={styles.classCircleContent}>
              <>
                {alignment === "good" || alignment === "evil" ? (
                  <img
                    src={`/images/${classIcon}-${alignment}.png`}
                    alt={classIcon}
                    className={styles.classIconImage}
                  />
                ) : card.cardType === "action" ? (
                  <img
                    src={`/images/${classIcon}-action.png`}
                    alt={classIcon}
                    className={styles.classIconImage}
                  />
                ) : card.cardType === "item" ? (
                  <img
                    src={`/images/${classIcon}-item.png`}
                    alt={classIcon}
                    className={styles.classIconImage}
                  />
                ) : null}
              </>

              <span
                className={styles.levelText}
                style={{ color: alignment === "good" ? "black" : "white" }}
              >
                {level}
              </span>
            </div>
          </div>
          {/* Type de carte */}
          <span>{cardType.toUpperCase()}</span>
        </div>
      </div>

      <div className={styles.factionLine}>
        {faction && <div className={styles.faction}>{faction}</div>}
        {traits && traits.length > 0 && (
          <div className={styles.traits}>
            {traits.map((trait, i) => (
              <span key={i} className={styles.trait}>
                {trait}
              </span>
            ))}
          </div>
        )}
      </div>

      <button>Show text</button>

      <div className={styles.stats}>
        {cardType !== "action" && cardType !== "item" ? (
          <>
            <span className={styles.skill}>💎 {skill}</span>
            <span className={styles.hp}>❤️ {hitPoints}</span>
          </>
        ) : (
          <>
            <span className={styles.skill}>&nbsp;</span>
            <span className={styles.hp}>&nbsp;</span>
          </>
        )}
      </div>
    </div>
  );
};

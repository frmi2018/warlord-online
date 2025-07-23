// src/components/Card.tsx
import type { Card as CardType } from "../types/types";
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
    className,
    alignment,
    traits,
  } = card;

  // Définir l'icône de classe
  const classIcons: Record<string, string> = {
    starburst: "✨", // Cleric
    gauntlet: "🛡️", // Fighter
    glove: "🧤", // Rogue
    scroll: "📜", // Wizard
    oval: "⭕", // Multi/classless
  };

  // Déterminer la couleur de bordure
  const factionColors: Record<string, string> = {
    Elf: "#b1b4b6ff",
    Mercenary: "#2197dbff",
    "Free Kingdoms": "#dd982fff",
    Deverenian: "#6d0202ff",
    Dwarf: "#916412ff",
    Nothrog: "#075a2aff",
  };

  // Couleur bordure carte
  const computedBorderColor = card?.selected
    ? "yellow" // Jaune pour les cartes sélectionnées
    : card?.faction
    ? factionColors[card.faction] ?? "gray"
    : "gray";

  const borderStyle = {
    border: `4px solid ${computedBorderColor}`,
    // Optionnel: ajouter une transition pour un effet smooth
    transition: "border-color 0.2s ease",
  };

  return (
    <div
      role="button"
      aria-label={name}
      className={styles.card}
      onClick={onClick} // ✅ Utiliser directement la prop onClick
      style={{
        ...borderStyle,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div className={styles.stats}>
        <span className={styles.attack}>⚔️ {attackValues.join(" / ")}</span>
        <span className={styles.armor}>🛡️ {armorClass}</span>
      </div>
      <div className={styles.name}>{name}</div>

      <div className={styles.classLine}>
        <span
          className={`${styles.classCircle} ${
            alignment === "good" ? styles.good : styles.evil
          }`}
          title={className}
        >
          {classIcons[classIcon]}
        </span>
        <span className={styles.levelText}>lvl {level}</span>
      </div>

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

      <div className={styles.stats}>
        <span className={styles.skill}>💎 {skill}</span>
        <span className={styles.hp}>❤️ {hitPoints}</span>
      </div>
    </div>
  );
};

// Utilitaires pour les dés
// src/utils/dice.ts

/**
 * Lance un dé à 20 faces et retourne un nombre entre 1 et 20
 */
export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

/**
 * Vérifie si un jet de dé est un critique (20 naturel)
 */
export function isCritical(roll: number): boolean {
  return roll === 20;
}

/**
 * Lance un dé avec modificateurs et retourne le résultat
 */
export function rollWithModifier(
  diceRoll: number,
  modifier: number = 0,
): number {
  return diceRoll + modifier;
}

/**
 * Type pour représenter un résultat de dé
 */
export interface DiceResult {
  roll: number;
  modifier: number;
  total: number;
  isCritical: boolean;
}

/**
 * Lance un dé complet avec modificateurs et informations
 */
export function rollD20WithModifier(modifier: number = 0): DiceResult {
  const roll = rollD20();
  const total = roll + modifier;
  const critical = isCritical(roll);

  return {
    roll,
    modifier,
    total,
    isCritical: critical,
  };
}

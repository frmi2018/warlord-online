// src/game/gamesActions/shuffle.ts

/**
 * Mélange aléatoirement un tableau en utilisant l'algorithme de Fisher-Yates.
 * Retourne un nouveau tableau sans modifier l'original.
 *
 * @param array Le tableau à mélanger
 * @returns Un nouveau tableau avec les éléments mélangés
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

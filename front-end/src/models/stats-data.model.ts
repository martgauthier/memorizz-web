/**
 * Représente les données pour un type de statistiques, sur une période donnée, pour toutes les difficultés (+ "en moyenne")
 */
export interface FullDataForSingleStat {
  statType: "errorsPerGame" | "timeToDiscoverFullPair" | "preferredDifficultyMode" | "errorsOnWholeGame" | "gameDuration",
  /**
   * Duration between the two mesures {@link DataPerDifficultyForSingleStat.lastTimeValue} and {@link DataPerDifficultyForSingleStat.nowValue}
   * (1 month, 2 months, 3 months, 6 months, 8 months, 12 months)
   */
  duration: number,
  difficulty: AllDifficultiesData
}

export interface GamesQuantity {
  simple: number,
  medium: number,
  hard: number
}

export interface AllDifficultiesData {
  simple: DataPerDifficultyForSingleStat,
  medium: DataPerDifficultyForSingleStat,
  hard: DataPerDifficultyForSingleStat
}

/**
 * Représente les données pour un type de statistiques, pour une difficulté donnée, sur une période donnée
 */
export interface DataPerDifficultyForSingleStat {
  lastTimeValue: number,
  nowValue: number
}

/**
 * Function used to fill an empty DatePerDifficultyForSingleStat instance
 */
export function createDefaultDataPerDifficultyForSingleStat(): DataPerDifficultyForSingleStat {
  return {
    lastTimeValue: 0,
    nowValue: 0
  }
}

/**
 * Interface qui stocke une sélection de statistique particulière (utile pour savoir quelle statistique afficher dans la courbe)
 */
export interface SelectedStat {
  userId: number,
  cardId: number,
  statType: string
}

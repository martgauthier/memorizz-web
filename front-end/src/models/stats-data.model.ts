/**
 * Représente les données pour un type de statistiques, sur une période donnée, pour toutes les difficultés (+ "en moyenne")
 */
export interface FullDataForSingleStat {
  statType: "errorsPerGame" | "timeToDiscoverFullPair" | "errorPercentageOnWholeGame" | "meanGameDuration",
  /**
   * Duration between the two mesures {@link DataPerDifficultyForSingleStat.lastTimeValue} and {@link DataPerDifficultyForSingleStat.nowValue}
   * (1 month, 2 months, 3 months, 6 months, 8 months, 12 months)
   */
  duration: number,
  difficulty: AllDifficultiesData
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
  nowValue: number,
  /**
   * Indique le nombre de parties jouées avec ce mode de difficulté, sur l'écart de temps sélectionné
   */
  gamesQuantity: number
}

/**
 * Function used to fill an empty DatePerDifficultyForSingleStat instance
 */
export function createDefaultDataPerDifficultyForSingleStat(): DataPerDifficultyForSingleStat {
  return {
    lastTimeValue: 0,
    nowValue: 0,
    gamesQuantity: 0
  }
}

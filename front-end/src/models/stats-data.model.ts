/**
 * Représente les données pour un type de statistiques, sur une période donnée, pour toutes les difficultés (+ "en moyenne")
 */
export interface FullDataForSingleStat {
  /**
   * Defines the stat type (example: "Error numbers during a game")
   */
  statType: string,
  /**
   * String that effectively describe stat in french language
   */
  statDescription: string,
  /**
   * Duration between the two mesures {@link DataPerDifficultyForSingleStat.lastTimeValue} and {@link DataPerDifficultyForSingleStat.nowValue}
   * (1 month, 2 months, 3 months, 6 months, 8 months, 12 months)
   */
  duration: number,
  lastTimeDate: string,
  nowDate: string,
  difficulty: {
    simple: DataPerDifficultyForSingleStat,
    medium: DataPerDifficultyForSingleStat,
    hard: DataPerDifficultyForSingleStat,
    overall: DataPerDifficultyForSingleStat
  }
}

/**
 * Représente les données pour un type de statistiques, pour une difficulté donnée, sur une période donnée
 */
export interface DataPerDifficultyForSingleStat {
  lastTimeValue: number,
  nowValue: number,
  dates: {
    lastTimeDate: string,
    nowDate: string
  }
}

/**
 * Function used to fill an empty DatePerDifficultyForSingleStat instance
 */
export function createDefaultDataPerDifficultyForSingleStat(): DataPerDifficultyForSingleStat {
  return {
    dates: {
      lastTimeDate: "",
      nowDate: ""
    },
    lastTimeValue: 0,
    nowValue: 0
  }
}

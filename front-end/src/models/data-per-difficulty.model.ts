/**
 * Représente les données pour un type de statistiques, sur une période donnée, pour une difficulté en particulier
 */
export interface DataPerDifficulty {
  /**
   * Defines the stat type (example: "Error numbers during a game")
   */
  statType: string,
  difficulty: "simple" | "medium" | "hard" | "overall",
  /**
   * Duration between the two mesures {@link DataPerDifficulty.lastTime} and {@link DataPerDifficulty.now}
   * (1 month, 2 months, 3 months, 6 months, 8 months, 12 months)
   */
  duration: number,
  lastTime: {
    date: string,//faire de la date un timestamp ?
    value: number
  }
  now: {
    date: string,//faire de la date un timestamp ?
    value: number
  }
}

import {FullDataForSingleStat} from "../models/stats-data.model";

const JACQUELINE_ERRORS_PER_GAME_MOCK: FullDataForSingleStat = {
  statType: "errorsPerGame",
  duration: 1,
  difficulty: {
    simple: {
      lastTimeValue: 14.8,
      nowValue: 16.7,
      gamesQuantity: 3
    },
    medium: {
      lastTimeValue: 16.9,
      nowValue: 18.9,
      gamesQuantity: 5
    },
    hard: {
      lastTimeValue: 24.5,
      nowValue: 28.3,
      gamesQuantity: 4
    }
  }
};

const JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK: FullDataForSingleStat = {
  statType: "timeToDiscoverFullPair",
  duration: 1,
  difficulty: {
    simple: {
      lastTimeValue: 8.5,
      nowValue: 11.1,
      gamesQuantity: 8
    },
    medium: {
      lastTimeValue: 12.8,
      nowValue: 14.7,
      gamesQuantity: 5
    },
    hard: {
      lastTimeValue: 14.7,
      nowValue: 21.9,
      gamesQuantity: 6
    }
  }
};

const JACQUELINE_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK: FullDataForSingleStat = {
  statType: "errorPercentageOnWholeGame",
  duration: 1,
  difficulty: {
    simple: {
      lastTimeValue: 8.6,
      nowValue: 11.1,
      gamesQuantity: 6
    },
    medium: {
      lastTimeValue: 12.8,
      nowValue: 14.7,
      gamesQuantity: 7
    },
    hard: {
      lastTimeValue: 14.7,
      nowValue: 21.9,
      gamesQuantity: 4
    }
  }
};

const JACQUELINE_MEAN_GAME_DURATION_MOCK: FullDataForSingleStat = {
  statType: "meanGameDuration",
  duration: 1,
  difficulty: {
    simple: {
      lastTimeValue: 8.75,
      nowValue: 11.1,
      gamesQuantity: 8
    },
    medium: {
      lastTimeValue: 12.8,
      nowValue: 14.7,
      gamesQuantity: 4
    },
    hard: {
      lastTimeValue: 14.7,
      nowValue: 21.9,
      gamesQuantity: 7
    }
  }
};

const JEANMICHEL_ERRORS_PER_GAME_MOCK: FullDataForSingleStat = {
  statType: "errorsPerGame",
  duration: 1,
  difficulty: {
    simple: {
      lastTimeValue: 12.3,
      nowValue: 14.1,
      gamesQuantity: 5
    },
    medium: {
      lastTimeValue: 14.3,
      nowValue: 16.9,
      gamesQuantity: 6
    },
    hard: {
      lastTimeValue: 16.7,
      nowValue: 21.3,
      gamesQuantity: 7
    }
  }
};

const JEANMICHEL_TIME_TO_DISCOVER_FULL_PAIR_MOCK: FullDataForSingleStat = {
  statType: "timeToDiscoverFullPair",
  duration: 1,
  difficulty: {
    simple: {
      lastTimeValue: 18.5,
      nowValue: 19.1,
      gamesQuantity: 8
    },
    medium: {
      lastTimeValue: 12.4,
      nowValue: 19.6,
      gamesQuantity: 6
    },
    hard: {
      lastTimeValue: 17.4,
      nowValue: 13.2,
      gamesQuantity: 3
    }
  }
};

const JEANMICHEL_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK: FullDataForSingleStat = {
  statType: "errorPercentageOnWholeGame",
  duration: 1,
  difficulty: {
    simple: {
      lastTimeValue: 8.5,
      nowValue: 11.1,
      gamesQuantity: 4
    },
    medium: {
      lastTimeValue: 12.8,
      nowValue: 14.7,
      gamesQuantity: 6
    },
    hard: {
      lastTimeValue: 14.7,
      nowValue: 21.9,
      gamesQuantity: 4
    }
  }
};

const JEANMICHEL_MEAN_GAME_DURATION_MOCK: FullDataForSingleStat = {
  statType: "meanGameDuration",
  duration: 1,
  difficulty: {
    simple: {
      lastTimeValue: 8.5,
      nowValue: 11.1,
      gamesQuantity: 5
    },
    medium: {
      lastTimeValue: 12.8,
      nowValue: 14.7,
      gamesQuantity: 6
    },
    hard: {
      lastTimeValue: 14.7,
      nowValue: 21.9,
      gamesQuantity: 2
    }
  }
};

const CARTES_JACQUELINE = ["Ma maman", "Mon papa", "D", "Le mot un peu plus long que les autrees tsé on pousse", "E"];
const CARTES_JEANMICHEL = ["Ma boite", "Mon tournevis", "D"];

export {JACQUELINE_ERRORS_PER_GAME_MOCK,
  JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK,
  JACQUELINE_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK,
  JACQUELINE_MEAN_GAME_DURATION_MOCK,
    CARTES_JACQUELINE,

  JEANMICHEL_ERRORS_PER_GAME_MOCK,
  JEANMICHEL_TIME_TO_DISCOVER_FULL_PAIR_MOCK,
  JEANMICHEL_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK,
  JEANMICHEL_MEAN_GAME_DURATION_MOCK,
    CARTES_JEANMICHEL
};

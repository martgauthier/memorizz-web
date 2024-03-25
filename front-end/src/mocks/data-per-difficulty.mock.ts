import {FullDataForSingleStat} from "../models/stats-data.model";

const JACQUELINE_ERRORS_PER_GAME_MOCK: FullDataForSingleStat = {
  "statType": "errorPerGame",
  "statTitle": "JACQUELINE Nombre d'erreurs après découverte des deux cartes de la paire",
  "statDescription": "Compte le nombre d'erreurs pour retrouver la paire. Le compteur est à 0, jusqu'au moment où la première carte est retournée. Ensuite, chaque erreur incrémente le compteur. Le compteur n'est plus incrémenté lorsque les deux cartes sont retournées.",
  "duration": 1,
  "lastTimeDate": "23 avril",
  "nowDate": "23 mai",
  "difficulty": {
    "simple": {
      "lastTimeValue": 14.8,
      "nowValue": 16.7,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "medium": {
      "lastTimeValue": 16.9,
      "nowValue": 18.9,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "hard": {
      "lastTimeValue": 24.5,
      "nowValue": 28.3,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "overall": {
      "lastTimeValue": 19.6,
      "nowValue": 21.6,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    }
  }
};

const JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK: FullDataForSingleStat = {
  "statType": "timeToDiscoverFullPair",
  "statTitle": "JACQUELINE Temps pour trouver la bonne paire après découverte de la première carte",
  "statDescription": "Temps mis pour retrouver toute la paire, chronométré à partir du moment où au moins une carte de la paire est retournée. Le compteur s'arrête lorsque les deux cartes de la paire sont trouvées consécutivement.",
  "duration": 1,
  "lastTimeDate": "23 avril",
  "nowDate": "23 mai",
  "difficulty": {
    "simple": {
      "lastTimeValue": 8.5,
      "nowValue": 11.1,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "medium": {
      "lastTimeValue": 12.8,
      "nowValue": 14.7,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "hard": {
      "lastTimeValue": 14.7,
      "nowValue": 21.9,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "overall": {
      "lastTimeValue": 12.8,
      "nowValue": 18.6,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    }
  }
};

const JACQUELINE_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK: FullDataForSingleStat = {
  "statType": "errorPercentageOnWholeGame",
  "statTitle": "JACQUELINE Pourcentage d'erreurs sur toute la partie",
  "statDescription": "Pourcentage d'erreurs. Comptabilise toutes les erreurs sur la partie.",
  "duration": 1,
  "lastTimeDate": "23 avril",
  "nowDate": "23 mai",
  "difficulty": {
    "simple": {
      "lastTimeValue": 8.5,
      "nowValue": 11.1,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "medium": {
      "lastTimeValue": 12.8,
      "nowValue": 14.7,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "hard": {
      "lastTimeValue": 14.7,
      "nowValue": 21.9,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "overall": {
      "lastTimeValue": 12.8,
      "nowValue": 18.6,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    }
  }
};

const JACQUELINE_MEAN_GAME_DURATION_MOCK: FullDataForSingleStat = {
  "statType": "meanGameDuration",
  "statTitle": "JACQUELINE Durée moyenne d'une partie",
  "statDescription": "Durée moyenne d'une partie, en minutes.",
  "duration": 1,
  "lastTimeDate": "23 avril",
  "nowDate": "23 mai",
  "difficulty": {
    "simple": {
      "lastTimeValue": 8.5,
      "nowValue": 11.1,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "medium": {
      "lastTimeValue": 12.8,
      "nowValue": 14.7,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "hard": {
      "lastTimeValue": 14.7,
      "nowValue": 21.9,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "overall": {
      "lastTimeValue": 12.8,
      "nowValue": 18.6,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    }
  }
};

const JEANMICHEL_ERRORS_PER_GAME_MOCK: FullDataForSingleStat = {
  "statType": "errorPerGame",
  "statTitle": "JEANMICHEL Nombre d'erreurs après découverte des deux cartes de la paire",
  "statDescription": "Compte le nombre d'erreurs pour retrouver la paire. Le compteur est à 0, jusqu'au moment où la première carte est retournée. Ensuite, chaque erreur incrémente le compteur. Le compteur n'est plus incrémenté lorsque les deux cartes sont retournées.",
  "duration": 1,
  "lastTimeDate": "23 avril",
  "nowDate": "23 mai",
  "difficulty": {
    "simple": {
      "lastTimeValue": 12.3,
      "nowValue": 14.1,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "medium": {
      "lastTimeValue": 14.3,
      "nowValue": 16.9,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "hard": {
      "lastTimeValue": 16.7,
      "nowValue": 21.3,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "overall": {
      "lastTimeValue": 14.3,
      "nowValue": 18.6,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    }
  }
};

const JEANMICHEL_TIME_TO_DISCOVER_FULL_PAIR_MOCK: FullDataForSingleStat = {
  "statType": "timeToDiscoverFullPair",
  "statTitle": "JEANMICHEL Temps pour trouver la bonne paire après découverte de la première carte",
  "statDescription": "Temps mis pour retrouver toute la paire, chronométré à partir du moment où au moins une carte de la paire est retournée. Le compteur s'arrête lorsque les deux cartes de la paire sont trouvées consécutivement.",
  "duration": 1,
  "lastTimeDate": "23 avril",
  "nowDate": "23 mai",
  "difficulty": {
    "simple": {
      "lastTimeValue": 18.5,
      "nowValue": 19.1,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "medium": {
      "lastTimeValue": 12.4,
      "nowValue": 19.6,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "hard": {
      "lastTimeValue": 17.4,
      "nowValue": 13.2,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "overall": {
      "lastTimeValue": 14.5,
      "nowValue": 18.2,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    }
  }
};

const JEANMICHEL_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK: FullDataForSingleStat = {
  "statType": "errorPercentageOnWholeGame",
  "statTitle": "JACQUELINE Pourcentage d'erreurs sur toute la partie",
  "statDescription": "Pourcentage d'erreurs. Comptabilise toutes les erreurs sur la partie.",
  "duration": 1,
  "lastTimeDate": "23 avril",
  "nowDate": "23 mai",
  "difficulty": {
    "simple": {
      "lastTimeValue": 8.5,
      "nowValue": 11.1,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "medium": {
      "lastTimeValue": 12.8,
      "nowValue": 14.7,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "hard": {
      "lastTimeValue": 14.7,
      "nowValue": 21.9,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "overall": {
      "lastTimeValue": 12.8,
      "nowValue": 18.6,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    }
  }
};

const JEANMICHEL_MEAN_GAME_DURATION_MOCK: FullDataForSingleStat = {
  "statType": "meanGameDuration",
  "statTitle": "JACQUELINE Durée moyenne d'une partie",
  "statDescription": "Durée moyenne d'une partie, en minutes.",
  "duration": 1,
  "lastTimeDate": "23 avril",
  "nowDate": "23 mai",
  "difficulty": {
    "simple": {
      "lastTimeValue": 8.5,
      "nowValue": 11.1,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "medium": {
      "lastTimeValue": 12.8,
      "nowValue": 14.7,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "hard": {
      "lastTimeValue": 14.7,
      "nowValue": 21.9,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    },
    "overall": {
      "lastTimeValue": 12.8,
      "nowValue": 18.6,
      "dates": {
        "lastTimeDate": "23 avril",
        "nowDate": "23 mai",
      }
    }
  }
};

export {JACQUELINE_ERRORS_PER_GAME_MOCK,
  JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK,
  JACQUELINE_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK,
  JACQUELINE_MEAN_GAME_DURATION_MOCK,

  JEANMICHEL_ERRORS_PER_GAME_MOCK,
  JEANMICHEL_TIME_TO_DISCOVER_FULL_PAIR_MOCK,
  JEANMICHEL_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK,
  JEANMICHEL_MEAN_GAME_DURATION_MOCK
};

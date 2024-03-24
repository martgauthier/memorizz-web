import {FullDataForSingleStat} from "../models/stats-data.model";

const ERRORS_PER_GAME_MOCK: FullDataForSingleStat = {
  "statType": "errorPerGame",
  "statDescription": "Nombre d'erreurs après découverte des deux cartes de la paire",
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

const TIME_TO_DISCOVER_FULL_PAIR_MOCK: FullDataForSingleStat = {
  "statType": "timeToDiscoverFullPair",
  "statDescription": "Temps pour trouver la bonne paire après découverte de la première carte",
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

export {ERRORS_PER_GAME_MOCK, TIME_TO_DISCOVER_FULL_PAIR_MOCK};

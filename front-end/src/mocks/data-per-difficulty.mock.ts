import {FullDataForSingleStat} from "../models/stats-data.model";

const ERRORS_PER_GAME_MOCK: FullDataForSingleStat = {
  "statType": "errorPerGame",
  "statTitle": "Nombre d'erreurs après découverte des deux cartes de la paire",
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

const TIME_TO_DISCOVER_FULL_PAIR_MOCK: FullDataForSingleStat = {
  "statType": "timeToDiscoverFullPair",
  "statTitle": "Temps pour trouver la bonne paire après découverte de la première carte",
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

export {ERRORS_PER_GAME_MOCK, TIME_TO_DISCOVER_FULL_PAIR_MOCK};

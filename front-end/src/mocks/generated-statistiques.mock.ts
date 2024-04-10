import {AVAILABLE_CARDS, PROFILS_LIST} from "./user.mock";
import {Card} from "../models/user.model";

const MOCKED_STAT_DATA: any={};

const MEAN_CARD: Card = {
  textValue: "en moyenne",
  imgValue: "ARBITRARY",
  id: 0
}

for (let identification of PROFILS_LIST[0]) {
  MOCKED_STAT_DATA[identification.id]={};
  for(let card of [MEAN_CARD, ...(AVAILABLE_CARDS[identification.id])]) {
    MOCKED_STAT_DATA[identification.id][card.id]={};
    for(let statType of ["errorsPerGame", "timeToDiscoverFullPair", "preferredDifficultyMode", "errorPercentageOnWholeGame", "meanGameDuration"]) {
      MOCKED_STAT_DATA[identification.id][card.id][statType]={
        statType: statType,
        duration: 1,
        difficulty: {
          simple: {},
          medium: {},
          hard: {}
        }
      };
      let difficultyObject: any=MOCKED_STAT_DATA[identification.id][card.id][statType].difficulty;
      for(let difficulty of ["simple", "medium", "hard"]) {
        difficultyObject[difficulty].lastTimeValue=getRandomFloat(8, 18);
        difficultyObject[difficulty].nowValue=difficultyObject[difficulty].lastTimeValue + getRandomInt(-1, 10) + getRandomFloat(-1, 1);
        switch(difficulty) {
          case "simple":
            difficultyObject[difficulty].gamesQuantity=4-2*identification.id;//these adds little differences between each person
            break;
          case "medium":
            difficultyObject[difficulty].gamesQuantity=6-3*identification.id;
            break;
          case "hard":
            difficultyObject[difficulty].gamesQuantity=5+2*identification.id;
            break;
        }
      }
    }
  }
}
export default MOCKED_STAT_DATA;

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//get random float in an interval
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

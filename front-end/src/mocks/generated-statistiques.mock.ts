import {AVAILABLE_CARDS, USER_IDENTIFICATIONS} from "./user.mock";
import {Card} from "../models/user.model";

const MOCKED_STAT_DATA: any={};

const MEAN_CARD: Card = {
  textValue: "en moyenne",
  imgValue: "ARBITRARY",
  id: 0
}

for (let identification of USER_IDENTIFICATIONS) {
  MOCKED_STAT_DATA[identification.id]={};
  for(let card of [MEAN_CARD, ...(AVAILABLE_CARDS[identification.id])]) {
    MOCKED_STAT_DATA[identification.id][card.id]={};
    for(let statType of ["errorsPerGame", "timeToDiscoverFullPair", "errorPercentageOnWholeGame", "meanGameDuration"]) {
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
        difficultyObject[difficulty].lastTimeValue=getRandomInt(8, 18);
        difficultyObject[difficulty].nowValue=difficultyObject[difficulty].lastTimeValue + getRandomInt(-1, 10);
        difficultyObject[difficulty].gamesQuantity=getRandomInt(3, 10);
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

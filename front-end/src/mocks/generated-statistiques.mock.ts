import {AVAILABLE_CARDS, PROFILS_LIST} from "./user.mock";
import {Card} from "../models/user.model";

const MOCKED_STAT_DATA: any={};
const MOCKED_COURBE_DATA: any={};

const MEAN_CARD: Card = {
  textValue: "en moyenne",
  imgValue: "ARBITRARY",
  id: 0
}

for (let identification of PROFILS_LIST[0]) {
  MOCKED_STAT_DATA[identification.userId]={};
  MOCKED_COURBE_DATA[identification.userId]={};
  for(let card of [MEAN_CARD, ...(AVAILABLE_CARDS[identification.userId])]) {
    MOCKED_STAT_DATA[identification.userId][card.id]={};
    MOCKED_COURBE_DATA[identification.userId][card.id]={};
    for(let statType of ["errorsPerGame", "timeToDiscoverFullPair", "preferredDifficultyMode", "errorsOnWholeGame", "gameDuration"]) {
      MOCKED_STAT_DATA[identification.userId][card.id][statType]={};
      MOCKED_COURBE_DATA[identification.userId][card.id][statType]={};
      for (let duration of ["1", "2", "3", "6", "8", "12"]) {
        MOCKED_STAT_DATA[identification.userId][card.id][statType][duration] = {
          statType: statType,
          duration: duration,
          difficulty: {
            simple: {},
            medium: {},
            hard: {}
          }
        };

        MOCKED_COURBE_DATA[identification.userId][card.id][statType][duration] = {
          simple: generateRandomCourbeValues('simple', parseInt(duration)),
          medium: generateRandomCourbeValues('medium', parseInt(duration)),
          hard: generateRandomCourbeValues('hard', parseInt(duration))
        }

        let difficultyObject: any = MOCKED_STAT_DATA[identification.userId][card.id][statType][duration].difficulty;
        for (let difficulty of ["simple", "medium", "hard"]) {
          difficultyObject[difficulty].lastTimeValue = getRandomFloat(8, 18);
          difficultyObject[difficulty].nowValue = difficultyObject[difficulty].lastTimeValue + getRandomInt(-1, 10) + getRandomFloat(-1, 1);
          switch (difficulty) {
            case "simple":
              difficultyObject[difficulty].gamesQuantity = 4 - 2 * identification.userId;//these adds little differences between each person
              break;
            case "medium":
              difficultyObject[difficulty].gamesQuantity = 6 - 3 * identification.userId;
              break;
            case "hard":
              difficultyObject[difficulty].gamesQuantity = 5 + 2 * identification.userId;
              break;
          }

          difficultyObject[difficulty].gamesQuantity*=parseInt(duration);
        }
      }
    }
  }
}
export {MOCKED_STAT_DATA, MOCKED_COURBE_DATA};

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//get random float in an interval
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateRandomCourbeValues(difficulty: 'simple' | 'medium' | 'hard', duration: number): number[] {
  let data: number[]=[];

  let ordonneeALorigine: number=0;
  switch (difficulty) {
    case "simple":
      ordonneeALorigine=2;
      break;
    case "medium":
      ordonneeALorigine=4;
      break;
    case "hard":
      ordonneeALorigine=6;
      break;
  }

  let numberOfPoints=duration*31;

  for(let i=0; i < numberOfPoints; i++) {
    data[i]=ordonneeALorigine+8*Math.log(i+2)+getRandomInt(-6,6);
  }

  return data;
}

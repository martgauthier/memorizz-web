import {Injectable} from "@angular/core";
import {FullDataForSingleStat} from "../../models/stats-data.model";
import {
  CARTES_JACQUELINE, CARTES_JEANMICHEL,
  JACQUELINE_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK,
  JACQUELINE_ERRORS_PER_GAME_MOCK, JACQUELINE_MEAN_GAME_DURATION_MOCK,
  JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK, JEANMICHEL_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK,
  JEANMICHEL_ERRORS_PER_GAME_MOCK, JEANMICHEL_MEAN_GAME_DURATION_MOCK,
  JEANMICHEL_TIME_TO_DISCOVER_FULL_PAIR_MOCK
} from "../../mocks/data-per-difficulty.mock";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: "root"
})
export class StatistiquesService {
  /**
   * Keys are in string format, to make it easy for BigSingleStatComponent to choose programmatically which data to listen to
   */
  public data: {[statTitle: string]: BehaviorSubject<FullDataForSingleStat>}= {
    "errorsPerGame$": new BehaviorSubject<FullDataForSingleStat>(JACQUELINE_ERRORS_PER_GAME_MOCK),
    "timeToDiscoverFullPair$": new BehaviorSubject<FullDataForSingleStat>(JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK),
    "errorPercentageOnWholeGame$": new BehaviorSubject<FullDataForSingleStat>(JACQUELINE_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK),
    "meanGameDuration$": new BehaviorSubject<FullDataForSingleStat>(JACQUELINE_MEAN_GAME_DURATION_MOCK)
  };

  public availableCards$: BehaviorSubject<string[]>=new BehaviorSubject<string[]>(CARTES_JACQUELINE);

  constructor(private userService: UserService) {
    this.userService.identification$.subscribe((identification) => {
      if(identification.id===1) {//jacqueline
        this.data["errorsPerGame$"].next(JACQUELINE_ERRORS_PER_GAME_MOCK);
        this.data["timeToDiscoverFullPair$"].next(JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK);
        this.data["errorPercentageOnWholeGame$"].next(JACQUELINE_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK);
        this.data["meanGameDuration$"].next(JACQUELINE_MEAN_GAME_DURATION_MOCK);
        this.availableCards$.next(CARTES_JACQUELINE);
      }
      else if(identification.id===2) {//jean michel
        this.data["errorsPerGame$"].next(JEANMICHEL_ERRORS_PER_GAME_MOCK);
        this.data["timeToDiscoverFullPair$"].next(JEANMICHEL_TIME_TO_DISCOVER_FULL_PAIR_MOCK);
        this.data["errorPercentageOnWholeGame$"].next(JEANMICHEL_ERROR_PERCENTAGE_ON_WHOLE_GAME_MOCK);
        this.data["meanGameDuration$"].next(JEANMICHEL_MEAN_GAME_DURATION_MOCK);
        this.availableCards$.next(CARTES_JEANMICHEL);
      }
      else {
        console.log("invalid id");
      }
    });
  }

  updateSelectedCard(index: number) {
    let card: string=(index===-1) ? "'en moyenne'" : this.availableCards$.getValue()[index];
    for(let observableKey in this.data) {
      let currentDataForCategory: FullDataForSingleStat = this.data[observableKey].getValue();
      console.log(currentDataForCategory.difficulty.overall)
      currentDataForCategory.difficulty.overall.nowValue+=8;
      currentDataForCategory.difficulty.overall.lastTimeValue+=3;//gruge pour ne pas avoir à refaire des mocks, ca change juste les valeurs
      this.data[observableKey].next(currentDataForCategory);
    }
  }
}

export const SUFFIXES_PER_STAT_TYPE: {[id: string]: {statLongSuffix: string, statShortSuffix: string, statPercentageSuffix: string}} = {
  "errorsPerGame": {
    statPercentageSuffix: "d'erreurs",
    statLongSuffix: "erreurs avant de trouver la paire",
    statShortSuffix: "erreurs"
  },
  "timeToDiscoverFullPair": {
    statPercentageSuffix: "de durée",
    statLongSuffix: "mn pour trouver la paire",
    statShortSuffix: "mn"
  },
  "errorPercentageOnWholeGame": {
    statPercentageSuffix: "d'erreurs",
    statLongSuffix: "erreurs sur toute la partie",
    statShortSuffix: "erreurs"
  },
  "meanGameDuration": {
    statPercentageSuffix: "de durée",
    statLongSuffix: "mn pour finir",
    statShortSuffix: "mn"
  }
}

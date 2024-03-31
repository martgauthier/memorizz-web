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
      this.data[observableKey].next(currentDataForCategory);
    }
  }

  getDateString(date?: Date) {
    const months = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const currentDate = date ?? new Date();
    const dayOfMonth = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    return dayOfMonth + " " + months[monthIndex];
  }

  getLastTimeDateString() {
    let currentDate=new Date();
    currentDate.setDate(currentDate.getDate()-1);
    currentDate.setMonth(currentDate.getMonth()-1);//make it "last month date" TODO: change according to selected time range
    return this.getDateString(currentDate);
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
    statLongSuffix: "minutes pour trouver la paire",
    statShortSuffix: "minutes"
  },
  "errorPercentageOnWholeGame": {
    statPercentageSuffix: "d'erreurs",
    statLongSuffix: "erreurs sur toute la partie",
    statShortSuffix: "erreurs"
  },
  "meanGameDuration": {
    statPercentageSuffix: "de durée",
    statLongSuffix: "minutes pour finir",
    statShortSuffix: "minutes"
  }
}

export const STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE: {[statType: string]: {statTitle: string, statDescription: string}} = {
  "errorsPerGame": {
    statTitle: "Nombre d'erreurs après découverte des deux cartes de la paire",
    statDescription: "Compte le nombre d'erreurs pour retrouver la paire. Le compteur est à 0, jusqu'au moment où la première carte est retournée. Ensuite, chaque erreur incrémente le compteur. Le compteur n'est plus incrémenté lorsque les deux cartes sont retournées.",
  },
  "timeToDiscoverFullPair": {
    statTitle: "Temps pour trouver la bonne paire après découverte de la première carte",
    statDescription: "Temps mis pour retrouver toute la paire, chronométré à partir du moment où au moins une carte de la paire est retournée. Le compteur s'arrête lorsque les deux cartes de la paire sont trouvées consécutivement.",
  },
  "errorPercentageOnWholeGame": {
    statTitle: "Pourcentage d'erreurs sur toute la partie",
    statDescription: "Pourcentage d'erreurs. Comptabilise toutes les erreurs sur la partie.",
  },
  "meanGameDuration": {
    statTitle: "Durée moyenne d'une partie",
    statDescription: "Durée moyenne d'une partie, en minutes.",
  }
}

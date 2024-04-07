import {EventEmitter, Injectable} from "@angular/core";
import {FullDataForSingleStat, SelectedStat} from "../../models/stats-data.model";
import MOCKED_STAT_DATA from "../../mocks/generated-statistiques.mock";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../user/user.service";
import {AVAILABLE_CARDS} from "../../mocks/user.mock";
import {Card} from "../../models/user.model";

@Injectable({
  providedIn: "root"
})
export class StatistiquesService {
  /**
   * Keys are in string format, to make it easy for BigSingleStatComponent to choose programmatically which data to listen to
   */
  public data: {[statTitle: string]: BehaviorSubject<FullDataForSingleStat>}= {
    "errorsPerGame": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["errorsPerGame"]),
    "timeToDiscoverFullPair": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["timeToDiscoverFullPair"]),
    "errorPercentageOnWholeGame": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["errorPercentageOnWholeGame"]),
    "meanGameDuration": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["meanGameDuration"])
  };

  private identificationId: number=0;//jacqueline par défaut

  public availableCards$: BehaviorSubject<Card[]>=new BehaviorSubject<Card[]>(AVAILABLE_CARDS[0]);

  public selectedStat$: BehaviorSubject<SelectedStat> = new BehaviorSubject({
    userId: 0,
    cardId: 0,
    statType: "errorsPerGame"
  });

  public scrollToCourbeEvent: EventEmitter<void> = new EventEmitter<void>();

  private selectedCardIndex: number=0;

  constructor(private userService: UserService) {
    this.userService.identification$.subscribe((identification) => {
      if(identification.id>=0) {//l'id est bien un id utilisateur correct
        this.identificationId=identification.id;
        this.data["errorsPerGame"].next(MOCKED_STAT_DATA[identification.id][0]["errorsPerGame"]);
        console.log("Value of mock: ", MOCKED_STAT_DATA[identification.id][0]["timeToDiscoverFullPair"])
        this.data["timeToDiscoverFullPair"].next(MOCKED_STAT_DATA[identification.id][0]["timeToDiscoverFullPair"]);
        this.data["errorPercentageOnWholeGame"].next(MOCKED_STAT_DATA[identification.id][0]["errorPercentageOnWholeGame"]);
        this.data["meanGameDuration"].next(MOCKED_STAT_DATA[identification.id][0]["meanGameDuration"]);
        this.availableCards$.next(AVAILABLE_CARDS[identification.id]);

        this.selectedStat$.next({
          userId: identification.id,
          cardId: 0,
          statType: "errorsPerGame"
        })
      }
      else {
        console.log("invalid id");
      }
    });
  }

  updateSelectedCard(cardIndex: number) {
    for(let observableKey in this.data) {
      let observable: BehaviorSubject<FullDataForSingleStat> = this.data[observableKey];
      observable.next(MOCKED_STAT_DATA[this.identificationId][cardIndex][observableKey]);
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

  setSelectedStat(statType: string) {
    this.selectedStat$.next({
      userId: this.identificationId,
      cardId: this.selectedCardIndex,
      statType: statType
    });
    this.scrollToCourbeEvent.emit();
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

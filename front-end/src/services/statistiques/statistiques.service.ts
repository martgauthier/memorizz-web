import {EventEmitter, Injectable} from "@angular/core";
import {FullDataForSingleStat, SelectedStat} from "../../models/stats-data.model";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../user/user.service";
import {AVAILABLE_CARDS} from "../../mocks/user.mock";
import {Card} from "../../models/user.model";
import {MOCKED_STAT_DATA, MOCKED_COURBE_DATA} from "../../mocks/generated-statistiques.mock";

@Injectable({
  providedIn: "root"
})
export class StatistiquesService {
  /**
   * Keys are in string format, to make it easy for BigSingleStatComponent to choose programmatically which data to listen to
   */
  public data: {[statTitle: string]: BehaviorSubject<FullDataForSingleStat>}= {
    "errorsPerGame": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["errorsPerGame"]["1"]),
    "timeToDiscoverFullPair": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["timeToDiscoverFullPair"]["1"]),
    "preferredDifficultyMode": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["preferredDifficultyMode"]["1"]),
    "errorPercentageOnWholeGame": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["errorPercentageOnWholeGame"]["1"]),
    "meanGameDuration": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["meanGameDuration"]["1"])
  };

  public courbeData$: BehaviorSubject<any> = new BehaviorSubject<any>({
    simple: [],
    medium: [],
    hard: []
  });

  private identificationId: number=0;//jacqueline par défaut

  public availableCards$: BehaviorSubject<Card[]>=new BehaviorSubject<Card[]>(AVAILABLE_CARDS[0]);

  public selectedStat$: BehaviorSubject<SelectedStat> = new BehaviorSubject({
    userId: 0,
    cardId: 0,
    statType: "errorsPerGame"
  });

  public scrollToCourbeEvent: EventEmitter<void> = new EventEmitter<void>();

  private selectedCardIndex: number=0;

  public duration$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(private userService: UserService) {
    this.userService.identification$.subscribe((identification) => {
      if(identification.id>=0) {//l'id est bien un id utilisateur correct
        this.identificationId=identification.id;
        this.data["errorsPerGame"].next(MOCKED_STAT_DATA[identification.id][0]["errorsPerGame"][this.duration$.getValue().toString()]);
        this.data["timeToDiscoverFullPair"].next(MOCKED_STAT_DATA[identification.id][0]["timeToDiscoverFullPair"][this.duration$.getValue().toString()]);
        this.data["preferredDifficultyMode"].next(MOCKED_STAT_DATA[identification.id][0]["preferredDifficultyMode"][this.duration$.getValue().toString()]);
        this.data["errorPercentageOnWholeGame"].next(MOCKED_STAT_DATA[identification.id][0]["errorPercentageOnWholeGame"][this.duration$.getValue().toString()]);
        this.data["meanGameDuration"].next(MOCKED_STAT_DATA[identification.id][0]["meanGameDuration"][this.duration$.getValue().toString()]);
        this.availableCards$.next(AVAILABLE_CARDS[identification.id]);

        this.selectedStat$.next({
          userId: identification.id,
          cardId: 0,
          statType: "errorsPerGame"
        });

        this.updateCourbeData();
      }
      else {
        console.log("invalid id");
      }
    });
  }

  updateSelectedCard(cardIndex: number) {
    for(let observableKey in this.data) {
      let observable: BehaviorSubject<FullDataForSingleStat> = this.data[observableKey];
      observable.next(MOCKED_STAT_DATA[this.identificationId][cardIndex][observableKey][this.duration$.getValue().toString()]);
    }

    let currentSelectedStat=this.selectedStat$.getValue();
    currentSelectedStat.cardId=cardIndex;

    this.selectedCardIndex=cardIndex;

    this.selectedStat$.next(currentSelectedStat);

    this.updateCourbeData();
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
    currentDate.setMonth(currentDate.getMonth()-this.duration$.getValue());
    return this.getDateString(currentDate);
  }

  setSelectedStat(statType: string) {
    this.selectedStat$.next({
      userId: this.identificationId,
      cardId: this.selectedCardIndex,
      statType: statType
    });

    this.updateCourbeData(statType);

    console.log("new selected stat: ", statType)

    this.scrollToCourbeEvent.emit();
  }

  setDuration(duration: number) {
    this.duration$.next(duration);

    this.data["errorsPerGame"].next(MOCKED_STAT_DATA[this.identificationId][this.selectedCardIndex]["errorsPerGame"][duration.toString()]);
    this.data["timeToDiscoverFullPair"].next(MOCKED_STAT_DATA[this.identificationId][this.selectedCardIndex]["timeToDiscoverFullPair"][duration.toString()]);
    this.data["preferredDifficultyMode"].next(MOCKED_STAT_DATA[this.identificationId][this.selectedCardIndex]["preferredDifficultyMode"][duration.toString()]);
    this.data["errorPercentageOnWholeGame"].next(MOCKED_STAT_DATA[this.identificationId][this.selectedCardIndex]["errorPercentageOnWholeGame"][duration.toString()]);
    this.data["meanGameDuration"].next(MOCKED_STAT_DATA[this.identificationId][this.selectedCardIndex]["meanGameDuration"][duration.toString()]);


    this.updateCourbeData(undefined, duration);
  }

  updateCourbeData(statType?: string, duration?: number): void {
    this.courbeData$.next({
      simple: [...MOCKED_COURBE_DATA[this.identificationId][this.selectedCardIndex][statType ?? this.selectedStat$.getValue().statType][duration ?? this.duration$.getValue().toString()].simple],
      medium: [...MOCKED_COURBE_DATA[this.identificationId][this.selectedCardIndex][statType ?? this.selectedStat$.getValue().statType][duration ?? this.duration$.getValue().toString()].medium],
      hard: [...MOCKED_COURBE_DATA[this.identificationId][this.selectedCardIndex][statType ?? this.selectedStat$.getValue().statType][duration ?? this.duration$.getValue().toString()].hard]
    });
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
    statLongSuffix: " pour trouver la paire",
    statShortSuffix: ""//covered by the FormatHour pipe
  },
  "preferredDifficultyMode": {
    statPercentageSuffix: "",
    statLongSuffix: "",
    statShortSuffix: ""//arbitrary values as this is a different type of stat
  },
  "errorPercentageOnWholeGame": {
    statPercentageSuffix: "d'erreurs",
    statLongSuffix: "erreurs sur toute la partie",
    statShortSuffix: "erreurs"
  },
  "meanGameDuration": {
    statPercentageSuffix: "de durée",
    statLongSuffix: " pour finir",
    statShortSuffix: ""//covered by the FormatHour pipe
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
  "preferredDifficultyMode": {
    statTitle: "Pourcentage de choix de chaque mode de difficulté",
    statDescription: "Montre le pourcentage de choix de chaque mode de difficulté, sur l'ensemble des parties effectué dans l'intervalle de temps choisi"
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

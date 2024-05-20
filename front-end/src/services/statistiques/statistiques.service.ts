import {EventEmitter, Injectable} from "@angular/core";
import {FullDataForSingleStat, GamesQuantity, SelectedStat} from "../../models/stats-data.model";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../user/user.service";
import {AVAILABLE_CARDS} from "../../mocks/user.mock";
import {Card} from "../../models/user.model";
import {MOCKED_STAT_DATA, MOCKED_COURBE_DATA} from "../../mocks/generated-statistiques.mock";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class StatistiquesService {

  private statUrl  = "http://localhost:9428/api/stats"

  /**
   * Keys are in string format, to make it easy for BigSingleStatComponent to choose programmatically which data to listen to
   */
  public data: {[statTitle: string]: BehaviorSubject<FullDataForSingleStat>}= {
    "errorsPerGame": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["errorsPerGame"]["1"]),
    "timeToDiscoverFullPair": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["timeToDiscoverFullPair"]["1"]),
    "preferredDifficultyMode": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["preferredDifficultyMode"]["1"]),
    "errorsOnWholeGame": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["errorsOnWholeGame"]["1"]),
    "gameDuration": new BehaviorSubject<FullDataForSingleStat>(MOCKED_STAT_DATA[0][0]["gameDuration"]["1"])
  };

  public selectedCardHasValidData$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(true);

  public courbeData$: BehaviorSubject<any> = new BehaviorSubject<any>({
    simple: [],
    medium: [],
    hard: []
  });

  public gamesQuantity$: BehaviorSubject<GamesQuantity> = new BehaviorSubject<GamesQuantity>({
    simple: 38,
    medium: 40,
    hard: 51
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

  constructor(private userService: UserService, private http: HttpClient) {
    this.userService.identification$.subscribe((identification) => {
      if(identification.id>=0) {//l'id est bien un id utilisateur correct
        this.identificationId=identification.id;
        this.data["errorsPerGame"].next(MOCKED_STAT_DATA[identification.id][0]["errorsPerGame"][this.duration$.getValue().toString()]);
        this.data["timeToDiscoverFullPair"].next(MOCKED_STAT_DATA[identification.id][0]["timeToDiscoverFullPair"][this.duration$.getValue().toString()]);
        this.data["preferredDifficultyMode"].next(MOCKED_STAT_DATA[identification.id][0]["preferredDifficultyMode"][this.duration$.getValue().toString()]);
        this.data["errorsOnWholeGame"].next(MOCKED_STAT_DATA[identification.id][0]["errorsOnWholeGame"][this.duration$.getValue().toString()]);
        this.data["gameDuration"].next(MOCKED_STAT_DATA[identification.id][0]["gameDuration"][this.duration$.getValue().toString()]);
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

  public retrieveStat(statType: string) {
    let url: string="";

    if(statType === "errorsPerGame" || statType === "timeToDiscoverFullPair") {//card-specific statistic
      url=`${this.statUrl}/${this.userService.identification$.getValue().id}/${this.selectedCardIndex}?stattype=${statType}&duration=${this.duration$.getValue()}`;
    }
    else {//game-specific statistic
      url=`${this.statUrl}/${this.userService.identification$.getValue().id}/fullgames?stattype=${statType}&duration=${this.duration$.getValue()}`
    }

    console.log("Sent this request: ", url)

    this.http.get<FullDataForSingleStat>(url).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log("Erreur attrapée !", err)
        this.selectedCardHasValidData$.next(false);
      }
    })
  }

  public retrieveGamesQuantity() {
    this.http.get<GamesQuantity>(`${this.statUrl}/${this.userService.identification$.getValue().id}/fullgames?stattype=preferredDifficultyMode&duration=${this.duration$.getValue()}`)
      .subscribe((gamesQuantity) => {
        console.log("Retrieved games quantity for user " + this.userService.identification$.getValue().id + " and for duration " + this.duration$.getValue())
        console.log(gamesQuantity)
        this.gamesQuantity$.next(gamesQuantity)
      })
  }

  updateSelectedCard(cardIndex: number) {
    let currentSelectedStat=this.selectedStat$.getValue();
    currentSelectedStat.cardId=cardIndex;

    this.selectedCardIndex=cardIndex;

    this.selectedStat$.next(currentSelectedStat);

    this.selectedCardHasValidData$.next(true)
    for(let observableKey in this.data) {
      this.retrieveStat(observableKey)
    }

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

    this.selectedCardHasValidData$.next(true)
    for(let observableKey in this.data) {
      this.retrieveStat(observableKey)
    }
    this.retrieveGamesQuantity()
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
  "errorsOnWholeGame": {
    statPercentageSuffix: "d'erreurs",
    statLongSuffix: "erreurs sur toute la partie",
    statShortSuffix: "erreurs"
  },
  "gameDuration": {
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
  "errorsOnWholeGame": {
    statTitle: "Erreurs sur toute la partie",
    statDescription: "Comptabilise toutes les erreurs sur la partie.",
  },
  "gameDuration": {
    statTitle: "Durée moyenne d'une partie",
    statDescription: "Durée moyenne d'une partie, en minutes.",
  }
}

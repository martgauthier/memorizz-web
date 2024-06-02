import {EventEmitter, Injectable} from "@angular/core";
import {
  createEmptyFullDataForSingleStat,
  FullDataForSingleStat,
  GamesQuantity,
  SelectedStat
} from "../../models/stats-data.model";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../user/user.service";
import {Card} from "../../models/user.model";
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
    "errorsPerGame": new BehaviorSubject<FullDataForSingleStat>(createEmptyFullDataForSingleStat("errorsPerGame")),
    "timeToDiscoverFullPair": new BehaviorSubject<FullDataForSingleStat>(createEmptyFullDataForSingleStat("timeToDiscoverFullPair")),
    "preferredDifficultyMode": new BehaviorSubject<FullDataForSingleStat>(createEmptyFullDataForSingleStat("preferredDifficultyMode")),
    "errorsOnWholeGame": new BehaviorSubject<FullDataForSingleStat>(createEmptyFullDataForSingleStat("errorsOnWholeGame")),
    "gameDuration": new BehaviorSubject<FullDataForSingleStat>(createEmptyFullDataForSingleStat("gameDuration"))
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

  public availableCards$: BehaviorSubject<Card[]>=new BehaviorSubject<Card[]>([]);

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
      if(identification.userId>=0) {//l'id est bien un id utilisateur correct
        this.identificationId=identification.userId;

        this.selectedStat$.next({
          userId: identification.userId,
          cardId: 0,
          statType: "errorsPerGame"
        });

        this.retrieveStat("errorsPerGame");
        this.retrieveStat("timeToDiscoverFullPair");
        this.retrieveStat("preferredDifficultyMode");
        this.retrieveStat("errorsOnWholeGame");
        this.retrieveStat("gameDuration");

        this.updateCourbeData();
      }
      else {
        console.log("invalid id");
      }
    });

    this.userService.availableCards$.subscribe(availableCards => this.availableCards$.next(availableCards));
  }

  public retrieveStat(statType: string) {
    let url: string="";

    if(statType === "errorsPerGame" || statType === "timeToDiscoverFullPair") {//card-specific statistic
      url=`${this.statUrl}/${this.userService.identification$.getValue().userId}/${this.selectedCardIndex}?stattype=${statType}&duration=${this.duration$.getValue()}`;
    }
    else {//game-specific statistic
      url=`${this.statUrl}/${this.userService.identification$.getValue().userId}/fullgames?stattype=${statType}&duration=${this.duration$.getValue()}`
    }

    console.log("Sent this request: ", url)

    this.http.get<FullDataForSingleStat>(url).subscribe({
      next: (data) => {
        console.log(data)
        this.data[statType].next(data)
      },
      error: (err) => {
        console.log("Erreur attrapée !", err)
        this.selectedCardHasValidData$.next(false);
      }
    })
  }

  public retrieveGamesQuantity() {
    this.http.get<GamesQuantity>(`${this.statUrl}/${this.userService.identification$.getValue().userId}/fullgames?stattype=preferredDifficultyMode&duration=${this.duration$.getValue()}`)
      .subscribe((gamesQuantity) => {
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
    let url: string = this.statUrl+"/"+this.userService.identification$.getValue().userId+"/";

    if((["errorsPerGame", "timeToDiscoverFullPair"].includes(this.selectedStat$.getValue().statType))) {//stat for a specific card
      url+=this.selectedStat$.getValue().cardId+"/courbe?stattype="+ (statType ?? this.selectedStat$.getValue().statType) +"&duration="+(duration ?? this.duration$.getValue().toString());
    }
    else {//stat relevant to fullgames
      url+="fullgames/courbe?stattype="+ (statType ?? this.selectedStat$.getValue().statType) +"&duration="+(duration ?? this.duration$.getValue().toString());
    }

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.courbeData$.next({
          simple: data.simple,
          medium: data.medium,
          hard: data.hard
        })
      },
      error: (err) => {
        console.log("Erreur de requête " + url, err);
      }
    })
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

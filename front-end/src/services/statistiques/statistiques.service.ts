import {Injectable} from "@angular/core";
import {FullDataForSingleStat} from "../../models/stats-data.model";
import {JACQUELINE_ERRORS_PER_GAME_MOCK, JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK, JEANMICHEL_ERRORS_PER_GAME_MOCK, JEANMICHEL_TIME_TO_DISCOVER_FULL_PAIR_MOCK} from "../../mocks/data-per-difficulty.mock";
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
    "timeToDiscoverFullPair$": new BehaviorSubject<FullDataForSingleStat>(JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK)
  };

  constructor(private userService: UserService) {
    userService.identification$.subscribe((identification) => {
      if(identification.id===1) {//jacqueline
        this.data["errorsPerGame$"].next(JACQUELINE_ERRORS_PER_GAME_MOCK);
        this.data["timeToDiscoverFullPair$"].next(JACQUELINE_TIME_TO_DISCOVER_FULL_PAIR_MOCK);
      }
      else if(identification.id===2) {//jean michel
        this.data["errorsPerGame$"].next(JEANMICHEL_ERRORS_PER_GAME_MOCK);
        this.data["timeToDiscoverFullPair$"].next(JEANMICHEL_TIME_TO_DISCOVER_FULL_PAIR_MOCK);
      }
      else {
        console.log("invalid id");
      }
    });
  }

}

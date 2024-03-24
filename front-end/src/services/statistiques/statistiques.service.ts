import {Injectable} from "@angular/core";
import {FullDataForSingleStat} from "../../models/stats-data.model";
import {ERRORS_PER_GAME_MOCK, TIME_TO_DISCOVER_FULL_PAIR_MOCK} from "../../mocks/data-per-difficulty.mock";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StatistiquesService {
  /**
   * Keys are in string format, to make it easy for BigSingleStatComponent to choose programmatically which data to listen to
   */
  public data: {[statTitle: string]: BehaviorSubject<FullDataForSingleStat>}= {
    "errorsPerGame$": new BehaviorSubject<FullDataForSingleStat>(ERRORS_PER_GAME_MOCK),
    "timeToDiscoverFullPair$": new BehaviorSubject<FullDataForSingleStat>(TIME_TO_DISCOVER_FULL_PAIR_MOCK)
  };
}

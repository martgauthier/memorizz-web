import {Card, createEmptyPresetDict, Identification, Preset, PresetDict} from "../../models/user.model";
import {BehaviorSubject} from "rxjs";
import {
  USER_IDENTIFICATIONS,
  AVAILABLE_CARDS,
  PRESET_DICTS
} from "../../mocks/user.mock";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  /**
   * Observable that contains data about identification, mostly used in HeaderComponent
   */
  public identification$: BehaviorSubject<Identification> = new BehaviorSubject({
    id: -1,
    nom: "",
    prenom: ""
  });

  /**
   * Observable that contains each saved preset per difficulty
   */
  public presetDict$: BehaviorSubject<PresetDict> = new BehaviorSubject<PresetDict>(createEmptyPresetDict());

  /**
   * Observable that stores every card for profile
   */
  public availableCards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  setFullDataForUser(id: number) {
    if(id<0) {
      console.log("id incorrect");
      return;
    }
    this.setIdentification(USER_IDENTIFICATIONS[id]);
    this.setAvailableCards(AVAILABLE_CARDS[id]);
    this.setPresetDict(PRESET_DICTS[id]);
  }

  setIdentification(identification: Identification) {
    this.identification$.next(identification);
  }

  setPresetDict(presetDict: PresetDict) {
    this.presetDict$.next(presetDict);
  }

  changeFacilePresetDic(presetFacile : Preset){
    
  }

  setAvailableCards(cards: Card[]) {
    this.availableCards$.next(cards);
  }

  addCardToAvailableCards(card: Card) {
    let availableCards: Card[] = this.availableCards$.getValue();
    availableCards.push(card);
    this.availableCards$.next(availableCards);
  }
}

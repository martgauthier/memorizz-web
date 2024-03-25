import {Card, createEmptyPresetDict, Identification, PresetDict} from "../../models/user.model";
import {BehaviorSubject} from "rxjs";
import {
  JACQUELINE_AVAILABLE_CARDS,
  JACQUELINE_IDENTIFICATION,
  JACQUELINE_PRESET_DICT, JEANMICHEL_AVAILABLE_CARDS,
  JEANMICHEL_IDENTIFICATION, JEANMICHEL_PRESET_DICT
} from "../../mocks/user.mock";

export class UserService {
  /**
   * Observable that contains data about identification, mostly used in HeaderComponent
   */
  public identification$: BehaviorSubject<Identification> = new BehaviorSubject({
    id: 0,
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
    if(id===1) {//jacqueline
      this.setIdentification(JACQUELINE_IDENTIFICATION);
      this.setPresetDict(JACQUELINE_PRESET_DICT);
      this.setAvailableCards(JACQUELINE_AVAILABLE_CARDS);
    }
    else if(id===2) {//jean michel
      this.setIdentification(JEANMICHEL_IDENTIFICATION);
      this.setPresetDict(JEANMICHEL_PRESET_DICT);
      this.setAvailableCards(JEANMICHEL_AVAILABLE_CARDS);
    }
    else {
      console.log("Id incorrect !");
    }
  }

  setIdentification(identification: Identification) {
    this.identification$.next(identification);
  }

  setPresetDict(presetDict: PresetDict) {
    this.presetDict$.next(presetDict);
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

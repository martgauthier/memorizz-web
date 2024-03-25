import {Card, createEmptyPresetDict, Identification, PresetDict} from "../../models/user.model";
import {BehaviorSubject} from "rxjs";

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
    if(id===1) {
      /*TODO: read from a mock
      this.setIdentification(...);
      this.setPresetDict(...);
      this.setAvailableCards(...);
       */
    }
    else if(id===2) {
      /*TODO: read from a mock
            this.setIdentification(...);
            this.setPresetDict(...);
            this.setAvailableCards(...);
             */
    }
    else {
      //TODO : do something if function received an incorrect id
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

import {Card, createEmptyPresetDict, createEmptyPresetStart, Identification, Preset, PresetDict} from "../../models/user.model";
import {BehaviorSubject} from "rxjs";
import {
  AVAILABLE_CARDS,
  ID_SOIGNANT,
  PRESET_DICTS,
  PROFILS_LIST
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
    prenom: "",
    src:""
  });

  /**
   * Observable that contains each saved preset per difficulty
   */
  public presetDict$: BehaviorSubject<PresetDict> = new BehaviorSubject<PresetDict>(createEmptyPresetDict());

  /**
   * Observable that contains the current config
   */
  public presetConfig$: BehaviorSubject<Preset> = new BehaviorSubject<Preset>(createEmptyPresetStart());

  private difficultyMode: "simple" | "medium" | "hard" = "simple";

  /**
   * Observable that stores every card for profile
   */
  public availableCards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  /**
   * Observable that stores every profil
   */
  public availableProfil$: BehaviorSubject<Identification[]> = new BehaviorSubject<Identification[]>([]);

  public idSoignant$:  BehaviorSubject<number> = new BehaviorSubject<number>(0);

  setFullDataForUser(id: number) {
    if(id<0) {
      this.setIdentification({prenom : "", nom : "" , id : -1 , src : "assets/icon.png"});
      console.log("id incorrect");
      return;
    }
    this.setIdSoignant();
    this.setIdentification(PROFILS_LIST[ID_SOIGNANT][id]);
    this.setAvailableCards(AVAILABLE_CARDS[id]);
    this.setPresetDict(PRESET_DICTS[id]);
  }
  /**
   * Initialise la liste de patient d'un soignant
   * @param idSoignant : id du soignant connecté
   */
  setIdSoignant(){
    this.idSoignant$.next(ID_SOIGNANT);
  }
  /**
   * Initialise la liste de patient d'un soignant
   * @param idSoignant : id du soignant connecté
   */
  setProfilsList(){
    if(ID_SOIGNANT < 0) alert("id soignant pas bon");
    //changer avec du back :
    this.setAvailableProfil(PROFILS_LIST[ID_SOIGNANT]);
  }
  /**
   * Change le patient séléctionné
   * @param identification id d'un patient
   */
  setIdentification(identification: Identification) {
    this.identification$.next(identification);
  }

  setPresetDict(presetDict: PresetDict) {
    this.presetDict$.next(presetDict);
  }

  setConfig(preset : Preset){
    this.presetConfig$.next(preset);
  }

  setAvailableCards(cards: Card[]) {
    this.availableCards$.next(cards);
  }

  setDifficultyMode(difficultyMode: "simple" | "medium" | "hard") {
    this.difficultyMode=difficultyMode;
  }

  getDifficultyMode() : "simple" | "medium" | "hard" {
    return this.difficultyMode
  }

  addCardToAvailableCards(card: Card) {
    let availableCards: Card[] = this.availableCards$.getValue();
    availableCards.push(card);
    this.availableCards$.next(availableCards);
  }

  setAvailableProfil(profils: Identification[]) {
    this.availableProfil$.next(profils);
  }

  addCardToAvailableProfil(profils: Identification) {
    let availableProfil: Identification[] = this.availableProfil$.getValue();
    availableProfil.push(profils);
    this.availableProfil$.next(availableProfil);
  }
}

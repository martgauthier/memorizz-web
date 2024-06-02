import {Card, createEmptyPresetDict, createEmptyPresetStart, Identification, Preset, PresetDict} from "../../models/user.model";
import {BehaviorSubject} from "rxjs";
import {
  AVAILABLE_CARDS,
  ID_SOIGNANT,
  PRESET_DICTS,
  PROFILS_LIST
} from "../../mocks/user.mock";
import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {

  private usersUrl: string = "http://localhost:9428/api/users/";

  /**
   * Observable that contains data about identification, mostly used in HeaderComponent
   */
  public identification$: BehaviorSubject<Identification> = new BehaviorSubject({
    userId: -1,
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

  private statUrl  = "http://localhost:9428/api/users"

  constructor(private http: HttpClient){

  }

  setFullDataForUser(id: number) {
    if(id<0) {
      //this.setIdentification({prenom : "", nom : "" , id : -1 , src : "assets/icon.png"});
      console.log("id incorrect");
      return;
    }
    this.setIdSoignant();
    this.setIdentification(id);
    this.setProfilsList();
    this.setAvailableCards(id);
    this.setPresetDict(id);
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
    this.http.get<Identification[]>(this.statUrl+"/").subscribe({
      next: (data) => {
        this.availableProfil$.next(data);
      },
      error: (err) => {
        console.log("Erreur attrapée !", err)
      }
    });
  }
  /**
   * Change le patient séléctionné
   * @param identification id d'un patient
   */
  setIdentification(id: number) {
    this.http.get<Identification>(this.statUrl+"/"+id).subscribe({
      next: (data) => {
        this.identification$.next(data);
      },
      error: (err) => {
        console.log("Erreur attrapée !", err)
      }
    });
  }

  setPresetDict(id: number) {
    this.http.get<any>(this.statUrl+"/"+id+"/presetDict").subscribe({
      next: (data) => {
        this.presetDict$.next(data);
      },
      error: (err) => {
        console.log("Erreur attrapée !", err)
      }
    });
  }

  updatePresetDict(presetDict : PresetDict){
    this.http.put(this.statUrl+"/"+this.identification$.value.userId+"/presetDict",presetDict);
  }

  setConfig(preset : Preset){
    this.presetConfig$.next(preset);
  }

  setAvailableCards(id : number) {
    this.http.get<Card[]>(this.statUrl+"/"+id+"/cards").subscribe({
      next: (data) => {
        this.availableCards$.next(data);
      },
      error: (err) => {
        console.log("Erreur attrapée !", err)
      }
    });
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

  addCardToAvailableProfil(profils: Identification) {
    let availableProfil: Identification[] = this.availableProfil$.getValue();
    availableProfil.push(profils);
    this.availableProfil$.next(availableProfil);
  }


}


//TODO: stocker des instances de cette classe dans un dictionnaire avec pour clé la src de l'image de la carte
import {MemoryCardWithUniqueId} from "../models/memorycard-with-unique-id.model";

export class StatCounter {
  private shouldCount: boolean = false;
  private errorsCounter: number=0;
  private lastCardClickIndex: number=-1;//si -1, aucune carte de la paire n'a déjà été cliquée
  private cardFound: boolean=false;
  private firstChangeTimestamp: number=0;
  private cardFoundTimestamp: number=0;

  constructor(private memoryCard: MemoryCardWithUniqueId) {}

  public countClickOnCard(cardIndex: number) {
    if(!this.cardFound && this.lastCardClickIndex!==-1 && this.lastCardClickIndex!== cardIndex && !this.shouldCount) {//si les deux cartes ont été cliqués séparément
      this.shouldCount=true;
      this.errorsCounter++;
      console.log("Lancement du comptage pour la carte !")
      this.firstChangeTimestamp=new Date().getTime()
    }
    else if(this.lastCardClickIndex===-1) {
      this.lastCardClickIndex=cardIndex
    }
    else if(this.shouldCount && !this.cardFound) {
      this.errorsCounter++;
      console.log("Nouveau comptage d'erreur : " + this.errorsCounter)
    }
  }

  public setCardFound(didFindCard: boolean) {
    if(didFindCard) {
      this.errorsCounter--;//car le dernier clic a été le bon, mais qu'il a été compté comme une erreur par "countClickOnCard"
      this.cardFoundTimestamp=new Date().getTime();
      this.shouldCount=false;
      console.log("Fin de la carte !")
    }
    this.cardFound=didFindCard;
  }

  public getResults() {
    return {
      errorsPerGame: this.errorsCounter,
      timeToDiscoverFullPair: Math.floor((this.cardFoundTimestamp - this.firstChangeTimestamp) / 1000)
    }
  }

  public getCardId() {
    return this.memoryCard.cardId
  }
}

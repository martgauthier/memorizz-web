import {Injectable} from "@angular/core";
import {MemoryCard} from "../models/memorycard.model";
import {MEMORYCARD_LIST} from "../mocks/card-list.mocks";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MemoryService {
  private memorycards : MemoryCard[] = MEMORYCARD_LIST;

  public memorycards$ : BehaviorSubject<MemoryCard[]> = new BehaviorSubject(MEMORYCARD_LIST);
  public selectedcards : MemoryCard[] = [];
  constructor(){
    this.shuffle();
  }

  async memoryCardClicked(card: MemoryCard) {
    if(card.state=='default'){
      if(this.selectedcards.length==0) {
        card.state = 'flipped';
        document.getElementById("memorycard" + card.cardId)!.classList.add("flipped");
        document.getElementById("memorycard" + card.cardId)!.classList.remove("notmatched");
        this.selectedcards.push(card);
      }
      else if(this.selectedcards.length==1){
        card.state = 'flipped';
        document.getElementById("memorycard" + card.cardId)!.classList.add("flipped");
        document.getElementById("memorycard" + card.cardId)!.classList.remove("notmatched");
        this.selectedcards.push(card);
        if(this.checkMatchy()){
          this.isMatchy();
          if(this.checkEndGame()){
            this.celebrate();
          }
        }
        else{
          await this.isNotMatchy();
        }
      }
    }
    else{
      return;
    }
  }

  private checkMatchy():boolean {
    if(this.selectedcards.length==2){
      if(this.selectedcards[0].src==this.selectedcards[1].src){
        console.log("isMatchy !!");
       return true;
      }
    }
    return false;
  }

  public isMatchy() : void{
    let card1 : MemoryCard = this.selectedcards[0] ;
    let card2 : MemoryCard = this.selectedcards[1] ;
    card1.state = 'matched';
    card2.state = 'matched';
    document.getElementById("memorycard"+card1.cardId)!.classList.add("matched");
    document.getElementById("memorycard"+card2.cardId)!.classList.add("matched");
    document.getElementById("memorycard"+card1.cardId)!.classList.remove("notmatched");
    document.getElementById("memorycard"+card2.cardId)!.classList.remove("notmatched");
    document.getElementById("memorycard" + card1.cardId)!.classList.remove("flipped");
    document.getElementById("memorycard" + card2.cardId)!.classList.remove("flipped");
    this.selectedcards = [];
  }
  async isNotMatchy():Promise<void>{
    await this.sleep(1000);
    let card1 : MemoryCard = this.selectedcards[0] ;
    let card2 : MemoryCard = this.selectedcards[1] ;
    if(card1.state=="flipped" && card2.state=='flipped') {
      document.getElementById("memorycard" + card1.cardId)!.classList.remove("flipped");
      document.getElementById("memorycard" + card2.cardId)!.classList.remove("flipped");
      document.getElementById("memorycard" + card1.cardId)!.classList.add("falsely-matched");
      document.getElementById("memorycard" + card2.cardId)!.classList.add("falsely-matched");
      document.getElementById("memorycard" + card1.cardId)!.classList.remove("notmatched");
      document.getElementById("memorycard" + card2.cardId)!.classList.remove("notmatched");

      await this.sleep(3000);
      document.getElementById("memorycard" + card1.cardId)!.classList.add("notmatched");
      document.getElementById("memorycard" + card2.cardId)!.classList.add("notmatched");
      document.getElementById("memorycard" + card1.cardId)!.classList.remove("falsely-matched");
      document.getElementById("memorycard" + card2.cardId)!.classList.remove("falsely-matched");
      card1.state = 'default';
      card2.state = 'default';
      this.selectedcards = [];
    }
  }

  public async sleep(ms:number) : Promise<void>{
    return new Promise(
      (resolve) => setTimeout(resolve,ms));
  }

  private checkEndGame() : boolean {
    for(let card of MEMORYCARD_LIST){
      if(card.state!='matched'){
        return false;
      }
    }
    return true;
  }

  private celebrate() {
    alert("YOU WON !!!");
  }

  public shuffle(): void {
    const shuffledArray =this.memorycards;
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    this.memorycards = shuffledArray;
  }
}

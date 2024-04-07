import {Injectable} from "@angular/core";
import {MemoryCard} from "../models/memorycard.model";
import {MEMORYCARD_LIST} from "../mocks/card-list.mocks";
import {BehaviorSubject} from "rxjs";
import {
  USER_IDENTIFICATIONS,
  AVAILABLE_CARDS,
  PRESET_DICTS
} from "../mocks/user.mock";

@Injectable({
  providedIn: 'root'
})

export class MemoryService {

  private gameWin : boolean = false;
  private memorycards : MemoryCard[] = this.createMemoryCardList();     //MEMORYCARD_LIST;
  public win$ :  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.gameWin);
  public nbpaires$ : BehaviorSubject<number> = new BehaviorSubject<number>(this.memorycards.length/2);
  public memorycards$ : BehaviorSubject<MemoryCard[]> = new BehaviorSubject(this.memorycards);
  public selectedcards : MemoryCard[] = [];
  constructor(){
    this.shuffle();
  }

  createMemoryCardList(): MemoryCard[] {

    //TO DO: il faudrat :
    // - regarder combien de cartes mettres dans la memory list en focntion des configs,
    // - shuffle la liste AVAILABLE_CARDS
    // - regarder le type de jeu ( pour savoir si les cartes seront image/image ou pas )
    // -

    let memorycardslist : MemoryCard[] = [];
    let cards = AVAILABLE_CARDS[0];
    for(let i=0; i<cards.length ; i++){
      let memorycard1 :MemoryCard = {
        src: cards[i].imgValue,
        type: "image",
        cardId: cards[i].id,
        description : cards[i].textValue,
        state: "default"
      };
      let memorycard2 :MemoryCard = {
        src: cards[i].imgValue,
        type: "image",
        cardId: cards[i].id,
        description : cards[i].textValue,
        state: "default"
      };
      memorycardslist.push(memorycard1);
      memorycardslist.push(memorycard2);
    }
    return memorycardslist;
  }

  async memoryCardClicked(card: MemoryCard) {
    if(card.state=='default'){
      if(this.selectedcards.length==0) {
        card.state = 'flipped';
        this.selectedcards.push(card);
      }
      else if(this.selectedcards.length==1){
        card.state = 'flipped';
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

  public freshGame():void{
    this.gameWin=false;
    this.win$.next(false);
    this.selectedcards = [];
    for(let card of this.memorycards){
      card.state='default';
    }
    this.shuffle();
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
    this.selectedcards = [];
  }
  async isNotMatchy():Promise<void>{
    await this.sleep(1000);
    let card1 : MemoryCard = this.selectedcards[0] ;
    let card2 : MemoryCard = this.selectedcards[1] ;
    if(card1.state=="flipped" && card2.state=='flipped') {
      card1.state='falsely-matched';
      card2.state='falsely-matched';
      await this.sleep(3000);
      card1.state = 'default';
      card2.state = 'default';
      this.selectedcards = [];
    }
  }

  public async sleep(ms:number) : Promise<void>{ // méthode refactor ok
    return new Promise(
      (resolve) => setTimeout(resolve,ms));
  }

  private checkEndGame() : boolean { // méthode refactor ok
    for(let card of this.memorycards){
      if(card.state!='matched'){
        return false;
      }
    }
    this.gameWin==(true);
    this.win$.next(true);
    console.log('winnnnnn!!!');
    return true;
  }

  private celebrate() {
    //alert("YOU WON !!!");
  }

  public shuffle(): void {  // méthode refactor ok
    const shuffledArray =this.memorycards;
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    this.memorycards = shuffledArray;
  }
}

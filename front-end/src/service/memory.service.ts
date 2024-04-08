import {Injectable} from "@angular/core";
import {MemoryCard} from "../models/memorycard.model";
import {MEMORYCARD_LIST} from "../mocks/card-list.mocks";
import {BehaviorSubject} from "rxjs";
import {
  USER_IDENTIFICATIONS,
  AVAILABLE_CARDS,
  PRESET_DICTS
} from "../mocks/user.mock";
import { UserService } from "src/services/user/user.service";
import {Card, Identification, Preset } from "src/models/user.model";

@Injectable({
  providedIn: 'root'
})

export class MemoryService {

  private gameWin : boolean = false;
  private memorycards : MemoryCard[] = [];     //MEMORYCARD_LIST;
  public win$ :  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.gameWin);
  public nbpaires$ : BehaviorSubject<number> = new BehaviorSubject<number>(this.memorycards.length/2);
  public memorycards$ : BehaviorSubject<MemoryCard[]> = new BehaviorSubject(this.memorycards);
  public selectedcards : MemoryCard[] = [];
  public identification?: Identification;
  public config : Preset = {
    pairsNumber: 0,
    cardsAreVisible: false,
    cardsAreBothImage: false
  };
  constructor(public userService : UserService){
    this.userService.identification$.subscribe( identification => {
      this.identification = identification;
    });
    this.userService.presetConfig$.subscribe((data) => {
      this.config=data;
      console.log(data);
      this.memorycards=this.createMemoryCardList();
      this.memorycards$.next(this.memorycards);
      this.nbpaires$.next(data.pairsNumber);
    });
    this.shuffleMemoryCards();
  }
  createMemoryCardList(): MemoryCard[] {

    //TO DO: il faudrat :
    // - regarder combien de cartes mettres dans la memory list en focntion des configs,
    // - shuffle la liste avant
    // - regarder le type de jeu ( pour savoir si les cartes seront image/image ou pas )
    // @ts-ignore
    let userid= this.identification.id;
    let memorycardslist : MemoryCard[] = [];
    let totalcards = AVAILABLE_CARDS[userid];
    let cards : Card[] = [];

    // on vérifie si le patient a assez d'images ajoutées

    if(totalcards.length<this.config.pairsNumber){
      alert('You dont have enough cards for this user');
      return [];
    }

    //on mélange les images du patient
    totalcards = this.shuffleTotalCards(totalcards);

    //on choisit le bon nombre de cartes
    for(let i=0; i<this.config.pairsNumber; i++){
        cards.push(totalcards[i]);
    }

    for(let i=0; i<cards.length ; i++){
      let memorycard1 :MemoryCard = {
        src: cards[i].imgValue,
        type: "image",
        cardId: cards[i].id,
        description : cards[i].textValue,
        state: (this.config.cardsAreVisible)? 'visible' : "default"
      };
      let memorycard2 :MemoryCard = {
        src: cards[i].imgValue,
        type: (this.config.cardsAreBothImage)? "image" : "text",
        cardId: cards[i].id,
        description : cards[i].textValue,
        state: (this.config.cardsAreVisible)? 'visible' : "default"
      };
      memorycardslist.push(memorycard1);
      memorycardslist.push(memorycard2);
    }
    return memorycardslist;
  }


  async memoryCardClicked(card: MemoryCard) {
    if(card.state=='default' || (card.state=='visible' && this.config.cardsAreVisible)){
      if(this.selectedcards.length==0) {
        card.state = 'flipped';
        this.selectedcards.push(card);
      }
      else if(this.selectedcards.length==1){
        card.state = 'flipped';
        this.selectedcards.push(card);
        if(this.checkMatchy()){
          await this.isMatchy();
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
      card.state=this.config.cardsAreVisible? 'visible' : 'default';
    }
    this.shuffleMemoryCards();
  }

  private checkMatchy():boolean {
    if(this.selectedcards.length==2){
      if(this.selectedcards[0].src==this.selectedcards[1].src){
       return true;
      }
    }
    return false;
  }

  public async isMatchy() : Promise<void>{
    let card1 : MemoryCard = this.selectedcards[0] ;
    let card2 : MemoryCard = this.selectedcards[1] ;
    card1.state = 'matched';
    card2.state = 'matched';
    console.log('matchy');
    this.selectedcards = [];
    await this.sleep(2000);
    card1.state = 'disappear';
    card2.state = 'disappear';
    console.log('disapear');
  }
  async isNotMatchy():Promise<void>{
    await this.sleep(1000);
    let card1 : MemoryCard = this.selectedcards[0] ;
    let card2 : MemoryCard = this.selectedcards[1] ;
    if(card1.state=="flipped" && card2.state=='flipped') {
      card1.state='falsely-matched';
      card2.state='falsely-matched';
      await this.sleep(3000);
      card1.state =  (this.config.cardsAreVisible)? 'visible' : "default";
      card2.state = this.config.cardsAreVisible? 'visible' : "default";
      this.selectedcards = [];
    }
  }

  public async sleep(ms:number) : Promise<void>{ // méthode refactor ok
    return new Promise(
      (resolve) => setTimeout(resolve,ms));
  }

  private checkEndGame() : boolean { // méthode refactor ok
    for(let card of this.memorycards){
      if(card.state!='disappear'){
        console.log('card not matchy :'+card.cardId);
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

  public shuffleMemoryCards(): void {  // méthode refactor ok
    const shuffledArray =this.memorycards;
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    this.memorycards = shuffledArray;
  }

  shuffleTotalCards(totalcards: Card[]) : Card[] {
    const shuffledArray =totalcards;
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
}

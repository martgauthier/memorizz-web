import {Injectable} from "@angular/core";
import {MemoryCard} from "../models/memorycard.model";
//import {MEMORYCARD_LIST} from "../mocks/card-list.mocks";
import {BehaviorSubject} from "rxjs";
import {
  AVAILABLE_CARDS,
  PRESET_DICTS
} from "../mocks/user.mock";
import { UserService } from "src/services/user/user.service";
import {Card, Identification, Preset } from "src/models/user.model";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

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

  private nbTentatives :number = 0;
  private NB_TENTATIVES_MAX  = 4;
  private soundOn : boolean ;
  private musicOn : boolean ;
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
    this.soundOn = false;
    this.musicOn = false;
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
        state: (this.config.cardsAreVisible)? 'visible' : "default",
        isKnown : false,
        paireIsKnown : false,
        nbOfFlipped : 0
      };
      let memorycard2 :MemoryCard = {
        src: cards[i].imgValue,
        type: (this.config.cardsAreBothImage)? "image" : "text",
        cardId: cards[i].id,
        description : cards[i].textValue,
        state: (this.config.cardsAreVisible)? 'visible' : "default",
        isKnown : false,
        paireIsKnown : false,
        nbOfFlipped : 0
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
        card.nbOfFlipped++;
        card.isKnown = true;
        console.log(card.nbOfFlipped);
        this.speak(card.description);
        this.selectedcards.push(card);
      }
      else if(this.selectedcards.length==1){
        card.state = 'flipped';
        card.nbOfFlipped++;
        console.log(card.nbOfFlipped);
        card.isKnown = true;
        this.speak(card.description);
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
        this.setIsPairKnown(this.selectedcards[0]);
        this.setIsPairKnown(this.selectedcards[1]);
        this.selectedcards = [];
      }
    }
    else{
      return;
    }
  }

  public speak(text: string | undefined){
    if(this.soundOn) {
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'fr-FR'; // Définir la langue
        window.speechSynthesis.speak(speech);
      } else {
        console.error("La synthèse vocale n'est pas prise en charge par votre navigateur.");
      }
    }

  }

  public setIsPairKnown(card : MemoryCard) {
    for(let card2 of this.memorycards){
      if(card2!=card && card2.src==card.src){
        if(card2.isKnown && card.isKnown){
          card2.paireIsKnown = true;
          card.paireIsKnown = true;
        }
      }
    }
  }
  public checkIsPairKnown(cards: MemoryCard[]) {
    if(cards[0].isKnown && cards[1].isKnown && cards[0].paireIsKnown && cards[1].paireIsKnown){
      return true;
    }
    return false;
  }

  public freshGame():void{
    this.gameWin=false;
    this.win$.next(false);
    this.selectedcards = [];
    this.soundOn = false;
    this.musicOn = false;
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
    await this.sleep(1000);
    this.playMelody("/assets/audio/success.mp3");

    await this.sleep(3000);
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

      await this.checkClueNeeded(card1, card2);
    }

  }

  public async checkClueNeeded(card1 : MemoryCard, card2 : MemoryCard) {
       if(card1.paireIsKnown || card2.paireIsKnown){
         this.nbTentatives++;
         if(this.nbTentatives>=this.NB_TENTATIVES_MAX){
           let cards : MemoryCard[] = this.searchMostFlippedPaire();
           if(this.checkIsPairKnown(cards)){
            await this.flipPair(cards);
            this.nbTentatives = 0;
            }
         }
       }
    }

  public searchMostFlippedPaire(): MemoryCard[] {
      let cards : MemoryCard[] = [];
      let max = 0;
      for(let card1 of this.memorycards){
        if(card1.state!= 'disappear'){
          for(let card2 of this.memorycards){
            if(card2!=card1 && card1.src == card2.src && (card1.nbOfFlipped)+(card2.nbOfFlipped)>max){
              cards = [];
              cards.push(card1);
              cards.push(card2);
              max = (card1.nbOfFlipped)+(card2.nbOfFlipped);
            }
          }
        }
      }
      console.log(cards);
      console.log(cards[0].nbOfFlipped +'+'+cards[1].nbOfFlipped );
      return cards;
    }

  public async flipPair(cards : MemoryCard[]){
    let card1 = cards[0];
    let card2 = cards[1];
    card1.state = 'flipped';
    card2.state = 'flipped';
    await this.sleep(3000);
    card1.state = this.config.cardsAreVisible? 'visible' : "default";
    card2.state = this.config.cardsAreVisible? 'visible' : "default";
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
    this.gameWin=true;
    this.win$.next(true);
    console.log('winnnnnn!!!');
    return true;
  }

  async celebrate() {
    this.playMelody("/assets/audio/goodresult.mp3");
    await this.sleep(2000);
    this.speak("Bravo! Vous avez retrouvé toutes les paires. Voulez-vous rejouer?");
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

  public setSound(checked: boolean) {
    this.soundOn = checked;
  }
  public setMusic(checked : boolean){
    this.musicOn = checked;
  }
  public playMelody(src : string) {
    if (this.musicOn) {
      let audio = new Audio(src);
      audio.play();
    }
  }


}

import {Component, OnInit, signal} from "@angular/core";
import {MemoryCard} from "../../../models/memorycard.model";
import {MemoryService} from "../../../service/memory.service";

@Component({
  selector : 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})

export class MemoryComponent implements OnInit{
  public memoryCardList : MemoryCard[] = [];
  public nbpaires : number =3;
  public memoryCardClicked(card : MemoryCard){
    console.log("the card "+card.cardId+"wants to be returned");
    this.memoryService.memoryCardClicked(card);
  }

  constructor(public memoryService : MemoryService){
    this.memoryService.memorycards$.subscribe((memoryCardList)=> {
      console.log(memoryCardList);
      this.memoryCardList = memoryCardList;
    })
    this.memoryService.nbpaires$.subscribe((paires : number)=>{
      this.nbpaires = paires;
    });
  }
  ngOnInit() {
    console.log('paire : '+this.nbpaires);
  }

}

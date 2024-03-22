import {Component, OnInit, signal} from "@angular/core";
import {MemoryCard} from "../../models/memorycard.model";
import {MemoryService} from "../../service/memory.service";

@Component({
  selector : 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})

export class MemoryComponent implements OnInit{
  public memoryCardList : MemoryCard[] = [];
  public memoryCardClicked(card : MemoryCard){
    console.log("the card "+card.cardId+"wants to be returned");
  }

  constructor(public memoryService : MemoryService){
    this.memoryService.memorycards$.subscribe((memoryCardList)=> {
      this.memoryCardList = memoryCardList;
    });
  }
  ngOnInit() {
  }
}

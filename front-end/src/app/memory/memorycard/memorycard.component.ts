import {Component, Input, OnInit, NgModule} from "@angular/core";


import {MemoryCard} from "../../../models/memorycard.model";


@Component({
  selector: 'app-memorycard',
  templateUrl: './memorycard.component.html',
  styleUrls: ['./memorycard.component.scss']
})
export class MemorycardComponent implements OnInit {
  @Input()
  memorycard: MemoryCard | undefined;
  constructor(){

  }
  ngOnInit(){

  }

  getUrlForCard(card : MemoryCard){
    return "http://localhost:9428/api/images/"+card.src;
  }
}

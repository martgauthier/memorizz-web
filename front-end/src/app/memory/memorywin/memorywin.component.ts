import {Component, Input, OnInit, NgModule} from "@angular/core";


import {MemoryCard} from "../../../models/memorycard.model";
import {MemoryService} from "../../../service/memory.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-memorywin',
  templateUrl: './memorywin.component.html',
  styleUrls: ['./memorywin.component.scss']
})
export class MemorywinComponent implements OnInit {
  public gameWon : boolean | undefined;
  constructor(private router: Router, public memoryService : MemoryService){
    this.memoryService.win$.subscribe((win : boolean)=>{
      this.gameWon = win;
    })
  }
  public rejouerClick():void{
    this.router.navigate(['play']);
  }

  ngOnInit(){
  }
}

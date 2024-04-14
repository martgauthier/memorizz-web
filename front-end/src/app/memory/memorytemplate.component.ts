import {Component, OnInit} from "@angular/core";
import {MemoryService} from "../../service/memory.service";

@Component({
  selector : 'app-memorytemplate',
  templateUrl: './memorytemplate.component.html',
  styleUrls: ['./memorytemplate.component.scss']
})

export class MemorytemplateComponent implements OnInit{
  ngOnInit(): void {
    this.memoryService.freshGame();
    console.log('gamewon'+this.gameWon);
    console.log('nb de paires : '+this.nbpaires);
  }
  public gameWon: boolean | undefined;
  public nbpaires: number | undefined;
  constructor(public memoryService : MemoryService) {
    this.memoryService.nbpaires$.subscribe((paires : number)=>{
      this.nbpaires = paires;
    })
      this.memoryService.win$.subscribe((win : boolean)=>{
        this.gameWon = win;
      })
    this.memoryService.freshGame();
  }


  public checkSound() {
    const switchElement = document.getElementById('toggle') as HTMLInputElement;
    const checked = switchElement.checked;
    console.log(`Switch is ${checked ? 'on' : 'off'}`);
    this.memoryService.setSound(checked);
    console.log("sound : "+checked);
  }
}

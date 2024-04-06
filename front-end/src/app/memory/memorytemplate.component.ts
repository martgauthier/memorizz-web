import {Component, OnInit} from "@angular/core";
import {MemoryService} from "../../service/memory.service";

@Component({
  selector : 'app-memorytemplate',
  templateUrl: './memorytemplate.component.html',
  styleUrls: ['./memorytemplate.component.scss']
})

export class MemorytemplateComponent implements OnInit{
  ngOnInit(): void {

    this.createTab();
  }
  public nbpaires: number | undefined;
  constructor(public memoryService : MemoryService) {
    this.memoryService.nbpaires$.subscribe((paires : number)=>{
      this.nbpaires = paires;
    })
  }
  public createTab() {
      if(this.nbpaires==3){
        
      }
  }

}

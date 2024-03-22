import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config-service.service';
import { NbCard } from './nbCard/nbCard.component';
import { Niveau } from 'src/models/niveau.models';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss']
})

export class Template implements OnInit {
    public beginning : boolean = true;
    constructor(public configService : ConfigService){}
    ngOnInit(): void {}
    public onclick_jouer(){

    }
    public onclick_difficulties(id : string){
      if(this.beginning){
        (document.querySelector(".template") as HTMLDivElement)!.style.animationPlayState = "running";
        this.beginning = false;
        (document.querySelector("#jouer") as HTMLDivElement)!.style.display ="block";
        document.querySelector("#jouer div")!.classList.add("jouer");
        document.querySelector("#jouer div h3")!.classList.add("jouer_txt");
        document.querySelector("#jouer div h3")!.classList.add("cocher");
        document.querySelector("#jouer div h3")!.classList.remove("pas_cocher");
      }
      new Niveau(id,this.configService);
      this.configService.setFrontDifficulties(id);
      }
} 
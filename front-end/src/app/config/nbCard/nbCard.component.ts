import { Component, Input, OnInit } from '@angular/core';
import { every } from 'rxjs';
//import { ConfigService } from 'src/services/config-service.service';
//import { UserService } from 'src/services/user/user.service';
import { GestionFront } from '../gestion-front';
import { UserService } from 'src/services/user/user.service';
import { Preset, createEmptyPresetStart } from 'src/models/user.model';
import { SlidesOutputData } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-nbcard',
    templateUrl: './nbCard.component.html',
    styleUrls: ['./nbCard.component.scss']
})

export class NbCard extends GestionFront implements OnInit {
    public config : Preset = createEmptyPresetStart();
    ngOnInit(): void {
      //la condition suivante est vraie si on a moins de 4 cartes, alors que la sélection par défaut est 4 cartes
      if(this.userService.availableCards$.value.length <= this.config.pairsNumber) {
        super.setNbCard(this.userService.availableCards$.value.length, this.userService.availableCards$.value.length);
      }
    }
    constructor(public userService : UserService){
        super();
        userService.presetConfig$.subscribe((data) => {
            this.config=data;
        });
    }
    //constructor(public configService : ConfigService){}
    public changeInput(op : string){
        let newValue : number = 0;
        switch (op) {
            case '+':
                newValue = parseInt((document.querySelector(".input-number") as HTMLInputElement).value) - 1 +2; //jsp pk mais +1 ça fait 5+1=51
                super.setNbCard(newValue,this.userService.availableCards$.value.length);
                break;
            case '-':
                newValue = parseInt((document.querySelector(".input-number") as HTMLInputElement).value)-1
                super.setNbCard( newValue,this.userService.availableCards$.value.length);
                break;
        }
        //vérifie qu'on ne peut jouer qu'avec un nombre de paires inférieure à notre nombre de cartes, et uniquement au dessus de 2
        if(newValue <= this.userService.availableCards$.value.length && 2 < newValue) {
          this.userService.setConfig({pairsNumber : newValue, cardsAreVisible : this.config.cardsAreVisible , cardsAreBothImage : this.config.cardsAreBothImage });
        }
    }
    public changeInputNum(event : any){
        (document.querySelector(".input-number") as HTMLSpanElement).style.caretColor = "transparent";
        console.log("nombre de carte : "+this.userService.availableCards$.value.length);
        if(event.target.value<3) {
            this.userService.setConfig({pairsNumber : 3  , cardsAreVisible : this.config.cardsAreVisible, cardsAreBothImage : this.config.cardsAreBothImage});
            super.setNbCard(3,this.userService.availableCards$.value.length);
        }
        else if(event.target.value>8) {
            this.userService.setConfig({pairsNumber : 8 , cardsAreVisible : this.config.cardsAreVisible , cardsAreBothImage : this.config.cardsAreBothImage});
            super.setNbCard(8,this.userService.availableCards$.value.length);
        }
        else {
            this.userService.setConfig({pairsNumber : event.target.value , cardsAreVisible : this.config.cardsAreVisible ,cardsAreBothImage : this.config.cardsAreBothImage});
            super.setNbCard(event.target.value,this.userService.availableCards$.value.length);
        }
    }
    public onclick(){
        (document.querySelector(".input-number") as HTMLSpanElement).style.caretColor = "white";
    }
}

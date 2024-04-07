import { Component, Input, OnInit } from '@angular/core';
import { every } from 'rxjs';
//import { ConfigService } from 'src/services/config-service.service';
//import { UserService } from 'src/services/user/user.service';
import { GestionFront } from '../gestion-front';

@Component({
    selector: 'app-nbcard',
    templateUrl: './nbCard.component.html',
    styleUrls: ['./nbCard.component.scss']
})

export class NbCard extends GestionFront implements OnInit {
    ngOnInit(): void {}

    //constructor(public configService : ConfigService){}
    public changeInput(op : string){
        switch (op) {
            case '+':
                const newValue : number = parseInt((document.querySelector(".input-number") as HTMLInputElement).value) - 1 +2; //jsp pk mais +1 ça fait 5+1=51
                super.setNbCard(newValue);
                break;
            case '-':
                super.setNbCard(parseInt((document.querySelector(".input-number") as HTMLInputElement).value)-1);
                break;
        }
    }
    public changeInputNum(event : any){
        (document.querySelector(".input-number") as HTMLSpanElement).style.caretColor = "transparent";
        if(event.target.value<3) super.setNbCard(3);
        else if(event.target.value>8) super.setNbCard(8);
        else super.setNbCard(event.target.value);
    }
    public onclick(){
        (document.querySelector(".input-number") as HTMLSpanElement).style.caretColor = "white";
    }
}
import { Component, Input, OnInit } from '@angular/core';
import { every } from 'rxjs';
import { ConfigService } from 'src/services/config-service.service';

@Component({
    selector: 'app-nbcard',
    templateUrl: './nbCard.component.html',
    styleUrls: ['./nbCard.component.scss']
})

export class NbCard implements OnInit {
    ngOnInit(): void {}

    constructor(public configService : ConfigService){}
    public changeInput(op : string){
        switch (op) {
            case '+':
                const newValue : number = this.configService.nbCard - 1 +2; //jsp pk mais +1 ça fait 5+1=51
                this.configService.setNbCard(newValue);
                break;
            case '-':
                this.configService.setNbCard(this.configService.nbCard-1);
                break;
        }
    }
    public changeInputNum(event : any){
        (document.querySelector(".input-number") as HTMLSpanElement).style.caretColor = "transparent";
        if(event.target.value<3) this.configService.setNbCard(3);
        else if(event.target.value>8) this.configService.setNbCard(8);
        else this.configService.setNbCard(event.target.value);
    }
    public onclick(){
        (document.querySelector(".input-number") as HTMLSpanElement).style.caretColor = "white";
    }
}
import { Component, Input, OnInit } from '@angular/core';
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
                this.configService.setNbCard(this.configService.nbCard+1);
                break;
            case '-':
                this.configService.setNbCard(this.configService.nbCard-1);
                break;
        }
    }
/*
    public setInput(value : number){
        this.configService.nbCard = value;
        (document.querySelector(".input-number") as HTMLInputElement).value = value +"";
    }*/
}
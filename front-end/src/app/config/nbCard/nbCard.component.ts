import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config-service.service';

@Component({
    selector: 'app-nbcard',
    templateUrl: './nbCard.component.html',
    styleUrls: ['./nbCard.component.scss']
})

export class NbCard implements OnInit {
    ngOnInit(): void {}

    constructor(public configService: ConfigService){}
    
    public changeInput(op : string){
        let element : HTMLInputElement;
        element = (document.querySelector(".input-number") as HTMLInputElement);
        switch (op) {
            case '+':
                this.configService.nbCard+=1;
                element.value = this.configService.nbCard+"";
                break;
            case '-':
                this.configService.nbCard+=1;
                element.value = this.configService.nbCard +"";
                break;
        }
    }
}
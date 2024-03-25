import { Component, OnInit } from '@angular/core';
//import { ConfigService } from 'src/services/config-service.service';
import { GestionFront } from '../gestion-front';

@Component({
    selector: 'app-typeCard',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss']
})

export class Type extends GestionFront implements OnInit {
    //constructor(public configService : ConfigService){}
    ngOnInit(): void {
        this.onclick(true);
    }
    public onclick(img : boolean){
        super.setType(img);
    }
}
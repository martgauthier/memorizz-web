import { Component, OnInit } from '@angular/core';
//import { ConfigService } from 'src/services/config-service.service';
import { GestionFront } from '../gestion-front';
import { UserService } from 'src/services/user/user.service';
import { Preset, createEmptyPresetStart } from 'src/models/user.model';

@Component({
    selector: 'app-typeCard',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss']
})

export class Type extends GestionFront implements OnInit {
    //constructor(public configService : ConfigService){}
    public config : Preset = createEmptyPresetStart();
    ngOnInit(): void {
        this.onclick(true);
    }
    constructor(public userService : UserService){
        super();
        userService.presetConfig$.subscribe((data) => {
            this.config=data;
        });
    }
    public onclick(img : boolean){
        this.userService.setConfig({pairsNumber : this.config.pairsNumber ,cardsAreVisible : this.config.cardsAreVisible , cardsAreBothImage : img});
        super.setType(img);
    }
}
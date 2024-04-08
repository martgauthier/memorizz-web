import { Component, OnInit } from '@angular/core';
//import { ConfigService } from 'src/services/config-service.service';
import { GestionFront } from '../gestion-front';
import { Preset, createEmptyPresetStart } from 'src/models/user.model';
import { UserService } from 'src/services/user/user.service';
import { ThemeService } from 'ng2-charts';

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.scss']
})

export class Position extends GestionFront implements OnInit {
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
    public onclick(etat : boolean){
        super.setPosition(etat);
        this.userService.setConfig({pairsNumber : this.config.pairsNumber ,cardsAreVisible : etat , cardsAreBothImage : this.config.cardsAreBothImage});
    }
}
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config-service.service';

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.scss']
})

export class Position implements OnInit {
    constructor(public configService : ConfigService){}
    ngOnInit(): void {
        this.onclick(true);
    }
    public onclick(etat : boolean){
        this.configService.setPosition(etat);
    }
}
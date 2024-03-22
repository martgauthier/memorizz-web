import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config-service.service';

@Component({
    selector: 'app-typeCard',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss']
})

export class Type implements OnInit {
    constructor(public configService : ConfigService){}
    ngOnInit(): void {
        this.onclick(true);
    }
    public onclick(img : boolean){
        this.configService.setType(img);
    }
}
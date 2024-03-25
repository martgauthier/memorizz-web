import { Component, Output } from '@angular/core';
import { JACQUELINE_IDENTIFICATION } from 'src/mocks/user.mock';
import { Identification } from 'src/models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

    @Output()
    user : Identification ;

    constructor() {
        this.user = JACQUELINE_IDENTIFICATION
    }

}

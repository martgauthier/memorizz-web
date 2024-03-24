import { Component, Output } from '@angular/core';
import { JACQUELINE } from 'src/mocks/user.mock';
import { User } from 'src/models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

    @Output()
    user : User ;

    constructor() {
        this.user = JACQUELINE
    }

}

import { Component, OnInit, Output } from '@angular/core';
import { JACQUELINE } from 'src/mocks/user.mock';
import { User } from 'src/models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class MyHeader implements OnInit {
    
    @Output()
    user : User ;

    constructor() {
        this.user = JACQUELINE
    }
    ngOnInit(): void {}
    
} 
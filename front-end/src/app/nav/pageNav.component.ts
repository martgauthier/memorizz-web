import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './pageNav.component.html',
  styleUrl: './pageNav.component.scss'
})
export class PageNavComponent implements OnInit {

    ngOnInit(): void {}

    constructor(private router: Router){
        
    }

    goTo(str : string){
        this.router.navigate([str]);
    }
}
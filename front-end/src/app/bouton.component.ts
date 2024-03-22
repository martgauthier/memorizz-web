import { Component, Input, OnInit } from '@angular/core';



@Component({
    selector: 'app-bouton',
    templateUrl: './bouton.component.html',
    styleUrls: ['./bouton.component.scss']
})

export class Bouton implements OnInit {
    @Input()
    text!: String;
    ngOnInit(): void {}
} 
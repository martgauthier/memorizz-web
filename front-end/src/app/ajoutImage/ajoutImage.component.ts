import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ajoutImage',
    templateUrl: './ajoutImage.component.html',
    styleUrls: ['./ajoutImage.component.scss']
})

export class AjoutImage implements OnInit {

    imageSrc: any;

    constructor() {
        this.imageSrc = 'assets/chargez-votre-image.png';
    }
    ngOnInit(): void {}

    readURL(event: any): void {
        if(event.target != null){
            if (event.target.files && event.target.files[0]) {
                const file = event.target.files[0];
        
                const reader = new FileReader();
                reader.onload = e => this.imageSrc = reader.result;
        
                reader.readAsDataURL(file);

                const myPreview = document.getElementById("preview");
                myPreview?.classList.add("loaded");
            }
        }
    }    
} 
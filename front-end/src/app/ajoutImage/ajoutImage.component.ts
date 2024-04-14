import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import { Card, Identification } from 'src/models/user.model';

@Component({
    selector: 'app-ajoutImage',
    templateUrl: './ajoutImage.component.html',
    styleUrls: ['./ajoutImage.component.scss']
})

export class AjoutImage implements OnInit {

    imageSrc: any;
    user: Identification = {
        id: 0,
        nom: "NOMSOIGNANTE",
        prenom: "Prenomsoignante",
        src:"/assets/icon.png"
    };

    public availableCards: Card[]=[];

    constructor(private userService: UserService) {
        this.imageSrc = 'assets/chargez-votre-image.png';
        this.userService.identification$.subscribe((identification) => {
            this.user=identification;
          });
        this.userService.availableCards$.subscribe( (cards)=>{
            this.availableCards = cards;
        });
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

    onItemClick(card: Card) {
      let currentCards=this.availableCards;
      currentCards.splice(this.availableCards.indexOf(card), 1);
      this.userService.availableCards$.next(currentCards);
    }
}

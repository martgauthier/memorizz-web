import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import { Card, Identification } from 'src/models/user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

    loadedImage : any;

    public availableCards: Card[]=[];

    constructor(private userService: UserService, private http : HttpClient) {
        this.imageSrc = 'assets/chargez-votre-image.png';
        this.loadedImage = null;
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
                this.loadedImage = event.target.files[0];

                const reader = new FileReader();
                reader.onload = e => this.imageSrc = reader.result;

                reader.readAsDataURL(this.loadedImage);

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

    sendImage(){
        let text = (document.querySelector("#desc") as HTMLInputElement).value
        if(text === "" || this.loadedImage === null){
            alert("Veuillez Renseigner tous les champs pour ajouter une image")
            return;
        }

        let body = new FormData()
        body.append("name", text)
        body.append("image", this.loadedImage)

        console.log(body)

        this.http.post<any>("http://localhost:9428/api/users/"+this.user.id+"/cards", body).subscribe({
            next: (data) => {
                console.log("SUCCESS!", data);
                (document.querySelector("#desc") as HTMLInputElement).value = "";
                this.imageSrc = 'assets/chargez-votre-image.png';
                document.getElementById("preview")?.classList.remove("loaded");

            },
            error: (err) => {
                console.error("Post Eroor", err)
            }
        });
    }
}

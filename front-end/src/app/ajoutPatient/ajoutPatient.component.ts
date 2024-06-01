import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { Preset, PresetDict, createEmptyPresetDict, createEmptyPresetStart } from 'src/models/user.model';
import { Bouton } from '../bouton.component';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ajoutPatient',
  templateUrl: './ajoutPatient.component.html',
  styleUrls: ['./ajoutPatient.component.scss']
})

export class AjoutPatient implements OnInit {
  private surname : string = "";
  private name : string = "";
  public enregistrement : boolean = false;
  public loadedImage : any = null;

  public imageSrc: any ="../assets/add-photo.png";
  constructor(private router: Router ,public userService : UserService, private http : HttpClient){

  }

  ngOnInit(): void {
  }
  public onclick_ajoutPatient(){
    if(this.surname == "" || this.name == ""){
      alert("Veuillez rentrer au moins le nom et le prénom du nouveau profil")
      console.log("Pas de nom ou pas de prenom");
    }
    else{
      this.enregistrement = true;
      this.addPatient();
    }
  }
  public changeUserSurname(event : any){
    this.surname = event.target.value;
  }
  public changeUserName(event : any){
    this.name = event.target.value;
  }


  public readURL(event: any): void {
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

  public addPatient(){
    let body = new FormData();
    body.append("surname", this.surname);
    body.append("name", this.name);
    body.append("image", this.loadedImage);

    console.log("body"+body);

    this.http.post<any>("http://localhost:9428/api/users/", body).subscribe({
      next: (data) => {
        console.log("body : "+body);
        this.userService.setProfilsList();
        console.log("SUCCESS!", data);
        (document.querySelector("#file-input") as HTMLInputElement).value = "";
        this.imageSrc = '../assets/add-photo.png';
        document.getElementById("preview")?.classList.remove("loaded");
      },
      error: (err) => {
        console.error("Post Eroor", err)
      }
    });

  }

}

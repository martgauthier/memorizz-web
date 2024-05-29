import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { Preset, PresetDict, createEmptyPresetDict, createEmptyPresetStart } from 'src/models/user.model';
import { Bouton } from '../bouton.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutPatient',
  templateUrl: './ajoutPatient.component.html',
  styleUrls: ['./ajoutPatient.component.scss']
})

export class AjoutPatient implements OnInit {
  private surname : string = "";
  private name : string = "";
  public enregistrement : boolean = false;
  constructor(private router: Router ,public userService : UserService){

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
      this.userService.addPatient(this.surname, this.name);
    }
  }
  public changeUserSurname(event : any){
    this.surname = event.target.value;
  }
  public changeUserName(event : any){
    this.name = event.target.value;
  }
  public onclick_photo(event : any){
    //To Do : enregistrer la photo et la mettre en preview
  }
}

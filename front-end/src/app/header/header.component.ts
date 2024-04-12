import { Component } from '@angular/core';
import { Identification } from 'src/models/user.model';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    user: Identification = {
      id: 0,
      nom: "NOMSOIGNANTE",
      prenom: "Prenomsoignante",
      src:"/assets/icon.png"
    };

    deployed : boolean;

    constructor(private userService: UserService, public router: Router) {
        this.userService.identification$.subscribe((identification) => {
          this.user=identification;
        });
        this.deployed = false;
    }

    public deployMenu(){
      document.getElementById("menu")?.classList.add("animate");

      if(this.deployed){
        document.getElementById("menu-container")?.classList.add("notDisplayed");
        this.deployed = false;
      }else{
        document.getElementById("menu-container")?.classList.remove("notDisplayed");
        this.deployed = true;
      }
      setTimeout(() => {
        document.getElementById("menu")?.classList.remove("animate");
      }, 500)
    }

    public async stopDisplay(){
      document.getElementById("menu")?.classList.add("animate");
      document.getElementById("menu-container")?.classList.add("notDisplayed");
      setTimeout(() => {
        document.getElementById("menu")?.classList.remove("animate");
        this.deployed = false;
      }, 500)
    }

    public delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
}

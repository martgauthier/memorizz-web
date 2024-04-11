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

    deployed : Boolean;

    constructor(private userService: UserService, public router: Router) {
        this.userService.identification$.subscribe((identification) => {
          this.user=identification;
        });
        this.deployed = false;
    }

    public async deployMenu(){
      document.getElementById("menu")?.classList.add("animate");
      
      
      if(this.deployed){
        document.getElementById("menu-container")?.classList.add("notDisplayed");
        this.deployed = false;
      }else{
        document.getElementById("menu-container")?.classList.remove("notDisplayed");
        this.deployed = true;
      }
      await this.delay(500);
      document.getElementById("menu")?.classList.remove("animate");
    }

    public stopDisplay(){
      document.getElementById("menu-container")?.classList.add("notDisplayed");
      this.deployed = false;
    }

    public delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
}

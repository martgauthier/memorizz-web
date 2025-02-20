import { Component } from '@angular/core';
import { Identification } from 'src/models/user.model';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {HeaderService} from "../../services/header/header.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    user: Identification = {
      userId: -1,
      nom: "NOMSOIGNANTE",
      prenom: "Prenomsoignante",
      src:"/assets/icon.png"
    };

    deployed : boolean;

    constructor(private userService: UserService, public router: Router, private headerService: HeaderService) {
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
        this.headerService.isOpened$.next(false);
      }else{
        document.getElementById("menu-container")?.classList.remove("notDisplayed");
        this.deployed = true;
        this.headerService.isOpened$.next(true);
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
        this.headerService.isOpened$.next(false);
      }, 500)
    }

    navigateAndStopDisplay(path: string) {
      if(this.user.userId!==-1) {
        this.router.navigate([path]);
        this.stopDisplay();
      }
    }

    onTitleClick() {
      this.router.navigate(["/nav"]);
      if(this.deployed) this.stopDisplay();
    }
    public deconnexion(){
      this.router.navigate([""]);
      this.stopDisplay();
    }

    getProfilePicUrl(){
      return "http://localhost:9428/api/images/"+this.user.userId+"/pfp.png";
    }
}

import {AfterViewInit, Component} from '@angular/core';
import {Identification} from "../../../models/user.model";
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {StatistiquesService} from "../../../services/statistiques/statistiques.service";

@Component({
  selector: 'app-statistiques-displayer',
  templateUrl: './statistiques-displayer.component.html',
  styleUrl: './statistiques-displayer.component.scss'
})
export class StatistiquesDisplayerComponent implements AfterViewInit {
  public user: Identification = {
    id: -1,
    prenom: "",
    nom: "",
    src : ""
  };

  public selectedCardHasValidData: boolean=false;

  constructor(private userService: UserService, private router: Router, private statsService: StatistiquesService) {
    userService.identification$.subscribe((identification) => {
      this.user=identification;
      if(identification.id===-1) {
        router.navigate(["/nav"]);
      }
    });
    statsService.selectedCardHasValidData$.subscribe((value) => {
      this.selectedCardHasValidData=value;
    })
  }

  ngAfterViewInit() {
    if(this.user.id===-1) {
      this.router.navigate(["/nav"]);
    }
  }
}

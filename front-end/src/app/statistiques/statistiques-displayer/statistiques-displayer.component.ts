import {AfterViewInit, Component} from '@angular/core';
import {Identification} from "../../../models/user.model";
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";

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

  constructor(private userService: UserService, private router: Router) {
    userService.identification$.subscribe((identification) => {
      this.user=identification;
      if(identification.id===-1) {
        router.navigate(["/nav"]);
      }
    });
  }

  ngAfterViewInit() {
    if(this.user.id===-1) {
      this.router.navigate(["/nav"]);
    }
  }
}

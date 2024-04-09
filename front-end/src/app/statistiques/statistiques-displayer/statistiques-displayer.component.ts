import { Component } from '@angular/core';
import {Identification} from "../../../models/user.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-statistiques-displayer',
  templateUrl: './statistiques-displayer.component.html',
  styleUrl: './statistiques-displayer.component.scss'
})
export class StatistiquesDisplayerComponent {
  public user: Identification = {
    id: 0,
    prenom: "",
    nom: "",
    src : ""
  };

  constructor(private userService: UserService) {
    userService.identification$.subscribe((identification) => {
      this.user=identification;
    });
  }
}

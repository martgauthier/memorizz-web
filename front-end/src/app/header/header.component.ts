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
      prenom: "Prenomsoignante"
    };

    constructor(private userService: UserService, public router: Router) {
        this.userService.identification$.subscribe((identification) => {
          this.user=identification;
        });
    }
}

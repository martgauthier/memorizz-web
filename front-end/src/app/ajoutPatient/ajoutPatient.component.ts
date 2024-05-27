import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-ajoutPatient',
  templateUrl: './ajoutPatient.component.html',
  styleUrls: ['./ajoutPatient.component.scss']
})

export class AjoutPatient {
  constructor(private router: Router, private userService : UserService){

  }
}

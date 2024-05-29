import {Component, Input, OnInit, NgModule} from "@angular/core";

import { Router } from '@angular/router';
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-ajoutPatientModale',
  templateUrl: './ajoutPatient-modale.component.html',
  styleUrls: ['./ajoutPatient-modale.component.scss']
})
export class AjoutPatientModaleComponent implements OnInit {
  constructor(private router: Router, public userService : UserService){
  }
  public onclick_addImage():void{
    this.router.navigate(['ajoutImage']);
  }
  public goToNav():void{
    this.router.navigate(['nav']);
  }
  ngOnInit(){
  }
}

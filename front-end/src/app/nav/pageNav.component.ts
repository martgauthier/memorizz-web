import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './pageNav.component.html',
  styleUrl: './pageNav.component.scss'
})
export class PageNavComponent {
    public choosedUser : number;

    constructor(private router: Router, private userService : UserService){
        this.choosedUser= -1;
        userService.identification$.subscribe((identification) => {
          this.choosedUser=identification.userId;
        });
    }

    goTo(str : string){
        if(this.choosedUser !=-1){
            if(str == "play" && this.userService.availableCards$.value.length < 3 ) return;
            this.router.navigate([str]);
        }
        else{
          if(str=="ajoutPatient"){
            this.router.navigate([str]);
            return;
          }
            alert("Veuillez choisir un User avant de continuer.");
        }
    }
}

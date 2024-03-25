import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './pageNav.component.html',
  styleUrl: './pageNav.component.scss'
})
export class PageNavComponent implements OnInit {

    choosedUser : number;

    ngOnInit(): void {
        }


    constructor(private router: Router, private userService : UserService){
        this.choosedUser= 0;
    }

    callService(str : string){
        let id = parseInt(str);
        if(id != 0) {
            this.choosedUser = id;
            this.userService.setFullDataForUser(id);
        }
    }

    goTo(str : string){
        if(this.choosedUser !=0){
            this.router.navigate([str]);
        }
        else{
            alert("Veuillez choisir un User avant de continuer.");
        }
    }
}
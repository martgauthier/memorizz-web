import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { Preset, PresetDict, createEmptyPresetDict, createEmptyPresetStart } from 'src/models/user.model';
import { Bouton } from '../bouton.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})

export class SignIn implements OnInit {

    private password : String = "";
    private password_verif : String = "";

    constructor(private router: Router){
    }

    ngOnInit(): void {
    }
    public onclick_signin(){
        if(this.password_verif == this.password){
            this.router.navigate(['nav']);
        }else{
            (document.getElementById("input_password")! as HTMLInputElement).style.border = "2px solid red";
            (document.getElementById("input_verif_password")! as HTMLInputElement).style.border = "2px solid red";
            document.getElementById("input_password")!.focus();
        }
    }
    public changeUsername(event : any){
        document.getElementById("input_password")!.focus();
    }
    public changePassword(event : any){
        this.password = event.target.value;
        document.getElementById("input_verif_password")!.focus();
    }
    public changePasswordVerif(event : any){
        this.password_verif = event.target.value;
        if(this.password_verif == this.password){
            this.onclick_signin();
        }
        else{
            (document.getElementById("input_password")! as HTMLInputElement).style.border = "2px solid red";
            (document.getElementById("input_verif_password")! as HTMLInputElement).style.border = "2px solid red";
            document.getElementById("input_password")!.focus();
        }
    }
    public goTo_login(){
        this.router.navigate(['login'])
    }
}

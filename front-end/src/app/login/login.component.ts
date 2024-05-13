import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { Preset, PresetDict, createEmptyPresetDict, createEmptyPresetStart } from 'src/models/user.model';
import { Bouton } from '../bouton.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class Login implements OnInit {
    constructor(private router: Router){
    }

    ngOnInit(): void {
    }
    public onclick_login(){
        this.router.navigate(['nav'])
    }
    public changeUsername(event : any){
        document.getElementById("input_password")!.focus();
    }
    public changePassword(event : any){
        this.onclick_login();
    }
}

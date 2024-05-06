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
    ngOnInit(): void {
    }
    public onclick_login(){
        alert("hehe");
    }
}

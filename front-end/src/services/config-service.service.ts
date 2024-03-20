import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    public nbCard : number = 4;
    public position_cachees : boolean = true;
    public type_img : boolean = true;
    onstructor() {}
}
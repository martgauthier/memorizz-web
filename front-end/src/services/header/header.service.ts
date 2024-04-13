import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public isOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}


import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../services/header/header.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'Hello world!';
  public showSuccess = false;

  public isOpened: boolean=false;

  constructor(private headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.isOpened$.subscribe((isOpened) => {
      this.isOpened=isOpened;
    })
  }

  showHideSuccess() {
    this.showSuccess = !this.showSuccess;
  }
}

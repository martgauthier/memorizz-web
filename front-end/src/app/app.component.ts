import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'Hello world!';
  public showSuccess = false;

  constructor() {}

  showHideSuccess() {
    this.showSuccess = !this.showSuccess;
  }

  ngOnInit(): void {
  }
}

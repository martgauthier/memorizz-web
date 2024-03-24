import {Component} from '@angular/core';

@Component({
  selector: 'app-help-icon',
  templateUrl: './help-icon.component.html',
  styleUrl: './help-icon.component.scss'
})
export class HelpIconComponent {
  public static displayHelp(alertText?: string): void {
    alert(alertText);
  }
}

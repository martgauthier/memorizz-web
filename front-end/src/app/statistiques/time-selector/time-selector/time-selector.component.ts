import { Component } from '@angular/core';
import {StatistiquesService} from "../../../../services/statistiques/statistiques.service";

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.scss'
})
export class TimeSelectorComponent {
  public duration: number=1;

  constructor(private statsService: StatistiquesService) {}

  onRadioChange() {
    console.log("radio changed !")
    this.statsService.setDuration(this.duration);
  }
}

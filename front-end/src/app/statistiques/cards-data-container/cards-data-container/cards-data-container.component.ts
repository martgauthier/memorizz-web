import { Component } from '@angular/core';
import {StatistiquesService} from "../../../../services/statistiques/statistiques.service";

@Component({
  selector: 'app-cards-data-container',
  templateUrl: './cards-data-container.component.html',
  styleUrl: './cards-data-container.component.scss'
})
export class CardsDataContainerComponent {
  public selectedCardHasValidData: boolean=false;

  constructor(private statsService: StatistiquesService) {
    statsService.selectedCardHasValidData$.subscribe((value) => {
      this.selectedCardHasValidData=value;
    })
  }
}

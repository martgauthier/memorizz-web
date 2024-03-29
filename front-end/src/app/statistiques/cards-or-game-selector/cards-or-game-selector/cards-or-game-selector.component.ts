import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cards-or-game-selector',
  templateUrl: './cards-or-game-selector.component.html',
  styleUrl: './cards-or-game-selector.component.scss'
})
export class CardsOrGameSelectorComponent {
  public focusedLi: number=0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.focusedLi=(this.router.url==="/stats/gamesStats") ? 1 : 0;
  }

  updateRoute(routeUrl: string, liId: number) {
    this.focusedLi=liId;

    this.router.navigate(["stats", routeUrl]);
  }
}

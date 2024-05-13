import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Template } from './config/template.component';
import { StatistiquesDisplayerComponent } from './statistiques/statistiques-displayer/statistiques-displayer.component';
import { PageNavComponent } from './nav/pageNav.component';
import { AjoutImage } from './ajoutImage/ajoutImage.component';
import {
  CardsDataContainerComponent
} from "./statistiques/cards-data-container/cards-data-container/cards-data-container.component";
import {GamesDataContainerComponent} from "./statistiques/games-data-container/games-data-container/games-data-container.component";
import { MemorytemplateComponent } from './memory/memorytemplate.component';
import { Login } from './login/login.component';

const routes: Routes = [
  {path : "login", component: Login},
  {path : "play", component: Template},
  {path: "stats", redirectTo: "stats/cardsStats", pathMatch:"full"},
  {path : "stats", component: StatistiquesDisplayerComponent, children: [
      {
        path: "cardsStats",
        component: CardsDataContainerComponent
      },
      {
        path: "gamesStats",
        component: GamesDataContainerComponent
      }
    ]},
  {path : "nav", component : PageNavComponent},
  {path : "ajoutImage", component : AjoutImage},
  {path : "memoryGame", component : MemorytemplateComponent},
  {path: '', redirectTo : '/login', pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
